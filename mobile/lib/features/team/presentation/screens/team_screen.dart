import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:tactix/core/core.dart';
import 'package:tactix/core/routes/route_names.dart';
import 'package:tactix/features/team/domain/pitch_formation.dart';
import 'package:tactix/features/team/domain/squad_draft.dart';
import 'package:tactix/features/team/domain/team_state.dart';
import 'package:tactix/features/team/presentation/team_controller.dart';
import 'package:tactix/features/team/presentation/widgets/pitch_view.dart';
import 'package:tactix/l10n/app_localizations.dart';
import 'package:tactix/shared/widgets/widgets.dart';

class TeamScreen extends ConsumerStatefulWidget {
  const TeamScreen({super.key});

  @override
  ConsumerState<TeamScreen> createState() => _TeamScreenState();
}

class _TeamScreenState extends ConsumerState<TeamScreen> {
  final _nameController = TextEditingController();

  @override
  void initState() {
    super.initState();
    Future.microtask(
      () => ref.read(teamControllerProvider.notifier).loadMyTeam(),
    );
  }

  @override
  void dispose() {
    _nameController.dispose();
    super.dispose();
  }

  Future<void> _reload() =>
      ref.read(teamControllerProvider.notifier).loadMyTeam();

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context);
    final state = ref.watch(teamControllerProvider);

    return RtlAwareScaffold(
      appBar: AppBar(
        title: Text(l10n.navTeam),
        actions: [
          if (state is TeamData)
            IconButton(
              icon: const Icon(Icons.edit_outlined),
              tooltip: l10n.editSquad,
              onPressed: () => context.push(AppRoutes.squadBuilder),
            ),
        ],
      ),
      body: switch (state) {
        TeamInitial() || TeamLoading() => const Center(
            child: CircularProgressIndicator(),
          ),
        TeamUnauthenticated() => _SignInPrompt(onSignIn: () {
            context.push(AppRoutes.login);
          }),
        TeamEmpty() => _CreateTeamView(
            nameController: _nameController,
            onCreate: _create,
          ),
        TeamData(:final team) => _TeamView(team: team, onEdit: () {
            context.push(AppRoutes.squadBuilder);
          }),
        TeamError(:final message) => Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text(message),
                const SizedBox(height: AppSpacing.lg),
                FilledButton.icon(
                  onPressed: _reload,
                  icon: const Icon(Icons.refresh),
                  label: Text(l10n.retry),
                ),
              ],
            ),
          ),
      },
    );
  }

  Future<void> _create() async {
    final name = _nameController.text.trim();
    if (name.isEmpty) return;
    final created =
        await ref.read(teamControllerProvider.notifier).createTeam(name);
    if (created && mounted) {
      context.push(AppRoutes.squadBuilder);
    }
  }
}

class _SignInPrompt extends StatelessWidget {
  const _SignInPrompt({required this.onSignIn});

  final VoidCallback onSignIn;

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context);
    final theme = Theme.of(context);

    return Center(
      child: Padding(
        padding: const EdgeInsets.all(AppSpacing.xl),
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Icon(
              Icons.lock_outline,
              size: 48,
              color: theme.colorScheme.onSurfaceVariant,
            ),
            const SizedBox(height: AppSpacing.md),
            Text(
              l10n.signInToPlay,
              textAlign: TextAlign.center,
              style: theme.textTheme.bodyLarge,
            ),
            const SizedBox(height: AppSpacing.lg),
            FilledButton.icon(
              onPressed: onSignIn,
              icon: const Icon(Icons.login),
              label: Text(l10n.login),
            ),
          ],
        ),
      ),
    );
  }
}

class _CreateTeamView extends StatelessWidget {
  const _CreateTeamView({
    required this.nameController,
    required this.onCreate,
  });

  final TextEditingController nameController;
  final VoidCallback onCreate;

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context);
    final theme = Theme.of(context);

    return SingleChildScrollView(
      padding: const EdgeInsets.all(AppSpacing.xl),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        children: [
          const SizedBox(height: AppSpacing.xxl),
          Icon(
            Icons.groups_outlined,
            size: 64,
            color: theme.colorScheme.primary,
          ),
          const SizedBox(height: AppSpacing.lg),
          Text(
            l10n.noTeamTitle,
            textAlign: TextAlign.center,
            style: theme.textTheme.headlineSmall?.copyWith(
              fontWeight: FontWeight.w700,
            ),
          ),
          const SizedBox(height: AppSpacing.sm),
          Text(
            l10n.noTeamSubtitle,
            textAlign: TextAlign.center,
            style: theme.textTheme.bodyMedium?.copyWith(
              color: theme.colorScheme.onSurfaceVariant,
            ),
          ),
          const SizedBox(height: AppSpacing.xl),
          TextField(
            controller: nameController,
            maxLength: 40,
            textInputAction: TextInputAction.done,
            onSubmitted: (_) => onCreate(),
            decoration: InputDecoration(
              labelText: l10n.teamNameLabel,
              border: const OutlineInputBorder(),
            ),
          ),
          const SizedBox(height: AppSpacing.md),
          FilledButton.icon(
            onPressed: onCreate,
            icon: const Icon(Icons.add),
            label: Text(l10n.createTeam),
          ),
        ],
      ),
    );
  }
}

class _TeamView extends StatefulWidget {
  const _TeamView({required this.team, required this.onEdit});

  final FantasyTeam team;
  final VoidCallback onEdit;

  @override
  State<_TeamView> createState() => _TeamViewState();
}

class _TeamViewState extends State<_TeamView> {
  bool _pitch = true;

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context);
    final theme = Theme.of(context);
    final team = widget.team;

    final byGroup = <String, List<SquadSlot>>{};
    for (final slot in team.squadSlots) {
      byGroup.putIfAbsent(slot.group, () => []).add(slot);
    }
    final formation = PitchFormation.fromSlots(team.squadSlots);

    return CustomScrollView(
      slivers: [
        SliverToBoxAdapter(
          child: Padding(
            padding: const EdgeInsets.all(AppSpacing.lg),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Card(
                  child: Padding(
                    padding: const EdgeInsets.all(AppSpacing.lg),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Row(
                          children: [
                            Expanded(
                              child: Text(
                                team.name,
                                style: theme.textTheme.headlineSmall?.copyWith(
                                  fontWeight: FontWeight.w800,
                                ),
                              ),
                            ),
                            FilledButton.tonalIcon(
                              onPressed: widget.onEdit,
                              icon: const Icon(Icons.edit_outlined, size: 18),
                              label: Text(l10n.editSquad),
                            ),
                          ],
                        ),
                        const SizedBox(height: AppSpacing.md),
                        Row(
                          children: [
                            _StatChip(
                              label: l10n.points,
                              value: '${team.totalPoints}',
                            ),
                            const SizedBox(width: AppSpacing.sm),
                            _StatChip(
                              label: l10n.squadValue,
                              value: team.value.toStringAsFixed(1),
                            ),
                            const SizedBox(width: AppSpacing.sm),
                            _StatChip(
                              label: l10n.budget,
                              value: team.budgetRemaining.toStringAsFixed(1),
                            ),
                          ],
                        ),
                      ],
                    ),
                  ),
                ),
                const SizedBox(height: AppSpacing.lg),
                if (team.squadSlots.isEmpty)
                  Card(
                    child: Padding(
                      padding: const EdgeInsets.all(AppSpacing.xl),
                      child: Row(
                        children: [
                          Icon(
                            Icons.hourglass_empty,
                            color: theme.colorScheme.onSurfaceVariant,
                          ),
                          const SizedBox(width: AppSpacing.md),
                          Expanded(child: Text(l10n.emptyState)),
                        ],
                      ),
                    ),
                  )
                else ...[
                  Center(
                    child: SegmentedButton<bool>(
                      segments: [
                        ButtonSegment(
                          value: true,
                          icon: const Icon(Icons.sports_soccer, size: 18),
                          label: Text(l10n.viewPitch),
                        ),
                        ButtonSegment(
                          value: false,
                          icon: const Icon(Icons.list, size: 18),
                          label: Text(l10n.viewList),
                        ),
                      ],
                      selected: {_pitch},
                      onSelectionChanged: (selection) =>
                          setState(() => _pitch = selection.first),
                    ),
                  ),
                  const SizedBox(height: AppSpacing.md),
                  if (_pitch) ...[
                    PitchView(
                      formation: formation,
                      showPlaceholders: false,
                    ),
                    if (formation.bench.isNotEmpty) ...[
                      const SizedBox(height: AppSpacing.md),
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
                          child: BenchRow(bench: formation.bench),
                        ),
                      ),
                    ],
                  ] else
                    for (final group in squadGroups.keys)
                      if ((byGroup[group] ?? const []).isNotEmpty) ...[
                        Padding(
                          padding: const EdgeInsets.symmetric(
                            vertical: AppSpacing.sm,
                          ),
                          child: Text(
                            group,
                            style: theme.textTheme.titleMedium?.copyWith(
                              fontWeight: FontWeight.w700,
                            ),
                          ),
                        ),
                        Card(
                          child: Column(
                            children: [
                              for (final slot in byGroup[group]!)
                                _SquadRow(slot: slot),
                            ],
                          ),
                        ),
                        const SizedBox(height: AppSpacing.sm),
                      ],
                ],
              ],
            ),
          ),
        ),
      ],
    );
  }
}

class _StatChip extends StatelessWidget {
  const _StatChip({required this.label, required this.value});

  final String label;
  final String value;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    return Expanded(
      child: Container(
        padding: const EdgeInsets.symmetric(
          horizontal: AppSpacing.md,
          vertical: AppSpacing.sm,
        ),
        decoration: BoxDecoration(
          color: theme.colorScheme.surfaceContainerHighest,
          borderRadius: BorderRadius.circular(AppRadii.medium),
        ),
        child: Column(
          children: [
            Text(
              value,
              style: const TextStyle(
                fontFamily: AppTypography.displayFontFamily,
                fontSize: 19,
                fontWeight: FontWeight.w700,
                color: AppColors.primary,
                height: 1.2,
              ),
            ),
            Text(
              label,
              maxLines: 1,
              overflow: TextOverflow.ellipsis,
              style: theme.textTheme.labelSmall?.copyWith(
                color: theme.colorScheme.onSurfaceVariant,
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _SquadRow extends StatelessWidget {
  const _SquadRow({required this.slot});

  final SquadSlot slot;

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context);
    final theme = Theme.of(context);
    final player = slot.player;

    return ListTile(
      dense: true,
      leading: CircleAvatar(
        radius: 18,
        backgroundColor: theme.colorScheme.surfaceContainerHighest,
        foregroundImage:
            player?.photoUrl != null && player!.photoUrl!.isNotEmpty
                ? NetworkImage(player.photoUrl!)
                : null,
        child: player?.photoUrl != null && player!.photoUrl!.isNotEmpty
            ? null
            : Text(
                slot.position,
                style: theme.textTheme.labelSmall?.copyWith(
                  fontWeight: FontWeight.w700,
                ),
              ),
      ),
      title: Text(
        player?.displayName ?? l10n.emptySlot,
        style: theme.textTheme.bodyMedium?.copyWith(
          fontWeight: FontWeight.w600,
        ),
      ),
      subtitle: player == null
          ? null
          : Text(
              '${player.club?.shortName ?? ''} · ${slot.purchasedPrice.toStringAsFixed(1)}',
              style: theme.textTheme.labelMedium?.copyWith(
                color: theme.colorScheme.onSurfaceVariant,
              ),
            ),
      trailing: Row(
        mainAxisSize: MainAxisSize.min,
        children: [
          if (slot.isCaptain)
            _RoleBadge(label: 'C', tooltip: l10n.captain),
          if (slot.isViceCaptain)
            _RoleBadge(label: 'V', tooltip: l10n.viceCaptain),
        ],
      ),
    );
  }
}

class _RoleBadge extends StatelessWidget {
  const _RoleBadge({required this.label, required this.tooltip});

  final String label;
  final String tooltip;

  @override
  Widget build(BuildContext context) {
    return Tooltip(
      message: tooltip,
      child: Container(
        margin: const EdgeInsets.only(left: AppSpacing.xs),
        width: 28,
        height: 28,
        alignment: Alignment.center,
        decoration: BoxDecoration(
          color: label == 'C' ? AppColors.primary : AppColors.accentBlue,
          shape: BoxShape.circle,
        ),
        child: Text(
          label,
          style: const TextStyle(
            fontFamily: AppTypography.displayFontFamily,
            fontSize: 14,
            fontWeight: FontWeight.w700,
            color: AppColors.onPrimary,
            height: 1,
          ),
        ),
      ),
    );
  }
}
