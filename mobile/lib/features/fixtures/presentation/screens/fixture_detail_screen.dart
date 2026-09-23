import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:tactix/core/core.dart';
import 'package:tactix/features/fixtures/domain/fixtures_state.dart';
import 'package:tactix/features/fixtures/domain/match_timeline.dart';
import 'package:tactix/features/fixtures/presentation/fixtures_controller.dart';
import 'package:tactix/features/fixtures/presentation/widgets/fixture_widgets.dart';
import 'package:tactix/l10n/app_localizations.dart';
import 'package:tactix/shared/widgets/widgets.dart';

class FixtureDetailScreen extends ConsumerStatefulWidget {
  const FixtureDetailScreen({super.key, required this.fixtureId});

  final String fixtureId;

  @override
  ConsumerState<FixtureDetailScreen> createState() =>
      _FixtureDetailScreenState();
}

class _FixtureDetailScreenState extends ConsumerState<FixtureDetailScreen> {
  @override
  void initState() {
    super.initState();
    Future.microtask(() {
      ref
          .read(fixtureDetailControllerProvider.notifier)
          .load(widget.fixtureId);
    });
  }

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context);
    final detail = ref.watch(fixtureDetailControllerProvider);

    return RtlAwareScaffold(
      appBar: AppBar(
        title: Text(l10n.matchEvents),
      ),
      body: switch (detail) {
        FixtureDetailLoading() || FixtureDetailIdle() => const Center(
            child: CircularProgressIndicator(),
          ),
        FixtureDetailError() => Center(
            child: Column(
              mainAxisAlignment: MainAxisAlignment.center,
              children: [
                Text(l10n.errorLoading),
                const SizedBox(height: AppSpacing.lg),
                FilledButton.icon(
                  onPressed: () => ref
                      .read(fixtureDetailControllerProvider.notifier)
                      .load(widget.fixtureId),
                  icon: const Icon(Icons.refresh),
                  label: Text(l10n.retry),
                ),
              ],
            ),
          ),
        FixtureDetailData(:final fixture) => _buildContent(context, fixture),
      },
    );
  }

  Widget _buildContent(BuildContext context, Fixture fixture) {
    final theme = Theme.of(context);
    final l10n = AppLocalizations.of(context);
    final material = MaterialLocalizations.of(context);

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
                      children: [
                        Row(
                          children: [
                            Expanded(child: ClubBadge(club: fixture.homeClub)),
                            Padding(
                              padding: const EdgeInsets.symmetric(
                                horizontal: AppSpacing.md,
                              ),
                              child: Column(
                                children: [
                                  FixtureStatusBadge(status: fixture.status),
                                  const SizedBox(height: AppSpacing.sm),
                                  if (fixture.hasScore)
                                    Text(
                                      '${fixture.homeScore} - ${fixture.awayScore}',
                                      style: theme.textTheme.headlineMedium
                                          ?.copyWith(
                                        fontWeight: FontWeight.w800,
                                      ),
                                    )
                                  else
                                    Text(
                                      material.formatTimeOfDay(
                                        TimeOfDay.fromDateTime(
                                          fixture.kickoffAt,
                                        ),
                                      ),
                                      style:
                                          theme.textTheme.titleMedium?.copyWith(
                                        color: theme.colorScheme.onSurfaceVariant,
                                      ),
                                    ),
                                  const SizedBox(height: AppSpacing.xs),
                                  Text(
                                    material.formatMediumDate(
                                      fixture.kickoffAt,
                                    ),
                                    style: theme.textTheme.labelMedium?.copyWith(
                                      color:
                                          theme.colorScheme.onSurfaceVariant,
                                    ),
                                  ),
                                  if (fixture.gameweekNumber != null) ...[
                                    const SizedBox(height: AppSpacing.xs),
                                    Text(
                                      l10n.gameweekNumber(
                                        '${fixture.gameweekNumber}',
                                      ),
                                      style: theme.textTheme.labelSmall?.copyWith(
                                        color: theme.colorScheme.primary,
                                        fontWeight: FontWeight.w700,
                                      ),
                                    ),
                                  ],
                                  if (fixture.venue != null &&
                                      fixture.venue!.isNotEmpty) ...[
                                    const SizedBox(height: AppSpacing.xs),
                                    Row(
                                      mainAxisAlignment:
                                          MainAxisAlignment.center,
                                      mainAxisSize: MainAxisSize.min,
                                      children: [
                                        Icon(
                                          Icons.location_on_outlined,
                                          size: 14,
                                          color: theme.colorScheme
                                              .onSurfaceVariant,
                                        ),
                                        const SizedBox(width: AppSpacing.xs),
                                        Flexible(
                                          child: Text(
                                            fixture.venue!,
                                            style: theme.textTheme.labelSmall
                                                ?.copyWith(
                                              color: theme.colorScheme
                                                  .onSurfaceVariant,
                                            ),
                                            overflow: TextOverflow.ellipsis,
                                          ),
                                        ),
                                      ],
                                    ),
                                  ],
                                ],
                              ),
                            ),
                            Expanded(child: ClubBadge(club: fixture.awayClub)),
                          ],
                        ),
                      ],
                    ),
                  ),
                ),
                const SizedBox(height: AppSpacing.xl),
                _PerformersSection(fixture: fixture),
                const SizedBox(height: AppSpacing.xl),
                Text(
                  l10n.timelineTitle,
                  style: theme.textTheme.titleLarge,
                ),
                const SizedBox(height: AppSpacing.md),
                _TimelineSection(fixture: fixture),
              ],
            ),
          ),
        ),
      ],
    );
  }
}

class _EventIcon extends StatelessWidget {
  const _EventIcon({required this.type});

  final String type;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final (icon, color) = switch (type) {
      'GOAL' => (Icons.sports_soccer, theme.colorScheme.primary),
      'ASSIST' => (Icons.arrow_upward, theme.colorScheme.tertiary),
      'YELLOW_CARD' => (Icons.square, AppColors.accentGold),
      'RED_CARD' => (Icons.square, AppColors.accentRed),
      'SUBSTITUTION' => (Icons.swap_horiz, theme.colorScheme.onSurfaceVariant),
      'SAVE' => (Icons.shield_outlined, theme.colorScheme.secondary),
      'PENALTY_SAVED' => (Icons.shield, theme.colorScheme.primary),
      'PENALTY_MISSED' => (Icons.cancel_outlined, AppColors.accentRed),
      'OWN_GOAL' => (Icons.block, AppColors.accentRed),
      'CLEAN_SHEET' => (Icons.check_circle_outline, AppColors.accentGreen),
      'GOAL_CONCEDED' => (Icons.remove_circle_outline, AppColors.accentRed),
      'APPEARANCE' => (Icons.person_outline, theme.colorScheme.onSurfaceVariant),
      _ => (Icons.visibility_outlined, theme.colorScheme.onSurfaceVariant),
    };

    return CircleAvatar(
      radius: 18,
      backgroundColor: color.withValues(alpha: 0.15),
      child: Icon(icon, size: 18, color: color),
    );
  }
}

class _PerformersSection extends StatelessWidget {
  const _PerformersSection({required this.fixture});

  final Fixture fixture;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final l10n = AppLocalizations.of(context);
    final performers = performersOf(fixture.matchEvents);

    if (performers.isEmpty) return const SizedBox.shrink();

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          l10n.topPerformers,
          style: theme.textTheme.titleLarge,
        ),
        const SizedBox(height: AppSpacing.md),
        Card(
          child: Column(
            children: [
              for (final performer in performers)
                ListTile(
                  dense: true,
                  leading: _EventIcon(
                    type: performer.goals > 0
                        ? 'GOAL'
                        : performer.assists > 0
                            ? 'ASSIST'
                            : 'SAVE',
                  ),
                  title: Text(
                    performer.playerName,
                    style: theme.textTheme.bodyMedium?.copyWith(
                      fontWeight: FontWeight.w600,
                    ),
                  ),
                  trailing: Text(
                    [
                      if (performer.goals > 0)
                        l10n.goalsCount(performer.goals),
                      if (performer.assists > 0)
                        l10n.assistsCount(performer.assists),
                      if (performer.saves > 0)
                        l10n.savesCount(performer.saves),
                    ].join(' · '),
                    style: theme.textTheme.labelMedium?.copyWith(
                      color: theme.colorScheme.onSurfaceVariant,
                    ),
                  ),
                ),
            ],
          ),
        ),
      ],
    );
  }
}

class _TimelineSection extends StatelessWidget {
  const _TimelineSection({required this.fixture});

  final Fixture fixture;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final l10n = AppLocalizations.of(context);
    final moments = keyMomentsOf(fixture.matchEvents);

    if (moments.isEmpty) {
      return Card(
        child: Padding(
          padding: const EdgeInsets.all(AppSpacing.xl),
          child: Row(
            children: [
              Icon(
                Icons.hourglass_empty,
                color: theme.colorScheme.onSurfaceVariant,
              ),
              const SizedBox(width: AppSpacing.md),
              Text(
                l10n.noKeyEvents,
                style: theme.textTheme.bodyMedium?.copyWith(
                  color: theme.colorScheme.onSurfaceVariant,
                ),
              ),
            ],
          ),
        ),
      );
    }

    final homeFirst =
        Directionality.of(context) == TextDirection.ltr;

    return Card(
      child: Padding(
        padding: const EdgeInsets.symmetric(vertical: AppSpacing.md),
        child: Column(
          children: [
            for (final event in moments)
              _TimelineRow(
                event: event,
                side: sideOf(event, fixture),
                homeFirst: homeFirst,
              ),
          ],
        ),
      ),
    );
  }
}

class _TimelineRow extends StatelessWidget {
  const _TimelineRow({
    required this.event,
    required this.side,
    required this.homeFirst,
  });

  final MatchEvent event;
  final MatchSide side;
  final bool homeFirst;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    final badge = Container(
      width: 52,
      padding: const EdgeInsets.symmetric(
        horizontal: AppSpacing.sm,
        vertical: AppSpacing.xs,
      ),
      decoration: BoxDecoration(
        color: theme.colorScheme.surfaceContainerHighest,
        borderRadius: BorderRadius.circular(AppRadii.pill),
      ),
      child: Text(
        event.minute == 0 ? '–' : "${event.minute}'",
        textAlign: TextAlign.center,
        style: theme.textTheme.labelMedium?.copyWith(
          fontWeight: FontWeight.w700,
        ),
      ),
    );

    Widget content(MatchSide forSide, CrossAxisAlignment align) {
      if (side != forSide) return const Expanded(child: SizedBox.shrink());
      return Expanded(
        child: Column(
          crossAxisAlignment: align,
          mainAxisSize: MainAxisSize.min,
          children: [
            _EventIcon(type: event.type),
            const SizedBox(height: AppSpacing.xs),
            Text(
              event.playerName ?? '–',
              textAlign:
                  align == CrossAxisAlignment.end ? TextAlign.end : TextAlign.start,
              maxLines: 2,
              overflow: TextOverflow.ellipsis,
              style: theme.textTheme.bodyMedium?.copyWith(
                fontWeight: FontWeight.w600,
              ),
            ),
          ],
        ),
      );
    }

    final startSide = homeFirst ? MatchSide.home : MatchSide.away;
    final endSide = homeFirst ? MatchSide.away : MatchSide.home;

    if (side == MatchSide.unknown) {
      return Padding(
        padding: const EdgeInsets.symmetric(
          horizontal: AppSpacing.lg,
          vertical: AppSpacing.sm,
        ),
        child: Row(
          mainAxisAlignment: MainAxisAlignment.center,
          mainAxisSize: MainAxisSize.min,
          children: [
            Flexible(
              child: Text(
                event.playerName ?? '–',
                textAlign: TextAlign.center,
                style: theme.textTheme.bodyMedium,
              ),
            ),
            const SizedBox(width: AppSpacing.sm),
            badge,
          ],
        ),
      );
    }

    return Padding(
      padding: const EdgeInsets.symmetric(
        horizontal: AppSpacing.lg,
        vertical: AppSpacing.sm,
      ),
      child: Row(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          content(startSide, CrossAxisAlignment.end),
          Padding(
            padding: const EdgeInsets.symmetric(horizontal: AppSpacing.sm),
            child: badge,
          ),
          content(endSide, CrossAxisAlignment.start),
        ],
      ),
    );
  }
}