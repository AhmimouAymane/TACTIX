import 'club.dart';
import 'match_event.dart';

class Fixture {
  const Fixture({
    required this.id,
    required this.status,
    required this.kickoffAt,
    required this.homeClub,
    required this.awayClub,
    this.homeScore,
    this.awayScore,
    this.gameweekNumber,
    this.venue,
    this.matchEvents = const [],
  });

  final String id;
  final String status;
  final DateTime kickoffAt;
  final Club homeClub;
  final Club awayClub;
  final int? homeScore;
  final int? awayScore;
  final int? gameweekNumber;
  final String? venue;
  final List<MatchEvent> matchEvents;

  bool get hasScore => homeScore != null && awayScore != null;

  factory Fixture.fromJson(Map<String, dynamic> json) {
    final homeClub = json['homeClub'];
    final awayClub = json['awayClub'];
    final gameweek = json['gameweek'];
    final events = json['matchEvents'];

    return Fixture(
      id: json['id'] as String,
      status: json['status'] as String? ?? 'SCHEDULED',
      kickoffAt: DateTime.tryParse(json['kickoffAt'] as String? ?? '') ??
          DateTime.fromMillisecondsSinceEpoch(0),
      homeClub: homeClub is Map<String, dynamic>
          ? Club.fromJson(homeClub)
          : const Club(id: '', name: '', shortName: ''),
      awayClub: awayClub is Map<String, dynamic>
          ? Club.fromJson(awayClub)
          : const Club(id: '', name: '', shortName: ''),
      homeScore: json['homeScore'] as int?,
      awayScore: json['awayScore'] as int?,
      gameweekNumber: gameweek is Map<String, dynamic>
          ? gameweek['number'] as int?
          : null,
      venue: json['venue'] as String?,
      matchEvents: events is List
          ? events
              .whereType<Map<String, dynamic>>()
              .map(MatchEvent.fromJson)
              .toList()
          : const [],
    );
  }
}