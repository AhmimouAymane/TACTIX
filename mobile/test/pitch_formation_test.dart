import 'package:flutter_test/flutter_test.dart';
import 'package:tactix/core/models/catalog_player.dart';
import 'package:tactix/features/team/domain/pitch_formation.dart';
import 'package:tactix/features/team/domain/squad_draft.dart';

DraftPick pick(String id, String position, String slot) => DraftPick(
      player: CatalogPlayer(
        id: id,
        firstName: 'First',
        lastName: 'Last $id',
        position: position,
        currentPrice: 5.0,
      ),
      slot: slot,
    );

void main() {
  group('PitchFormation.fromPicks', () {
    test('groups starters by line and bench separately', () {
      final formation = PitchFormation.fromPicks([
        pick('gk', 'GK', 'GK1'),
        pick('d1', 'DEF', 'DEF1'),
        pick('d2', 'DEF', 'DEF2'),
        pick('m1', 'MID', 'MID1'),
        pick('f1', 'FWD', 'FWD1'),
        pick('s1', 'MID', 'SUB1'),
      ]);

      expect(formation.lines.map((l) => l.group), ['GK', 'DEF', 'MID', 'FWD']);
      expect(formation.label, '2-1-1');
      expect(formation.starterCount, 5);
      expect(formation.bench.map((p) => p.slot), ['SUB1']);
    });

    test('adds placeholders up to a full XI', () {
      final formation = PitchFormation.fromPicks(
        [pick('gk', 'GK', 'GK1'), pick('f1', 'FWD', 'FWD1')],
        placeholders: true,
      );

      final gk = formation.lines.firstWhere((l) => l.group == 'GK');
      expect(gk.nodes.where((n) => n.isEmpty), isEmpty);

      final def = formation.lines.firstWhere((l) => l.group == 'DEF');
      expect(def.nodes, hasLength(5));
      expect(def.nodes.every((n) => n.isEmpty), isTrue);

      final fwd = formation.lines.firstWhere((l) => l.group == 'FWD');
      expect(fwd.nodes.where((n) => !n.isEmpty), hasLength(1));
    });

    test('sorts nodes by slot number', () {
      final formation = PitchFormation.fromPicks([
        pick('m2', 'MID', 'MID2'),
        pick('m1', 'MID', 'MID1'),
      ]);

      final mid = formation.lines.singleWhere((l) => l.group == 'MID');
      expect(mid.nodes.map((n) => n.slot), ['MID1', 'MID2']);
    });
  });

  group('PitchPlayer.label', () {
    test('uses the last name as shirt label', () {
      final formation = PitchFormation.fromPicks([
        pick('m1', 'MID', 'MID1'),
      ]);
      final node = formation.lines.single.nodes.single;
      expect(node.name, 'First Last m1');
      expect(node.label, 'Last m1');
    });
  });

  group('slotGroup', () {test('maps slot names to groups', () {
      expect(slotGroup('GK1'), 'GK');
      expect(slotGroup('DEF4'), 'DEF');
      expect(slotGroup('MID2'), 'MID');
      expect(slotGroup('FWD3'), 'FWD');
      expect(slotGroup('SUB1'), 'SUB');
    });
  });

  group('SquadDraft.addToSlot', () {
    test('fills an exact slot and rejects conflicts', () {
      final draft = SquadDraft();
      final keeper = CatalogPlayer(
        id: 'gk',
        firstName: 'A',
        lastName: 'B',
        position: 'GK',
        currentPrice: 5.0,
      );
      final other = CatalogPlayer(
        id: 'gk2',
        firstName: 'C',
        lastName: 'D',
        position: 'GK',
        currentPrice: 4.5,
      );

      expect(draft.addToSlot(keeper, 'GK1'), isTrue);
      expect(draft.addToSlot(other, 'GK1'), isFalse);
      expect(draft.addToSlot(keeper, 'GK2'), isFalse);
      expect(
        draft.addToSlot(
          CatalogPlayer(
            id: 'f',
            firstName: 'E',
            lastName: 'F',
            position: 'FWD',
            currentPrice: 9.0,
          ),
          'GK2',
        ),
        isFalse,
      );
    });
  });
}
