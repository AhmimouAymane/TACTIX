import 'catalog_player.dart';

class SquadSlot {
  const SquadSlot({
    required this.id,
    required this.playerId,
    required this.position,
    required this.isCaptain,
    required this.isViceCaptain,
    required this.purchasedPrice,
    this.player,
  });

  final String id;
  final String playerId;
  final String position;
  final bool isCaptain;
  final bool isViceCaptain;
  final double purchasedPrice;
  final CatalogPlayer? player;

  static double _price(dynamic value) {
    if (value is num) return value.toDouble();
    if (value is String) return double.tryParse(value) ?? 0.0;
    return 0.0;
  }

  static bool _flag(dynamic value) {
    if (value is bool) return value;
    if (value is num) return value != 0;
    return false;
  }

  factory SquadSlot.fromJson(Map<String, dynamic> json) {
    final player = json['player'];
    return SquadSlot(
      id: json['id'] as String? ?? '',
      playerId: json['playerId'] as String? ?? '',
      position: json['position'] as String? ?? 'SUB1',
      isCaptain: _flag(json['isCaptain']),
      isViceCaptain: _flag(json['isViceCaptain']),
      purchasedPrice: _price(json['purchasedPrice']),
      player: player is Map<String, dynamic>
          ? CatalogPlayer.fromJson(player)
          : null,
    );
  }

  /// Position group prefix: GK1 -> GK, SUB3 -> SUB.
  String get group {
    if (position.startsWith('SUB')) return 'SUB';
    if (position.startsWith('GK')) return 'GK';
    if (position.startsWith('DEF')) return 'DEF';
    if (position.startsWith('MID')) return 'MID';
    if (position.startsWith('FWD')) return 'FWD';
    return 'SUB';
  }
}
