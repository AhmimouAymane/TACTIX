import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:tactix/core/core.dart';
import 'package:tactix/core/models/catalog_player.dart';
import 'package:tactix/features/team/domain/pitch_formation.dart';
import 'package:tactix/features/team/domain/squad_draft.dart';
import 'package:tactix/features/team/domain/team_state.dart';
import 'package:tactix/features/team/presentation/screens/player_picker_screen.dart';
import 'package:tactix/features/team/presentation/team_controller.dart';
import 'package:tactix/features/team/presentation/widgets/pitch_view.dart';
import 'package:tactix/l10n/app_localizations.dart';
import 'package:tactix/shared/widgets/widgets.dart';

class SquadBuilderScreen extends ConsumerStatefulWidget {
  const SquadBuilderScreen({super.key});

  @override
  ConsumerState<SquadBuilderScreen> createState() =>
      _SquadBuilderScreenState();
}

class _SquadBuilderScreenState extends ConsumerState<SquadBuilderScreen> {
  late SquadDraft _draft;
  bool _saving = false;

  @override
  void initState() {
    super.initState();
    final state = ref.read(teamControllerProvider);
    _draft =
        state is TeamData ? SquadDraft.fromTeam(state.team) : SquadDraft();
  }

  Future<void> _pickSlot(String group, String slot) async {
    final picked = await Navigator.of(context).push<CatalogPlayer?>(
      MaterialPageRoute(
        builder: (_) => PlayerPickerScreen(
          group: group,
          excludeIds: _draft.picks.map((p) => p.player.id).toSet(),
        ),
      ),
    );
    if (picked == null || !mounted) return;
    HapticFeedback.selectionClick();
    setState(() {
      if (!_draft.addToSlot(picked, slot)) {
        ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(AppLocalizations.of(context).squadFull)),
        );
      }
    });
  }

  Future<void> _playerActions(PitchPlayer node) async {
    final l10n = AppLocalizations.of(context);
    final action = await showModalBottomSheet<String>(
      context: context,
      builder: (context) => SafeArea(
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            ListTile(
              leading: Container(
                width: 32,
                height: 32,
                alignment: Alignment.center,
                decoration: const BoxDecoration(
                  shape: BoxShape.circle,
                  color: AppColors.primary,
                ),
                child: const Text(
                  'C',
                  style: TextStyle(
                    fontFamily: AppTypography.displayFontFamily,
                    fontWeight: FontWeight.w700,
                    color: AppColors.onPrimary,
                  ),
                ),
              ),
              title: Text(l10n.captain),
              onTap: () => Navigator.of(context).pop('captain'),
            ),
            ListTile(
              leading: Container(
                width: 32,
                height: 32,
                alignment: Alignment.center,
                decoration: const BoxDecoration(
                  shape: BoxShape.circle,
                  color: AppColors.accentBlue,
                ),
                child: const Text(
                  'V',
                  style: TextStyle(
                    fontFamily: AppTypography.displayFontFamily,
                    fontWeight: FontWeight.w700,
                    color: AppColors.onPrimary,
                  ),
                ),
              ),
              title: Text(l10n.viceCaptain),
              onTap: () => Navigator.of(context).pop('vice'),
            ),
            ListTile(
              leading: const Icon(Icons.delete_outline),
              title: Text(l10n.removeFromSquad),
              onTap: () => Navigator.of(context).pop('remove'),
            ),
          ],
        ),
      ),
    );
    if (action == null || !mounted) return;
    HapticFeedback.selectionClick();
    // PitchPlayer.key is the player id for filled nodes.
    final id = node.key;
    setState(() {
      switch (action) {
        case 'captain':
          _draft.setCaptain(_draft.captain?.player.id == id ? null : id);
        case 'vice':
          _draft.setViceCaptain(
              _draft.viceCaptain?.player.id == id ? null : id);
        case 'remove':
          _draft.remove(id);
      }
    });
  }

  Future<void> _save() async {
    setState(() => _saving = true);
    final ok =
        await ref.read(teamControllerProvider.notifier).saveSquad(_draft.toJson());
    if (!mounted) return;
    setState(() => _saving = false);
    if (ok) {
      HapticFeedback.lightImpact();
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(AppLocalizations.of(context).squadSaved)),
      );
      context.pop();
    } else {
      ScaffoldMessenger.of(context).showSnackBar(
        SnackBar(content: Text(AppLocalizations.of(context).errorLoading)),
      );
    }
  }

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context);
    final theme = Theme.of(context);
    final formation =
        PitchFormation.fromPicks(_draft.picks, placeholders: true);

    final usedSub = _draft.picks
        .where((p) => p.slot.startsWith('SUB'))
        .map((p) => p.slot)
        .toSet();
    final bench = formation.bench.toList();
    if (!_draft.isFull) {
      for (final slot in squadGroups['SUB']!) {
        if (!usedSub.contains(slot)) {
          bench.add(PitchPlayer.empty(slot));
          break;
        }
      }
    }

    return RtlAwareScaffold(
      appBar: AppBar(
        title: Text(l10n.mySquad),
        actions: [
          TextButton(
            onPressed: _saving || _draft.picks.isEmpty ? null : _save,
            child: _saving
                ? const SizedBox(
                    width: 20,
                    height: 20,
                    child: CircularProgressIndicator(strokeWidth: 2),
                  )
                : Text(l10n.saveSquad),
          ),
        ],
      ),
      body: CustomScrollView(
        slivers: [
          SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.all(AppSpacing.lg),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  _BudgetBar(draft: _draft),
                  const SizedBox(height: AppSpacing.lg),
                  PitchView(
                    formation: formation,
                    editable: true,
                    onEmptySlotTap: (group, slot) => _pickSlot(group, slot),
                    onPlayerTap: _playerActions,
                  ),
                  const SizedBox(height: AppSpacing.lg),
                  Text(
                    l10n.benchTitle,
                    style: theme.textTheme.titleMedium?.copyWith(
                      fontWeight: FontWeight.w700,
                    ),
                  ),
                  const SizedBox(height: AppSpacing.sm),
                  Card(
                    child: Padding(
                      padding: const EdgeInsets.symmetric(
                        vertical: AppSpacing.md,
                      ),
                      child: BenchRow(
                        bench: bench,
                        editable: true,
                        onEmptySlotTap: (group, slot) =>
                            _pickSlot(group, slot),
                        onPlayerTap: _playerActions,
                      ),
                    ),
                  ),
                ],
              ),
            ),
          ),
          const SliverToBoxAdapter(child: SizedBox(height: AppSpacing.xl)),
        ],
      ),
    );
  }
}

class _BudgetBar extends StatelessWidget {
  const _BudgetBar({required this.draft});

  final SquadDraft draft;

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context);
    final theme = Theme.of(context);
    final spent = draft.totalValue;
    final ratio = (spent / squadBudget).clamp(0.0, 1.0);
    final over = draft.budgetLeft < 0;

    return Card(
      child: Padding(
        padding: const EdgeInsets.all(AppSpacing.lg),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                Text(
                  '${l10n.squadValue}: ${spent.toStringAsFixed(1)}',
                  style: const TextStyle(
                    fontFamily: AppTypography.displayFontFamily,
                    fontSize: 16,
                    fontWeight: FontWeight.w700,
                    color: AppColors.textPrimary,
                  ),
                ),
                Text(
                  '${l10n.budget}: ${draft.budgetLeft.toStringAsFixed(1)}',
                  style: TextStyle(
                    fontFamily: AppTypography.displayFontFamily,
                    fontSize: 16,
                    fontWeight: FontWeight.w700,
                    color: over ? AppColors.error : AppColors.primary,
                  ),
                ),
              ],
            ),
            const SizedBox(height: AppSpacing.sm),
            ClipRRect(
              borderRadius: BorderRadius.circular(AppRadii.pill),
              child: LinearProgressIndicator(
                value: ratio,
                minHeight: 8,
                backgroundColor: theme.colorScheme.surfaceContainerHighest,
                valueColor: AlwaysStoppedAnimation(
                  over ? theme.colorScheme.error : theme.colorScheme.primary,
                ),
              ),
            ),
            const SizedBox(height: AppSpacing.xs),
            Text(
              '${draft.picks.length}/$maxSquadPlayers',
              style: theme.textTheme.labelMedium?.copyWith(
                color: theme.colorScheme.onSurfaceVariant,
              ),
            ),
          ],
        ),
      ),
    );
  }
}
