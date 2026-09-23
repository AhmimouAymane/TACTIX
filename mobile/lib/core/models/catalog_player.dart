import 'club.dart';

class CatalogPlayer {
  const CatalogPlayer({
    required this.id,
    required this.firstName,
    required this.lastName,
    required this.position,
    required this.currentPrice,
    this.photoUrl,
    this.status,
    this.club,
  });

  final String id;
  final String firstName;
  final String lastName;
  final String position;
  final double currentPrice;
  final String? photoUrl;
  final String? status;
  final Club? club;

  String get displayName {
    final full = '$firstName $lastName'.trim();
    return full.isEmpty ? 'Unknown player' : full;
  }

  static double _price(dynamic value) {
    if (value is num) return value.toDouble();
    if (value is String) return double.tryParse(value) ?? 0.0;
    return 0.0;
  }

  factory CatalogPlayer.fromJson(Map<String, dynamic> json) {
    final club = json['club'];
    return CatalogPlayer(
      id: json['id'] as String,
      firstName: json['firstName'] as String? ?? '',
      lastName: json['lastName'] as String? ?? '',
      position: json['position'] as String? ?? 'MID',
      currentPrice: _price(json['currentPrice']),
      photoUrl: json['photoUrl'] as String?,
      status: json['status'] as String?,
      club: club is Map<String, dynamic> ? Club.fromJson(club) : null,
    );
  }
}
