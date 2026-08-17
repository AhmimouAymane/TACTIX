import 'package:flutter_test/flutter_test.dart';
import 'package:tactix/core/models/club.dart';
import 'package:tactix/core/models/fixture.dart';
import 'package:tactix/core/models/gameweek.dart';
import 'package:tactix/core/models/match_event.dart';

Map<String, dynamic> clubJson() => {
      'id': 'club_1',
      'name': 'Raja Club Athletic',
      'shortName': 'RCA',
      'crestUrl': 'https://example.com/rca.png',
    };

Map<String, dynamic> fixtureJson({List<Map<String, dynamic>>? events}) => {
      'id': 'fix_1',
      'status': 'LIVE',
      'kickoffAt': '2026-08-20T19:00:00.000Z',
      'homeScore': 2,
      'awayScore': 1,
      'homeClub': clubJson(),
      'awayClub': {...clubJson(), 'id': 'club_2', 'shortName': 'WAC'},
      'gameweek': {'id': 'gw_1', 'number': 2, 'status': 'OPEN'},
      'matchEvents': events ?? [],
    };

void main() {
  group('Club.fromJson', () {
    test('parses a club with a crest URL', () {
      final club = Club.fromJson(clubJson());
      expect(club.id, 'club_1');
      expect(club.name, 'Raja Club Athletic');
      expect(club.shortName, 'RCA');
      expect(club.crestUrl, 'https://example.com/rca.png');
    });

    test('tolerates missing crest URL', () {
      final json = clubJson()..remove('crestUrl');
      expect(Club.fromJson(json).crestUrl, isNull);
    });
  });

  group('MatchEvent.fromJson', () {
    test('parses an event and resolves the player name', () {
      final event = MatchEvent.fromJson({
        'id': 'ev_1',
        'minute': 34,
        'type': 'GOAL',
        'player': {
          'id': 'p_1',
          'firstName': 'Anas',
          'lastName': 'Zerhouni',
        },
      });

      expect(event.type, 'GOAL');
      expect(event.minute, 34);
      expect(event.playerName, 'Anas Zerhouni');
    });

    test('handles events without a player', () {
      final event = MatchEvent.fromJson({
        'id': 'ev_2',
        'minute': 90,
        'type': 'VAR_DECISION',
      });

      expect(event.playerName, isNull);
      expect(event.type, 'VAR_DECISION');
    });
  });

  group('Fixture.fromJson', () {
    test('parses a fixture with score, clubs and gameweek', () {
      final fixture = Fixture.fromJson(fixtureJson());

      expect(fixture.id, 'fix_1');
      expect(fixture.status, 'LIVE');
      expect(fixture.kickoffAt.isAfter(DateTime(2026)), isTrue);
      expect(fixture.homeScore, 2);
      expect(fixture.awayScore, 1);
      expect(fixture.hasScore, isTrue);
      expect(fixture.homeClub.shortName, 'RCA');
      expect(fixture.awayClub.shortName, 'WAC');
      expect(fixture.gameweekNumber, 2);
    });

    test('parses match events from detail payloads', () {
      final fixture = Fixture.fromJson(
        fixtureJson(
          events: [
            {
              'id': 'ev_1',
              'minute': 12,
              'type': 'GOAL',
              'player': {'firstName': 'Anas', 'lastName': 'Zerhouni'},
            },
          ],
        ),
      );

      expect(fixture.matchEvents, hasLength(1));
      expect(fixture.matchEvents.first.playerName, 'Anas Zerhouni');
    });

    test('tolerates unfinished fixtures without scores', () {
      final json = fixtureJson()
        ..remove('homeScore')
        ..remove('awayScore')
        ..['status'] = 'SCHEDULED';

      final fixture = Fixture.fromJson(json);
      expect(fixture.hasScore, isFalse);
      expect(fixture.homeScore, isNull);
      expect(fixture.status, 'SCHEDULED');
    });
  });

  group('Gameweek.fromJson', () {
    test('parses list payloads with counts', () {
      final gameweek = Gameweek.fromJson({
        'id': 'gw_1',
        'number': 1,
        'status': 'OPEN',
        'deadlineAt': '2026-08-19T18:00:00.000Z',
        'competition': {'id': 'comp_1', 'name': 'Botola Pro', 'code': 'BOTOLA'},
        '_count': {'fixtures': 2, 'entries': 0},
      });

      expect(gameweek.number, 1);
      expect(gameweek.status, 'OPEN');
      expect(gameweek.isCurrent, isTrue);
      expect(gameweek.competitionName, 'Botola Pro');
      expect(gameweek.fixtureCount, 2);
      expect(gameweek.entryCount, 0);
    });

    test('parses the current-gameweek payload with fixtures', () {
      final gameweek = Gameweek.fromJson({
        'id': 'gw_1',
        'number': 1,
        'status': 'UPCOMING',
        'deadlineAt': '2026-08-19T18:00:00.000Z',
        'fixtures': [fixtureJson()],
      });

      expect(gameweek.isCurrent, isFalse);
      expect(gameweek.fixtures, hasLength(1));
      expect(gameweek.fixtures.first.homeClub.shortName, 'RCA');
    });

    test('tolerates malformed payloads', () {
      final gameweek = Gameweek.fromJson({
        'id': 'gw_1',
        'deadlineAt': 'not-a-date',
      });

      expect(gameweek.number, 0);
      expect(gameweek.status, 'UPCOMING');
      expect(gameweek.fixtures, isEmpty);
    });
  });
}