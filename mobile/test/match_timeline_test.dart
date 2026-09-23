import 'package:flutter_test/flutter_test.dart';
import 'package:tactix/core/models/club.dart';
import 'package:tactix/core/models/fixture.dart';
import 'package:tactix/core/models/match_event.dart';
import 'package:tactix/features/fixtures/domain/match_timeline.dart';

MatchEvent event(String id, String type, int minute,
        {String? clubId, String? name}) =>
    MatchEvent(
      id: id,
      type: type,
      minute: minute,
      playerName: name ?? 'Player $id',
      playerClubId: clubId,
    );

Fixture twoClubFixture() => Fixture(
      id: 'fix_1',
      status: 'FINISHED',
      kickoffAt: DateTime.utc(2026, 1, 1),
      homeClub: const Club(id: 'home', name: 'Home', shortName: 'HOM'),
      awayClub: const Club(id: 'away', name: 'Away', shortName: 'AWA'),
    );

void main() {
  group('MatchEvent.fromJson', () {
    test('parses the player club id for side detection', () {
      final event = MatchEvent.fromJson({
        'id': 'e1',
        'type': 'GOAL',
        'minute': 23,
        'player': {
          'firstName': 'Soufiane',
          'lastName': 'Benjdida',
          'clubId': 'club_9',
        },
      });

      expect(event.playerName, 'Soufiane Benjdida');
      expect(event.playerClubId, 'club_9');
    });
  });

  group('sideOf', () {
    test('resolves home, away and unknown sides', () {
      final fixture = twoClubFixture();

      expect(
        sideOf(event('a', 'GOAL', 10, clubId: 'home'), fixture),
        MatchSide.home,
      );
      expect(
        sideOf(event('b', 'GOAL', 10, clubId: 'away'), fixture),
        MatchSide.away,
      );
      expect(
        sideOf(event('c', 'GOAL', 10), fixture),
        MatchSide.unknown,
      );
      expect(
        sideOf(event('d', 'GOAL', 10, clubId: 'other'), fixture),
        MatchSide.unknown,
      );
    });

    test('prefers the match-time side from the detail payload', () {
      final fixture = twoClubFixture();
      const withSide = MatchEvent(
        id: 's',
        type: 'GOAL',
        minute: 45,
        playerName: 'Transferred Striker',
        playerClubId: 'away',
        detail: '{"source":"bsd","side":"home"}',
      );

      expect(sideOf(withSide, fixture), MatchSide.home);
    });

    test('ignores malformed detail payloads', () {
      final fixture = twoClubFixture();
      const broken = MatchEvent(
        id: 'b',
        type: 'GOAL',
        minute: 45,
        playerName: 'Striker',
        playerClubId: 'home',
        detail: 'not-json',
      );

      expect(sideOf(broken, fixture), MatchSide.home);
    });
  });

  group('keyMomentsOf', () {
    test('keeps goals and cards, drops appearances and saves', () {
      final moments = keyMomentsOf([
        event('a', 'APPEARANCE', 0),
        event('b', 'GOAL', 23),
        event('c', 'YELLOW_CARD', 55),
        event('d', 'SAVE', 0),
        event('e', 'ASSIST', 0),
      ]);

      expect(moments.map((e) => e.id), ['b', 'c']);
    });

    test('sorts unknown-minute events last', () {
      final moments = keyMomentsOf([
        event('a', 'GOAL', 0),
        event('b', 'GOAL', 90),
        event('c', 'YELLOW_CARD', 10),
      ]);

      expect(moments.map((e) => e.id), ['c', 'b', 'a']);
    });
  });

  group('performersOf', () {
    test('aggregates goals, assists and saves per player, best first', () {
      final performers = performersOf([
        event('a', 'GOAL', 23, name: 'Striker'),
        event('b', 'GOAL', 0, name: 'Striker'),
        event('c', 'ASSIST', 0, name: 'Playmaker'),
        event('d', 'ASSIST', 0, name: 'Striker'),
        event('e', 'SAVE', 0, name: 'Keeper'),
        event('f', 'SAVE', 0, name: 'Keeper'),
        event('g', 'SAVE', 0, name: 'Keeper'),
        event('h', 'APPEARANCE', 0, name: 'Nobody'),
      ]);

      expect(performers.map((p) => p.playerName),
          ['Striker', 'Playmaker', 'Keeper']);
      expect(performers.first.goals, 2);
      expect(performers.first.assists, 1);
      expect(performers.last.saves, 3);
    });

    test('ignores unnamed events', () {
      final performers = performersOf([
        const MatchEvent(id: 'x', type: 'GOAL', minute: 10),
      ]);

      expect(performers, isEmpty);
    });
  });
}
