import 'squad_slot.dart';

class FantasyTeam {
  const FantasyTeam({
    required this.id,
    required this.name,
    required this.budgetRemaining,
    required this.value,
    required this.totalPoints,
    this.formation,
    this.currentRank,
    this.squadSlots = const [],
  });

  final String id;
  final String name;
  final double budgetRemaining;
  final double value;
  final int totalPoints;
  final String? formation;
  final int? currentRank;
  final List<SquadSlot> squadSlots;

  static double _price(dynamic value) {
    if (value is num) return value.toDouble();
    if (value is String) return double.tryParse(value) ?? 0.0;
    return 0.0;
  }

  factory FantasyTeam.fromJson(Map<String, dynamic> json) {
    final slots = json['squadSlots'];
    return FantasyTeam(
      id: json['id'] as String,
      name: json['name'] as String? ?? '',
      budgetRemaining: _price(json['budgetRemaining']),
      value: _price(json['value']),
      totalPoints: (json['totalPoints'] as num?)?.toInt() ?? 0,
      formation: json['formation'] as String?,
      currentRank: (json['currentRank'] as num?)?.toInt(),
      squadSlots: slots is List
          ? slots
              .whereType<Map<String, dynamic>>()
              .map(SquadSlot.fromJson)
              .toList()
          : const [],
    );
  }
}
