import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:mocktail/mocktail.dart';
import 'package:tactix/core/models/catalog_player.dart';
import 'package:tactix/core/models/fantasy_team.dart';
import 'package:tactix/core/network/dio_client.dart';
import 'package:tactix/features/team/domain/team_state.dart';
import 'package:tactix/features/team/presentation/team_controller.dart';

class MockDioClient extends Mock implements DioClient {}
class MockDio extends Mock implements Dio {}
class MockResponse extends Mock implements Response<dynamic> {}

Map<String, dynamic> teamJson() => {
      'id': 't1',
      'name': 'Atlas Lions',
      'budgetRemaining': '70.5',
      'value': 29.5,
      'totalPoints': 38,
      'formation': null,
      'currentRank': null,
      'squadSlots': [
        {
          'id': 's1',
          'playerId': 'p1',
          'position': 'MID1',
          'isCaptain': true,
          'isViceCaptain': false,
          'purchasedPrice': '6.2',
          'player': {
            'id': 'p1',
            'firstName': 'Soufiane',
            'lastName': 'Benjdida',
            'position': 'MID',
            'currentPrice': '6.2',
            'club': {'id': 'c1', 'name': 'MAS', 'shortName': 'MAS'},
          },
        },
      ],
    };

void main() {
  group('FantasyTeam.fromJson', () {
    test('parses decimals sent as strings or numbers', () {
      final team = FantasyTeam.fromJson(teamJson());

      expect(team.name, 'Atlas Lions');
      expect(team.budgetRemaining, 70.5);
      expect(team.value, 29.5);
      expect(team.totalPoints, 38);
      expect(team.squadSlots, hasLength(1));

      final slot = team.squadSlots.single;
      expect(slot.group, 'MID');
      expect(slot.isCaptain, isTrue);
      expect(slot.purchasedPrice, 6.2);
      expect(slot.player?.displayName, 'Soufiane Benjdida');
      expect(slot.player?.club?.shortName, 'MAS');
    });
  });

  group('CatalogPlayer.fromJson', () {
    test('falls back to safe defaults', () {
      final player = CatalogPlayer.fromJson({'id': 'p9'});

      expect(player.displayName, 'Unknown player');
      expect(player.position, 'MID');
      expect(player.currentPrice, 0.0);
      expect(player.club, isNull);
    });
  });

  group('TeamController', () {
    late MockDioClient mockDioClient;
    late MockDio mockDio;
    late ProviderContainer container;

    setUp(() {
      mockDioClient = MockDioClient();
      mockDio = MockDio();
      when(() => mockDioClient.dio).thenReturn(mockDio);
      container = ProviderContainer(
        overrides: [
          dioClientProvider.overrideWithValue(mockDioClient),
        ],
      );
    });

    tearDown(() => container.dispose());

    test('loads the team', () async {
      final response = MockResponse();
      when(() => response.statusCode).thenReturn(200);
      when(() => response.data).thenReturn(teamJson());
      when(() => mockDio.get<dynamic>('/teams/my'))
          .thenAnswer((_) async => response);

      await container.read(teamControllerProvider.notifier).loadMyTeam();

      expect(container.read(teamControllerProvider), isA<TeamData>());
    });

    test('maps 404 to empty and 401 to unauthenticated', () async {
      // NOTE: Dio validateStatus passes 4xx as normal responses.
      final notFound = MockResponse();
      when(() => notFound.statusCode).thenReturn(404);
      when(() => notFound.data).thenReturn({
        'error': {'code': 'NOT_FOUND', 'message': 'Team not found'},
      });
      when(() => mockDio.get<dynamic>('/teams/my'))
          .thenAnswer((_) async => notFound);
      await container.read(teamControllerProvider.notifier).loadMyTeam();
      expect(container.read(teamControllerProvider), isA<TeamEmpty>());

      final unauthorized = MockResponse();
      when(() => unauthorized.statusCode).thenReturn(401);
      when(() => unauthorized.data).thenReturn(null);
      when(() => mockDio.get<dynamic>('/teams/my'))
          .thenAnswer((_) async => unauthorized);
      await container.read(teamControllerProvider.notifier).loadMyTeam();
      expect(
        container.read(teamControllerProvider),
        isA<TeamUnauthenticated>(),
      );
    });

    test('creates a team', () async {
      final response = MockResponse();
      when(() => response.statusCode).thenReturn(201);
      when(() => response.data).thenReturn(teamJson());
      when(
        () => mockDio.post<dynamic>(
          '/teams',
          data: any(named: 'data'),
        ),
      ).thenAnswer((_) async => response);

      final ok = await container
          .read(teamControllerProvider.notifier)
          .createTeam('Atlas Lions');

      expect(ok, isTrue);
      expect(
        (container.read(teamControllerProvider) as TeamData).team.name,
        'Atlas Lions',
      );
    });
  });

  group('PlayersController', () {
    late MockDioClient mockDioClient;
    late MockDio mockDio;
    late ProviderContainer container;

    setUp(() {
      mockDioClient = MockDioClient();
      mockDio = MockDio();
      when(() => mockDioClient.dio).thenReturn(mockDio);
      container = ProviderContainer(
        overrides: [
          dioClientProvider.overrideWithValue(mockDioClient),
        ],
      );
    });

    tearDown(() => container.dispose());

    Map<String, dynamic> pageOf(int page, int total) => {
          'items': [
            {
              'id': 'p$page',
              'firstName': 'A',
              'lastName': 'B',
              'position': 'FWD',
              'currentPrice': 8.0,
            },
          ],
          'total': total,
          'page': page,
          'limit': 50,
        };

    test('loads and appends pages', () async {
      final first = MockResponse();
      when(() => first.statusCode).thenReturn(200);
      when(() => first.data).thenReturn(pageOf(1, 51));
      when(
        () => mockDio.get<dynamic>(
          '/players',
          queryParameters: any(named: 'queryParameters'),
        ),
      ).thenAnswer((_) async => first);

      await container.read(playersControllerProvider.notifier).load();
      var state = container.read(playersControllerProvider) as PlayersData;
      expect(state.players, hasLength(1));
      expect(state.hasMore, isTrue);

      final second = MockResponse();
      when(() => second.statusCode).thenReturn(200);
      when(() => second.data).thenReturn(pageOf(2, 51));
      when(
        () => mockDio.get<dynamic>(
          '/players',
          queryParameters: any(named: 'queryParameters'),
        ),
      ).thenAnswer((_) async => second);

      await container
          .read(playersControllerProvider.notifier)
          .load(append: true);
      state = container.read(playersControllerProvider) as PlayersData;
      expect(state.players, hasLength(2));
      expect(state.hasMore, isFalse);
    });
  });
}
