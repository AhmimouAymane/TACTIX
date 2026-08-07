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

Map<String, dynamic> userJson() => {
      'id': 'usr_1',
      'email': 'test@example.com',
      'username': 'test',
      'display_name': 'Test User',
      'role': 'USER',
      'status': 'ACTIVE',
      'mfa_enabled': false,
      'created_at': '2026-08-07T10:00:00.000Z',
    };

Map<String, dynamic> loginEnvelope() => {
      'user': userJson(),
      'requires_mfa': false,
      'tokens': {
        'token_type': 'Bearer',
        'access_token': 'test_access_token',
        'refresh_token': 'test_refresh_token',
        'access_token_expires_at': '2026-08-07T11:00:00.000Z',
        'refresh_token_expires_at': '2026-08-21T10:00:00.000Z',
      },
    };

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

    test('login posts email/password and sets authenticated on success', () async {
      final response = MockResponse();
      when(() => response.statusCode).thenReturn(200);
      when(() => response.data).thenReturn(loginEnvelope());
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

      verify(() => mockDio.post(
        '/auth/login',
        data: {'email': 'test@example.com', 'password': 'password123'},
      )).called(1);

      final state = container.read(authControllerProvider);
      expect(state, isA<AuthStateAuthenticated>());
      final authenticated = state as AuthStateAuthenticated;
      expect(authenticated.accessToken, equals('test_access_token'));
      expect(authenticated.refreshToken, equals('test_refresh_token'));
      expect(authenticated.userId, equals('usr_1'));
      expect(authenticated.email, equals('test@example.com'));
    });

    test('login surfaces MFA required error when backend requires_mfa is true', () async {
      final response = MockResponse();
      when(() => response.statusCode).thenReturn(200);
      when(() => response.data).thenReturn({
        'user': userJson(),
        'requires_mfa': true,
        'tokens': null,
      });
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
        password: 'password123',
      );

      final state = container.read(authControllerProvider);
      expect(state, isA<AuthStateError>());
      final error = state as AuthStateError;
      expect(error.message, equals('MFA required'));
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

    test('register posts email/username/password/display_name and sets authenticated on success', () async {
      final response = MockResponse();
      when(() => response.statusCode).thenReturn(201);
      when(() => response.data).thenReturn(loginEnvelope()..remove('requires_mfa'));
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

      verify(() => mockDio.post(
        '/auth/register',
        data: {
          'email': 'test@example.com',
          'username': 'test',
          'password': 'password123',
          'display_name': 'Test User',
        },
      )).called(1);

      final state = container.read(authControllerProvider);
      expect(state, isA<AuthStateAuthenticated>());
    });

    test('register falls back to derived username when local part is too short', () async {
      final response = MockResponse();
      when(() => response.statusCode).thenReturn(201);
      when(() => response.data).thenReturn(loginEnvelope()..remove('requires_mfa'));
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

      await controller.register(
        email: 'x@example.com',
        password: 'password123',
        name: 'Test User',
      );

      final captured =
          verify(() => mockDio.post('/auth/register', data: captureAny(named: 'data')))
              .captured;
      final data = captured.single as Map<String, dynamic>;
      expect(data['username'], startsWith('user'));
      expect(data['username']!.length, greaterThanOrEqualTo(3));
      expect(data['username']!.length, lessThanOrEqualTo(24));
      expect(data['display_name'], equals('Test User'));
    });

    test('register sets error on failure', () async {
      final response = MockResponse();
      when(() => response.statusCode).thenReturn(409);
      when(() => response.data).thenReturn({
        'status_code': 409,
        'error': 'DUPLICATE_ENTRY',
        'message': 'Email already registered',
      });
      when(() => response.requestOptions).thenReturn(RequestOptions(path: '/auth/register'));

      when(() => mockDio.post(
        '/auth/register',
        data: any(named: 'data'),
      )).thenAnswer((_) async => response);

      container = ProviderContainer(
        overrides: [
          dioClientProvider.overrideWithValue(mockDioClient),
        ],
      );

      final controller = container.read(authControllerProvider.notifier);

      await controller.register(
        email: 'test@example.com',
        password: 'password123',
        name: 'Test User',
      );

      final state = container.read(authControllerProvider);
      expect(state, isA<AuthStateError>());
      final error = state as AuthStateError;
      expect(error.message, equals('Email already registered'));
    });

    test('logout calls the backend then clears tokens and sets unauthenticated', () async {
      final response = MockResponse();
      when(() => response.statusCode).thenReturn(200);
      when(() => response.data).thenReturn({'message': 'Logged out successfully'});
      when(() => response.requestOptions).thenReturn(RequestOptions(path: '/auth/logout'));

      when(() => mockDio.post('/auth/logout')).thenAnswer((_) async => response);
      when(() => mockDioClient.clearAuthTokens()).thenAnswer((_) async {});

      container = ProviderContainer(
        overrides: [
          dioClientProvider.overrideWithValue(mockDioClient),
        ],
      );

      final controller = container.read(authControllerProvider.notifier);
      await controller.logout();

      verify(() => mockDio.post('/auth/logout')).called(1);
      verify(() => mockDioClient.clearAuthTokens()).called(1);

      final state = container.read(authControllerProvider);
      expect(state, isA<AuthStateUnauthenticated>());
    });

    test('logout tolerates backend failure and still clears tokens', () async {
      when(() => mockDio.post('/auth/logout')).thenThrow(
        DioException(requestOptions: RequestOptions(path: '/auth/logout')),
      );
      when(() => mockDioClient.clearAuthTokens()).thenAnswer((_) async {});

      container = ProviderContainer(
        overrides: [
          dioClientProvider.overrideWithValue(mockDioClient),
        ],
      );

      final controller = container.read(authControllerProvider.notifier);
      await controller.logout();

      verify(() => mockDioClient.clearAuthTokens()).called(1);

      final state = container.read(authControllerProvider);
      expect(state, isA<AuthStateUnauthenticated>());
    });
  });

  group('DioClient.tokenPair', () {
    test('extracts access and refresh tokens from the nested refresh envelope', () {
      final pair = DioClient.tokenPair(loginEnvelope());
      expect(pair, isNotNull);
      expect(pair!.accessToken, equals('test_access_token'));
      expect(pair.refreshToken, equals('test_refresh_token'));
    });

    test('returns null when tokens are missing or malformed', () {
      expect(DioClient.tokenPair({'user': userJson()}), isNull);
      expect(DioClient.tokenPair({'tokens': {'token_type': 'Bearer'}}), isNull);
      expect(
        DioClient.tokenPair({
          'tokens': {
            'access_token': 'at',
            'refresh_token': '',
          },
        }),
        isNull,
      );
    });
  });
}