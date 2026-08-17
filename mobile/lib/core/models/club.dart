class Club {
  const Club({
    required this.id,
    required this.name,
    required this.shortName,
    this.crestUrl,
  });

  final String id;
  final String name;
  final String shortName;
  final String? crestUrl;

  factory Club.fromJson(Map<String, dynamic> json) {
    return Club(
      id: json['id'] as String,
      name: json['name'] as String? ?? '',
      shortName: json['shortName'] as String? ?? '',
      crestUrl: json['crestUrl'] as String?,
    );
  }
}