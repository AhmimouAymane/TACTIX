import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mocktail/mocktail.dart';
import 'package:tactix/core/network/dio_client.dart';
import 'package:tactix/features/fixtures/domain/fixtures_state.dart';
import 'package:tactix/features/fixtures/presentation/fixtures_controller.dart';

class MockDioClient extends Mock implements DioClient {}
class MockDio extends Mock implements Dio {}
class MockResponse extends Mock implements Response<dynamic> {}

Map<String, dynamic> fixtureJson(String id, String status) => {
      'id': id,
      'status': status,
      'kickoffAt': '2026-08-20T19:00:00.000Z',
      'homeClub': {'id': 'c1', 'name': 'RCA', 'shortName': 'RCA'},
      'awayClub': {'id': 'c2', 'name': 'WAC', 'shortName': 'WAC'},
    };

void main() {
  group('FixturesController', () {
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

    test('loads fixtures and parses the list', () async {
      final response = MockResponse();
      when(() => response.statusCode).thenReturn(200);
      when(() => response.data).thenReturn([
        fixtureJson('f1', 'LIVE'),
        fixtureJson('f2', 'FINISHED'),
      ]);
      when(
        () => mockDio.get<dynamic>(
          '/fixtures',
          queryParameters: any(named: 'queryParameters'),
        ),
      ).thenAnswer((_) async => response);

      setupContainer();
      await container
          .read(fixturesControllerProvider.notifier)
          .load(status: 'LIVE');

      final state = container.read(fixturesControllerProvider);
      expect(state, isA<FixturesData>());
      expect((state as FixturesData).fixtures, hasLength(2));
      expect(state.fixtures.first.status, 'LIVE');

      verify(
        () => mockDio.get<dynamic>(
          '/fixtures',
          queryParameters: {'status': 'LIVE'},
        ),
      ).called(1);
    });

    test('sends gameweek and status filters together', () async {
      final response = MockResponse();
      when(() => response.statusCode).thenReturn(200);
      when(() => response.data).thenReturn(<dynamic>[]);
      when(
        () => mockDio.get<dynamic>(
          '/fixtures',
          queryParameters: any(named: 'queryParameters'),
        ),
      ).thenAnswer((_) async => response);

      setupContainer();
      await container
          .read(fixturesControllerProvider.notifier)
          .load(gameweekId: 'gw_1', status: 'FINISHED');

      verify(
        () => mockDio.get<dynamic>(
          '/fixtures',
          queryParameters: {'gameweekId': 'gw_1', 'status': 'FINISHED'},
        ),
      ).called(1);
    });

    test('exposes a server error message', () async {
      final response = MockResponse();
      when(() => response.statusCode).thenReturn(500);
      when(() => response.data).thenReturn({'message': 'boom'});
      when(
        () => mockDio.get<dynamic>(
          '/fixtures',
          queryParameters: any(named: 'queryParameters'),
        ),
      ).thenAnswer((_) async => response);

      setupContainer();
      await container.read(fixturesControllerProvider.notifier).load();

      final state = container.read(fixturesControllerProvider);
      expect(state, isA<FixturesError>());
      expect((state as FixturesError).message, 'boom');
    });

    test('loads fixture detail with events', () async {
      final response = MockResponse();
      when(() => response.statusCode).thenReturn(200);
      when(() => response.data).thenReturn({
        ...fixtureJson('f1', 'FINISHED'),
        'homeScore': 2,
        'awayScore': 1,
        'matchEvents': [
          {
            'id': 'ev_1',
            'minute': 12,
            'type': 'GOAL',
            'player': {'firstName': 'Anas', 'lastName': 'Zerhouni'},
          },
        ],
      });
      when(() => mockDio.get<dynamic>('/fixtures/f1', queryParameters: null))
          .thenAnswer((_) async => response);

      setupContainer();
      await container
          .read(fixtureDetailControllerProvider.notifier)
          .load('f1');

      final state = container.read(fixtureDetailControllerProvider);
      expect(state, isA<FixtureDetailData>());
      final fixture = (state as FixtureDetailData).fixture;
      expect(fixture.hasScore, isTrue);
      expect(fixture.matchEvents.single.playerName, 'Anas Zerhouni');
    });
  });
}