import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mocktail/mocktail.dart';
import 'package:tactix/core/network/dio_client.dart';
import 'package:tactix/features/gameweeks/domain/gameweeks_state.dart';
import 'package:tactix/features/gameweeks/presentation/gameweeks_controller.dart';

class MockDioClient extends Mock implements DioClient {}
class MockDio extends Mock implements Dio {}
class MockResponse extends Mock implements Response<dynamic> {}

Map<String, dynamic> gameweekJson(String id, int number, String status) => {
      'id': id,
      'number': number,
      'status': status,
      'deadlineAt': '2026-08-19T18:00:00.000Z',
      'competition': {'id': 'comp_1', 'name': 'Botola Pro', 'code': 'BOTOLA'},
      '_count': {'fixtures': 2, 'entries': 1},
    };

void main() {
  group('GameweeksController', () {
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

    void setupContainer() {
      container = ProviderContainer(
        overrides: [
          dioClientProvider.overrideWithValue(mockDioClient),
        ],
      );
    }

    test('loads gameweeks and exposes the current one', () async {
      final response = MockResponse();
      when(() => response.statusCode).thenReturn(200);
      when(() => response.data).thenReturn([
        gameweekJson('gw_upcoming', 2, 'UPCOMING'),
        gameweekJson('gw_open', 1, 'OPEN'),
        gameweekJson('gw_finished', 0, 'FINISHED'),
      ]);
      when(() => mockDio.get<dynamic>('/gameweeks', queryParameters: null))
          .thenAnswer((_) async => response);

      setupContainer();
      await container.read(gameweeksControllerProvider.notifier).load();

      final state = container.read(gameweeksControllerProvider);
      expect(state, isA<GameweeksData>());
      expect((state as GameweeksData).gameweeks, hasLength(3));

      final current =
          container.read(gameweeksControllerProvider.notifier).current;
      expect(current?.id, 'gw_open');
      expect(current?.fixtureCount, 2);
    });

    test('falls back to the first gameweek when none is current', () async {
      final response = MockResponse();
      when(() => response.statusCode).thenReturn(200);
      when(() => response.data).thenReturn([
        gameweekJson('gw_upcoming', 2, 'UPCOMING'),
      ]);
      when(() => mockDio.get<dynamic>('/gameweeks', queryParameters: null))
          .thenAnswer((_) async => response);

      setupContainer();
      await container.read(gameweeksControllerProvider.notifier).load();

      final current =
          container.read(gameweeksControllerProvider.notifier).current;
      expect(current?.id, 'gw_upcoming');
    });

    test('returns null current when the list is empty', () {
      setupContainer();
      expect(
        container.read(gameweeksControllerProvider.notifier).current,
        isNull,
      );
    });

    test('exposes a server error message', () async {
      final response = MockResponse();
      when(() => response.statusCode).thenReturn(500);
      when(() => response.data).thenReturn({'message': 'nope'});
      when(() => mockDio.get<dynamic>('/gameweeks', queryParameters: null))
          .thenAnswer((_) async => response);

      setupContainer();
      await container.read(gameweeksControllerProvider.notifier).load();

      final state = container.read(gameweeksControllerProvider);
      expect(state, isA<GameweeksError>());
      expect((state as GameweeksError).message, 'nope');
    });
  });
}