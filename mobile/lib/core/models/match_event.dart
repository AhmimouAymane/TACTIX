class MatchEvent {
  const MatchEvent({
    required this.id,
    required this.type,
    required this.minute,
    this.playerName,
    this.detail,
  });

  final String id;
  final String type;
  final int minute;
  final String? playerName;
  final String? detail;

  factory MatchEvent.fromJson(Map<String, dynamic> json) {
    final player = json['player'];
    final playerName = player is Map<String, dynamic>
        ? [
            if (player['firstName'] != null) player['firstName'] as String,
            if (player['lastName'] != null) player['lastName'] as String,
          ].join(' ')
        : null;

    return MatchEvent(
      id: json['id'] as String,
      type: json['type'] as String? ?? 'VAR_DECISION',
      minute: json['minute'] as int? ?? 0,
      playerName: playerName,
      detail: json['detail'] as String?,
    );
  }
}