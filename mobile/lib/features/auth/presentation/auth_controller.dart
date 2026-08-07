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
      final response = await _dioClient.dio.post(
        '/auth/login',
        data: {
          'email': email,
          'password': password,
        },
      );

      if (response.statusCode == 200 && response.data != null) {
        final data = response.data as Map<String, dynamic>;
        final accessToken = data['access_token'] as String?;
        final refreshToken = data['refresh_token'] as String?;
        final user = data['user'] as Map<String, dynamic>?;

        if (accessToken != null && refreshToken != null && user != null) {
          await _dioClient.setAuthTokens(accessToken, refreshToken);
          state = AuthState.authenticated(
            accessToken: accessToken,
            refreshToken: refreshToken,
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
      final response = await _dioClient.dio.post(
        '/auth/register',
        data: {
          'email': email,
          'password': password,
          'name': name,
          'favorite_club_id': favoriteClubId,
          'preferred_language': preferredLanguage ?? 'en',
        },
      );

      if (response.statusCode == 201 && response.data != null) {
        final data = response.data as Map<String, dynamic>;
        final accessToken = data['access_token'] as String?;
        final refreshToken = data['refresh_token'] as String?;
        final user = data['user'] as Map<String, dynamic>?;

        if (accessToken != null && refreshToken != null && user != null) {
          await _dioClient.setAuthTokens(accessToken, refreshToken);
          state = AuthState.authenticated(
            accessToken: accessToken,
            refreshToken: refreshToken,
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
    await _dioClient.clearAuthTokens();
    state = const AuthState.unauthenticated();
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