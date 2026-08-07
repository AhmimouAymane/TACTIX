import 'package:freezed_annotation/freezed_annotation.dart';

part 'auth_state.freezed.dart';

@freezed
abstract class AuthState with _$AuthState {
  const factory AuthState.initial() = AuthStateInitial;
  const factory AuthState.loading() = AuthStateLoading;
  const factory AuthState.authenticated({
    required String accessToken,
    required String refreshToken,
    required String userId,
    required String email,
  }) = AuthStateAuthenticated;
  const factory AuthState.unauthenticated() = AuthStateUnauthenticated;
  const factory AuthState.error({
    required String message,
  }) = AuthStateError;
}