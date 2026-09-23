import 'package:tactix/core/models/catalog_player.dart';
import 'package:tactix/core/models/fantasy_team.dart';
import 'package:tactix/core/models/squad_slot.dart';

/// Position groups with their slot names. Mirrors the backend slot enum.
const squadGroups = <String, List<String>>{
  'GK': ['GK1', 'GK2'],
  'DEF': ['DEF1', 'DEF2', 'DEF3', 'DEF4', 'DEF5'],
  'MID': ['MID1', 'MID2', 'MID3', 'MID4', 'MID5'],
  'FWD': ['FWD1', 'FWD2', 'FWD3'],
  'SUB': ['SUB1', 'SUB2', 'SUB3', 'SUB4'],
};

const maxSquadPlayers = 15;
const squadBudget = 100.0;

/// Group prefix of a slot name: GK1 -> GK, SUB3 -> SUB.
String slotGroup(String slot) {
  if (slot.startsWith('SUB')) return 'SUB';
  if (slot.startsWith('GK')) return 'GK';
  if (slot.startsWith('DEF')) return 'DEF';
  if (slot.startsWith('MID')) return 'MID';
  if (slot.startsWith('FWD')) return 'FWD';
  return 'SUB';
}

class DraftPick {
  DraftPick({
    required this.player,
    required this.slot,
    this.isCaptain = false,
    this.isViceCaptain = false,
  });

  final CatalogPlayer player;
  final String slot;
  bool isCaptain;
  bool isViceCaptain;

  Map<String, dynamic> toJson() => {
        'playerId': player.id,
        'position': slot,
        'isCaptain': isCaptain,
        'isViceCaptain': isViceCaptain,
      };
}

/// Mutable squad draft: slot allocation, budget, captain rules.
class SquadDraft {
  SquadDraft([List<DraftPick>? picks]) : _picks = picks ?? [];

  final List<DraftPick> _picks;

  List<DraftPick> get picks => List.unmodifiable(_picks);

  double get totalValue =>
      _picks.fold(0.0, (sum, pick) => sum + pick.player.currentPrice);

  double get budgetLeft => squadBudget - totalValue;

  bool get isFull => _picks.length >= maxSquadPlayers;

  DraftPick? get captain {
    for (final pick in _picks) {
      if (pick.isCaptain) return pick;
    }
    return null;
  }

  DraftPick? get viceCaptain {
    for (final pick in _picks) {
      if (pick.isViceCaptain) return pick;
    }
    return null;
  }

  bool contains(String playerId) =>
      _picks.any((pick) => pick.player.id == playerId);

  /// First free slot of [group] for [player], or null when the pick is
  /// not allowed (duplicate, group full, squad full, position mismatch).
  String? freeSlot(CatalogPlayer player, String group) {
    if (contains(player.id) || isFull) return null;
    final slots = squadGroups[group];
    if (slots == null) return null;
    if (group != 'SUB' && player.position != group) return null;
    final used = _picks.map((pick) => pick.slot).toSet();
    for (final slot in slots) {
      if (!used.contains(slot)) return slot;
    }
    return null;
  }

  bool add(CatalogPlayer player, String group) {
    final slot = freeSlot(player, group);
    if (slot == null) return false;
    _picks.add(DraftPick(player: player, slot: slot));
    return true;
  }

  /// Adds [player] to an exact [slot] (used by pitch placeholders).
  bool addToSlot(CatalogPlayer player, String slot) {
    final group = slotGroup(slot);
    if (contains(player.id) || isFull) return false;
    if (_picks.any((pick) => pick.slot == slot)) return false;
    final slots = squadGroups[group];
    if (slots == null || !slots.contains(slot)) return false;
    if (group != 'SUB' && player.position != group) return false;
    _picks.add(DraftPick(player: player, slot: slot));
    return true;
  }

  void remove(String playerId) {
    _picks.removeWhere((pick) => pick.player.id == playerId);
  }

  void setCaptain(String? playerId) {
    for (final pick in _picks) {
      pick.isCaptain = pick.player.id == playerId;
    }
  }

  void setViceCaptain(String? playerId) {
    for (final pick in _picks) {
      pick.isViceCaptain = pick.player.id == playerId;
    }
  }

  List<Map<String, dynamic>> toJson() =>
      _picks.map((pick) => pick.toJson()).toList();

  /// Seeds a draft from a saved team (slots keep their positions).
  factory SquadDraft.fromTeam(FantasyTeam team) {
    return SquadDraft(
      team.squadSlots
          .where((slot) => slot.player != null)
          .map((slot) => DraftPick(
                player: slot.player!,
                slot: slot.position,
                isCaptain: slot.isCaptain,
                isViceCaptain: slot.isViceCaptain,
              ))
          .toList(),
    );
  }
}
