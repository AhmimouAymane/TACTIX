import 'package:flutter_test/flutter_test.dart';
import 'package:mocktail/mocktail.dart';
import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';

import 'package:tactix/core/network/dio_client.dart';
import 'package:tactix/features/auth/domain/auth_state.dart';
import 'package:tactix/features/auth/presentation/auth_controller.dart';

class MockDioClient extends Mock implements DioClient {}
class MockDio extends Mock implements Dio {}
class MockResponse extends Mock implements Response {}
class MockRequestOptions extends Mock implements RequestOptions {}

void main() {
  group('AuthController', () {
    late MockDioClient mockDioClient;
    late MockDio mockDio;
    late ProviderContainer container;

    setUp(() {
      mockDioClient = MockDioClient();
      mockDio = MockDio();
      when(() => mockDioClient.dio).thenReturn(mockDio);
    });

    tearDown(() {
      container.dispose();
    });

    test('initial state is initial', () {
      container = ProviderContainer(
        overrides: [
          dioClientProvider.overrideWithValue(mockDioClient),
        ],
      );

      final state = container.read(authControllerProvider);
      expect(state, isA<AuthStateInitial>());
    });

    test('login sets loading then authenticated on success', () async {
      final responseData = {
        'access_token': 'test_access_token',
        'refresh_token': 'test_refresh_token',
        'user': {'id': '1', 'email': 'test@example.com'},
      };

      final response = MockResponse();
      when(() => response.statusCode).thenReturn(200);
      when(() => response.data).thenReturn(responseData);
      when(() => response.requestOptions).thenReturn(RequestOptions(path: '/auth/login'));

      when(() => mockDio.post(
        '/auth/login',
        data: any(named: 'data'),
      )).thenAnswer((_) async => response);

      when(() => mockDioClient.setAuthTokens(any(), any())).thenAnswer((_) async {});

      container = ProviderContainer(
        overrides: [
          dioClientProvider.overrideWithValue(mockDioClient),
        ],
      );

      final controller = container.read(authControllerProvider.notifier);

      final loginFuture = controller.login(
        email: 'test@example.com',
        password: 'password123',
      );

      expect(container.read(authControllerProvider), isA<AuthStateLoading>());

      await loginFuture;

      final state = container.read(authControllerProvider);
      expect(state, isA<AuthStateAuthenticated>());
      final authenticated = state as AuthStateAuthenticated;
      expect(authenticated.accessToken, equals('test_access_token'));
      expect(authenticated.email, equals('test@example.com'));
    });

    test('login sets error on failure', () async {
      final response = MockResponse();
      when(() => response.statusCode).thenReturn(401);
      when(() => response.data).thenReturn({'message': 'Invalid credentials'});
      when(() => response.requestOptions).thenReturn(RequestOptions(path: '/auth/login'));

      when(() => mockDio.post(
        '/auth/login',
        data: any(named: 'data'),
      )).thenAnswer((_) async => response);

      container = ProviderContainer(
        overrides: [
          dioClientProvider.overrideWithValue(mockDioClient),
        ],
      );

      final controller = container.read(authControllerProvider.notifier);

      await controller.login(
        email: 'test@example.com',
        password: 'wrongpassword',
      );

      final state = container.read(authControllerProvider);
      expect(state, isA<AuthStateError>());
      final error = state as AuthStateError;
      expect(error.message, equals('Invalid credentials'));
    });

    test('register sets loading then authenticated on success', () async {
      final responseData = {
        'access_token': 'test_access_token',
        'refresh_token': 'test_refresh_token',
        'user': {'id': '1', 'email': 'test@example.com'},
      };

      final response = MockResponse();
      when(() => response.statusCode).thenReturn(201);
      when(() => response.data).thenReturn(responseData);
      when(() => response.requestOptions).thenReturn(RequestOptions(path: '/auth/register'));

      when(() => mockDio.post(
        '/auth/register',
        data: any(named: 'data'),
      )).thenAnswer((_) async => response);

      when(() => mockDioClient.setAuthTokens(any(), any())).thenAnswer((_) async {});

      container = ProviderContainer(
        overrides: [
          dioClientProvider.overrideWithValue(mockDioClient),
        ],
      );

      final controller = container.read(authControllerProvider.notifier);

      final registerFuture = controller.register(
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
      );

      expect(container.read(authControllerProvider), isA<AuthStateLoading>());

      await registerFuture;

      final state = container.read(authControllerProvider);
      expect(state, isA<AuthStateAuthenticated>());
    });

    test('logout clears tokens and sets unauthenticated', () async {
      when(() => mockDioClient.clearAuthTokens()).thenAnswer((_) async {});

      container = ProviderContainer(
        overrides: [
          dioClientProvider.overrideWithValue(mockDioClient),
        ],
      );

      final controller = container.read(authControllerProvider.notifier);
      await controller.logout();

      final state = container.read(authControllerProvider);
      expect(state, isA<AuthStateUnauthenticated>());
    });
  });
}