import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:dio/dio.dart';
import 'package:tactix/core/network/dio_client.dart';
import 'package:tactix/features/auth/domain/auth_state.dart';

class AuthController extends StateNotifier<AuthState> {
  AuthController(this._dioClient) : super(const AuthState.initial());

  final DioClient _dioClient;

  Future<void> login({
    required String email,
    required String password,
  }) async {
    state = const AuthState.loading();

    try {
      final response = await _dioClient.dio.post<dynamic>(
        '/auth/login',
        data: {
          'email': email,
          'password': password,
        },
      );

      if (response.statusCode == 200 && response.data != null) {
        final data = response.data as Map<String, dynamic>;

        if (data['requires_mfa'] == true) {
          state = const AuthState.error(message: 'MFA required');
          return;
        }

        final user = data['user'] as Map<String, dynamic>?;
        final pair = DioClient.tokenPair(data);
        if (pair != null && user != null) {
          await _dioClient.setAuthTokens(pair.accessToken, pair.refreshToken);
          state = AuthState.authenticated(
            accessToken: pair.accessToken,
            refreshToken: pair.refreshToken,
            userId: user['id'] as String? ?? '',
            email: user['email'] as String? ?? email,
          );
          return;
        }
      }

      state = AuthState.error(
        message: response.data?['message'] as String? ?? 'Login failed',
      );
    } on DioException catch (e) {
      state = AuthState.error(
        message: e.response?.data?['message'] as String? ??
            e.message ??
            'Network error occurred',
      );
    } catch (e) {
      state = AuthState.error(message: e.toString());
    }
  }

  Future<void> register({
    required String email,
    required String password,
    required String name,
    String? favoriteClubId,
    String? preferredLanguage,
  }) async {
    state = const AuthState.loading();

    try {
      final response = await _dioClient.dio.post<dynamic>(
        '/auth/register',
        data: {
          'email': email,
          'username': _deriveUsername(email),
          'password': password,
          'display_name': name,
        },
      );

      if (response.statusCode == 201 && response.data != null) {
        final data = response.data as Map<String, dynamic>;
        final user = data['user'] as Map<String, dynamic>?;
        final pair = DioClient.tokenPair(data);
        if (pair != null && user != null) {
          await _dioClient.setAuthTokens(pair.accessToken, pair.refreshToken);
          state = AuthState.authenticated(
            accessToken: pair.accessToken,
            refreshToken: pair.refreshToken,
            userId: user['id'] as String? ?? '',
            email: user['email'] as String? ?? email,
          );
          return;
        }
      }

      state = AuthState.error(
        message: response.data?['message'] as String? ?? 'Registration failed',
      );
    } on DioException catch (e) {
      state = AuthState.error(
        message: e.response?.data?['message'] as String? ??
            e.message ??
            'Network error occurred',
      );
    } catch (e) {
      state = AuthState.error(message: e.toString());
    }
  }

  Future<void> logout() async {
    try {
      await _dioClient.dio.post<dynamic>('/auth/logout');
    } catch (_) {
      // Backend logout is best-effort; local tokens are cleared regardless.
    }
    await _dioClient.clearAuthTokens();
    state = const AuthState.unauthenticated();
  }

  /// Derives a backend-compatible username (3-24 chars, [a-zA-Z0-9_.])
  /// from the email local part, falling back to `user` + short hash.
  static String _deriveUsername(String email) {
    final localPart = email.split('@').first.toLowerCase();
    final cleaned = localPart.replaceAll(RegExp(r'[^a-z0-9_.]'), '');
    if (cleaned.length >= 3) {
      return cleaned.length > 24 ? cleaned.substring(0, 24) : cleaned;
    }
    return 'user${_fnv1aHex(email)}';
  }

  static String _fnv1aHex(String input) {
    var hash = 0x811c9dc5;
    for (final codeUnit in input.codeUnits) {
      hash ^= codeUnit;
      hash = (hash * 0x01000193) & 0xFFFFFFFF;
    }
    return hash.toRadixString(16).padLeft(8, '0');
  }

  void clearError() {
    state = state.maybeWhen(
      error: (_) => const AuthState.unauthenticated(),
      orElse: () => state,
    );
  }
}

final authControllerProvider =
    StateNotifierProvider<AuthController, AuthState>((ref) {
  final dioClient = ref.watch(dioClientProvider);
  return AuthController(dioClient);
});