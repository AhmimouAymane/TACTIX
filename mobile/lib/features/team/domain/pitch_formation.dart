import 'package:tactix/core/models/catalog_player.dart';
import 'package:tactix/core/models/squad_slot.dart';
import 'package:tactix/features/team/domain/squad_draft.dart';

/// UI-agnostic view model for one pitch node.
class PitchPlayer {
  const PitchPlayer({
    required this.key,
    required this.name,
    required this.slot,
    required this.group,
    this.photoUrl,
    this.clubShort,
    this.price = 0.0,
    this.isCaptain = false,
    this.isViceCaptain = false,
  });

  final String key;
  final String name;
  final String slot;
  final String group;
  final String? photoUrl;
  final String? clubShort;
  final double price;
  final bool isCaptain;
  final bool isViceCaptain;

  /// Shirt label: last name fits under a node, full names don't.
  String get label {
    final parts = name.trim().split(RegExp(r'\s+'));
    if (parts.length > 1) return parts.sublist(1).join(' ');
    return name;
  }

  factory PitchPlayer.fromDraft(DraftPick pick) => PitchPlayer(
        key: pick.player.id,
        name: pick.player.displayName,
        slot: pick.slot,
        group: _groupOf(pick.slot),
        photoUrl: pick.player.photoUrl,
        clubShort: pick.player.club?.shortName,
        price: pick.player.currentPrice,
        isCaptain: pick.isCaptain,
        isViceCaptain: pick.isViceCaptain,
      );

  factory PitchPlayer.fromSlot(SquadSlot slot) {
    final player = slot.player;
    return PitchPlayer(
      key: player?.id ?? slot.id,
      name: player?.displayName ?? '',
      slot: slot.position,
      group: slot.group,
      photoUrl: player?.photoUrl,
      clubShort: player?.club?.shortName,
      price: slot.purchasedPrice,
      isCaptain: slot.isCaptain,
      isViceCaptain: slot.isViceCaptain,
    );
  }

  factory PitchPlayer.empty(String slot) => PitchPlayer(
        key: 'empty-$slot',
        name: '',
        slot: slot,
        group: _groupOf(slot),
      );

  bool get isEmpty => name.isEmpty;

  static String _groupOf(String slot) {
    if (slot.startsWith('SUB')) return 'SUB';
    if (slot.startsWith('GK')) return 'GK';
    if (slot.startsWith('DEF')) return 'DEF';
    if (slot.startsWith('MID')) return 'MID';
    if (slot.startsWith('FWD')) return 'FWD';
    return 'SUB';
  }
}

/// One horizontal line of the pitch (without the bench).
class PitchLine {
  const PitchLine({required this.group, required this.nodes});

  final String group;
  final List<PitchPlayer> nodes;
}

/// Formation derived from filled slots. Starters are non-SUB slots,
/// SUB slots form the bench. Empty starter slots become tappable
/// placeholders up to a target XI (1 GK, up to 5 DEF / 5 MID / 3 FWD).
class PitchFormation {
  const PitchFormation({required this.lines, required this.bench});

  final List<PitchLine> lines;
  final List<PitchPlayer> bench;

  /// e.g. "4-4-2" (DEF-MID-FWD starter counts, GK implied).
  /// Only filled shirts count — placeholders never inflate the label.
  String get label {
    String count(String group) => lines
        .where((line) => line.group == group)
        .fold<int>(
            0,
            (sum, line) =>
                sum + line.nodes.where((n) => !n.isEmpty).length)
        .toString();
    return '${count('DEF')}-${count('MID')}-${count('FWD')}';
  }

  int get starterCount =>
      lines.fold(0, (sum, line) => sum + line.nodes.length);

  static const _lineOrder = ['GK', 'DEF', 'MID', 'FWD'];

  static int _slotIndex(String slot) {
    final digits = RegExp(r'\d+').firstMatch(slot)?.group(0);
    return int.tryParse(digits ?? '') ?? 99;
  }

  factory PitchFormation.fromPicks(
    List<DraftPick> picks, {
    bool placeholders = false,
  }) {
    return _build(
      picks.map(PitchPlayer.fromDraft).toList(),
      placeholders: placeholders,
    );
  }

  factory PitchFormation.fromSlots(
    List<SquadSlot> slots, {
    bool placeholders = false,
  }) {
    return _build(
      slots
          .where((slot) => slot.player != null)
          .map(PitchPlayer.fromSlot)
          .toList(),
      placeholders: placeholders,
    );
  }

  static PitchFormation _build(
    List<PitchPlayer> filled, {
    required bool placeholders,
  }) {
    final byGroup = <String, List<PitchPlayer>>{};
    for (final player in filled) {
      if (player.group == 'SUB') continue;
      byGroup.putIfAbsent(player.group, () => []).add(player);
    }

    const capacities = {'GK': 1, 'DEF': 5, 'MID': 5, 'FWD': 3};
    final lines = <PitchLine>[];
    for (final group in _lineOrder) {
      final nodes = (byGroup[group] ?? []).toList()
        ..sort((a, b) => _slotIndex(a.slot).compareTo(_slotIndex(b.slot)));
      if (placeholders) {
        final capacity = capacities[group] ?? 0;
        final usedSlots = nodes.map((n) => n.slot).toSet();
        final allSlots = squadGroups[group] ?? const [];
        for (final slot in allSlots) {
          if (nodes.length >= capacity) break;
          if (!usedSlots.contains(slot)) {
            nodes.add(PitchPlayer.empty(slot));
          }
        }
        nodes.sort((a, b) => _slotIndex(a.slot).compareTo(_slotIndex(b.slot)));
      }
      if (nodes.isNotEmpty) lines.add(PitchLine(group: group, nodes: nodes));
    }

    final bench = filled
        .where((player) => player.group == 'SUB')
        .toList()
      ..sort((a, b) => _slotIndex(a.slot).compareTo(_slotIndex(b.slot)));

    return PitchFormation(lines: lines, bench: bench);
  }
}

/// Suggested next slot when the user taps "add" on a line, or null when
/// the line (or the 15-player squad) is full.
String? nextSlotFor(String group, List<DraftPick> picks) {
  if (picks.length >= maxSquadPlayers) return null;
  final slots = squadGroups[group];
  if (slots == null) return null;
  final used = picks.map((pick) => pick.slot).toSet();
  for (final slot in slots) {
    if (!used.contains(slot)) return slot;
  }
  return null;
}
