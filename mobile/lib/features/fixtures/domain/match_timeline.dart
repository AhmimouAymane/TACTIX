import 'dart:convert';

import 'package:tactix/core/models/fixture.dart';
import 'package:tactix/core/models/match_event.dart';

/// Event types shown on the key-moments timeline. Appearance, saves and
/// plain assists are aggregated in the performers card instead — a finished
/// match carries dozens of them and they bury the goals and cards.
const timelineTypes = {
  'GOAL',
  'OWN_GOAL',
  'PENALTY_SAVED',
  'PENALTY_MISSED',
  'YELLOW_CARD',
  'RED_CARD',
};

enum MatchSide { home, away, unknown }

MatchSide sideOf(MatchEvent event, Fixture fixture) {
  // The sync stores the match-time side in the detail payload — it survives
  // later transfers, unlike the player's current club.
  final detail = event.detail;
  if (detail != null && detail.isNotEmpty) {
    try {
      final decoded = jsonDecode(detail);
      if (decoded is Map<String, dynamic>) {
        return switch (decoded['side']) {
          'home' => MatchSide.home,
          'away' => MatchSide.away,
          _ => _sideFromClub(event, fixture),
        };
      }
    } catch (_) {
      // Fall through to the club heuristic.
    }
  }
  return _sideFromClub(event, fixture);
}

MatchSide _sideFromClub(MatchEvent event, Fixture fixture) {
  final clubId = event.playerClubId;
  if (clubId == null || clubId.isEmpty) return MatchSide.unknown;
  if (clubId == fixture.homeClub.id) return MatchSide.home;
  if (clubId == fixture.awayClub.id) return MatchSide.away;
  return MatchSide.unknown;
}

/// Key moments in story order. Events with an unknown minute (0) sort last —
/// they are stat top-ups, not kickoff-minute incidents.
List<MatchEvent> keyMomentsOf(List<MatchEvent> events) {
  final moments =
      events.where((e) => timelineTypes.contains(e.type)).toList();
  moments.sort((a, b) {
    final ma = a.minute == 0 ? 9999 : a.minute;
    final mb = b.minute == 0 ? 9999 : b.minute;
    return ma.compareTo(mb);
  });
  return moments;
}

class PerformerStats {
  const PerformerStats({
    required this.playerName,
    required this.goals,
    required this.assists,
    required this.saves,
  });

  final String playerName;
  final int goals;
  final int assists;
  final int saves;

  bool get isEmpty => goals == 0 && assists == 0 && saves == 0;
}

/// Aggregated scoring contributions per player, best first.
List<PerformerStats> performersOf(List<MatchEvent> events) {
  final goals = <String, int>{};
  final assists = <String, int>{};
  final saves = <String, int>{};

  for (final event in events) {
    final name = (event.playerName ?? '').trim();
    if (name.isEmpty) continue;
    switch (event.type) {
      case 'GOAL':
      case 'OWN_GOAL':
        goals[name] = (goals[name] ?? 0) + 1;
      case 'ASSIST':
        assists[name] = (assists[name] ?? 0) + 1;
      case 'SAVE':
      case 'PENALTY_SAVED':
        saves[name] = (saves[name] ?? 0) + 1;
    }
  }

  final names = {...goals.keys, ...assists.keys, ...saves.keys};
  final performers = names
      .map((name) => PerformerStats(
            playerName: name,
            goals: goals[name] ?? 0,
            assists: assists[name] ?? 0,
            saves: saves[name] ?? 0,
          ))
      .where((p) => !p.isEmpty)
      .toList();
  performers.sort((a, b) {
    final goals = b.goals.compareTo(a.goals);
    if (goals != 0) return goals;
    final assists = b.assists.compareTo(a.assists);
    if (assists != 0) return assists;
    return b.saves.compareTo(a.saves);
  });
  return performers;
}
