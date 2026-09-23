import 'fixture.dart';

class Gameweek {
  const Gameweek({
    required this.id,
    required this.number,
    required this.status,
    required this.deadlineAt,
    this.competitionName,
    this.fixtureCount,
    this.entryCount,
    this.fixtures = const [],
  });

  final String id;
  final int number;
  final String status;
  final DateTime deadlineAt;
  final String? competitionName;
  final int? fixtureCount;
  final int? entryCount;
  final List<Fixture> fixtures;

  bool get isCurrent => status == 'OPEN' || status == 'LIVE';

  /// Short season tag to disambiguate same-number gameweeks across
  /// competitions ("25/26" from "Botola Pro D1 25/26").
  String get seasonTag {
    final name = competitionName ?? '';
    final parts = name.split(' ').where((p) => p.isNotEmpty).toList();
    return parts.isEmpty ? '' : parts.last;
  }

  factory Gameweek.fromJson(Map<String, dynamic> json) {
    final competition = json['competition'];
    final count = json['_count'];
    final fixtures = json['fixtures'];

    return Gameweek(
      id: json['id'] as String,
      number: json['number'] as int? ?? 0,
      status: json['status'] as String? ?? 'UPCOMING',
      deadlineAt: DateTime.tryParse(json['deadlineAt'] as String? ?? '') ??
          DateTime.fromMillisecondsSinceEpoch(0),
      competitionName: competition is Map<String, dynamic>
          ? competition['name'] as String?
          : null,
      fixtureCount: count is Map<String, dynamic> ? count['fixtures'] as int? : null,
      entryCount: count is Map<String, dynamic> ? count['entries'] as int? : null,
      fixtures: fixtures is List
          ? fixtures
              .whereType<Map<String, dynamic>>()
              .map(Fixture.fromJson)
              .toList()
          : const [],
    );
  }
}