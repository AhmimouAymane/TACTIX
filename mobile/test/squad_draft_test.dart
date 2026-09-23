import 'package:flutter_test/flutter_test.dart';
import 'package:tactix/core/models/catalog_player.dart';
import 'package:tactix/features/team/domain/squad_draft.dart';

CatalogPlayer player(String id, String position, double price) =>
    CatalogPlayer(
      id: id,
      firstName: 'First',
      lastName: 'Last $id',
      position: position,
      currentPrice: price,
    );

void main() {
  group('SquadDraft', () {
    test('allocates the first free slot of a group', () {
      final draft = SquadDraft();
      expect(draft.add(player('gk1', 'GK', 5.0), 'GK'), isTrue);
      expect(draft.add(player('gk2', 'GK', 4.5), 'GK'), isTrue);
      expect(draft.picks.map((p) => p.slot), ['GK1', 'GK2']);
    });

    test('rejects duplicates, mismatches and full groups', () {
      final draft = SquadDraft();
      expect(draft.add(player('gk1', 'GK', 5.0), 'GK'), isTrue);
      expect(draft.add(player('gk1', 'GK', 5.0), 'GK'), isFalse);
      expect(draft.add(player('fwd1', 'FWD', 8.0), 'GK'), isFalse);
      expect(draft.add(player('gk2', 'GK', 4.5), 'GK'), isTrue);
      expect(draft.add(player('gk3', 'GK', 4.0), 'GK'), isFalse);
    });

    test('SUB accepts any position', () {
      final draft = SquadDraft();
      expect(draft.add(player('m1', 'MID', 6.0), 'SUB'), isTrue);
      expect(draft.picks.single.slot, 'SUB1');
    });

    test('tracks value, budget and captaincy', () {
      final draft = SquadDraft();
      draft.add(player('m1', 'MID', 6.0), 'MID');
      draft.add(player('m2', 'MID', 7.5), 'MID');

      expect(draft.totalValue, 13.5);
      expect(draft.budgetLeft, 86.5);
      expect(draft.captain, isNull);

      draft.setCaptain('m1');
      expect(draft.captain?.player.id, 'm1');
      draft.setCaptain('m2');
      expect(draft.captain?.player.id, 'm2');
      draft.setViceCaptain('m1');
      expect(draft.viceCaptain?.player.id, 'm1');
    });

    test('caps the squad at 15 players', () {
      final draft = SquadDraft();
      final groups = ['DEF', 'DEF', 'DEF', 'DEF', 'DEF', 'MID', 'MID',
        'MID', 'MID', 'MID', 'FWD', 'FWD', 'FWD', 'SUB', 'SUB'];
      var i = 0;
      for (final group in groups) {
        final position = group == 'SUB' ? 'MID' : group;
        expect(draft.add(player('p$i', position, 4.0), group), isTrue);
        i += 1;
      }
      expect(draft.isFull, isTrue);
      expect(draft.add(player('extra', 'MID', 4.0), 'SUB'), isFalse);
    });

    test('removes picks and serializes to the API shape', () {
      final draft = SquadDraft();
      draft.add(player('m1', 'MID', 6.0), 'MID');
      draft.setCaptain('m1');
      draft.remove('m1');
      expect(draft.picks, isEmpty);

      draft.add(player('f1', 'FWD', 9.0), 'FWD');
      draft.setViceCaptain('f1');
      expect(draft.toJson(), [
        {
          'playerId': 'f1',
          'position': 'FWD1',
          'isCaptain': false,
          'isViceCaptain': true,
        },
      ]);
    });
  });
}
