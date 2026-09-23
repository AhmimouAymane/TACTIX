import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:tactix/core/core.dart';
import 'package:tactix/features/fixtures/fixtures.dart';
import 'package:tactix/features/gameweeks/gameweeks.dart';
import 'package:tactix/l10n/app_localizations.dart';
import 'package:tactix/shared/widgets/widgets.dart';

class HomeScreen extends ConsumerStatefulWidget {
  const HomeScreen({super.key});

  @override
  ConsumerState<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends ConsumerState<HomeScreen> {
  @override
  void initState() {
    super.initState();
    Future.microtask(_load);
  }

  Future<void> _load() async {
    await ref.read(gameweeksControllerProvider.notifier).load();
    final current = ref.read(gameweeksControllerProvider.notifier).current;
    await ref
        .read(fixturesControllerProvider.notifier)
        // Home owns this load: scope to the current gameweek and drop any
        // status filter left behind by the Live screen (shared controller).
        .load(
          gameweekId: current?.id,
          clearGameweek: current == null,
          clearStatus: true,
        );
  }

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context);
    final gameweeksState = ref.watch(gameweeksControllerProvider);
    final fixturesState = ref.watch(fixturesControllerProvider);
    final current = gameweeksState is GameweeksData
        ? ref.read(gameweeksControllerProvider.notifier).current
        : null;

    final fixtures = fixturesState is FixturesData
        ? fixturesState.fixtures
        : const <Fixture>[];

    return RtlAwareScaffold(
      appBar: AppBar(
        title: Text(l10n.navHome),
        actions: [
          IconButton(
            icon: const Icon(Icons.search),
            onPressed: () {
              // TODO: Navigate to search
            },
          ),
          IconButton(
            icon: const Icon(Icons.notifications_outlined),
            onPressed: () {
              // TODO: Navigate to notifications
            },
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
                  Text(
                    l10n.homeWelcome,
                    style: Theme.of(context).textTheme.headlineMedium,
                  ),
                  const SizedBox(height: AppSpacing.xs),
                  Text(
                    l10n.homeSubtitle,
                    style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                          color:
                              Theme.of(context).colorScheme.onSurfaceVariant,
                        ),
                  ),
                  const SizedBox(height: AppSpacing.xxl),
                  if (gameweeksState is GameweeksLoading ||
                      gameweeksState is GameweeksInitial)
                    const Padding(
                      padding: EdgeInsets.symmetric(vertical: AppSpacing.xxl),
                      child: Center(child: CircularProgressIndicator()),
                    )
                  else if (gameweeksState is GameweeksError)
                    _buildError(context, l10n)
                  else if (current != null)
                    _buildGameweekSection(context, l10n, current, fixtures)
                  else
                    _buildEmpty(context, l10n),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildGameweekSection(
    BuildContext context,
    AppLocalizations l10n,
    Gameweek current,
    List<Fixture> fixtures,
  ) {
    final theme = Theme.of(context);
    final material = MaterialLocalizations.of(context);

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Row(
          children: [
            Expanded(
              child: Text(
                l10n.currentGameweek,
                style: theme.textTheme.titleLarge,
              ),
            ),
            FixtureStatusBadge(status: current.status),
          ],
        ),
        const SizedBox(height: AppSpacing.md),
        Card(
          child: Padding(
            padding: const EdgeInsets.all(AppSpacing.lg),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  l10n.gameweekNumber('${current.number}'),
                  style: theme.textTheme.headlineSmall?.copyWith(
                    fontWeight: FontWeight.w800,
                  ),
                ),
                const SizedBox(height: AppSpacing.sm),
                Row(
                  children: [
                    Icon(
                      Icons.schedule_outlined,
                      size: 18,
                      color: theme.colorScheme.onSurfaceVariant,
                    ),
                    const SizedBox(width: AppSpacing.xs),
                    Text(
                      '${l10n.deadline}: ${material.formatMediumDate(current.deadlineAt)} '
                      '${material.formatTimeOfDay(TimeOfDay.fromDateTime(current.deadlineAt))}',
                      style: theme.textTheme.bodyMedium?.copyWith(
                        color: theme.colorScheme.onSurfaceVariant,
                      ),
                    ),
                  ],
                ),
                if (current.fixtureCount != null) ...[
                  const SizedBox(height: AppSpacing.sm),
                  Row(
                    children: [
                      Icon(
                        Icons.sports_soccer_outlined,
                        size: 18,
                        color: theme.colorScheme.onSurfaceVariant,
                      ),
                      const SizedBox(width: AppSpacing.xs),
                      Text(
                        l10n.fixturesCount(current.fixtureCount!),
                        style: theme.textTheme.bodyMedium?.copyWith(
                          color: theme.colorScheme.onSurfaceVariant,
                        ),
                      ),
                    ],
                  ),
                ],
              ],
            ),
          ),
        ),
        const SizedBox(height: AppSpacing.xxl),
        Row(
          children: [
            Expanded(
              child: Text(
                l10n.upcomingFixtures,
                style: theme.textTheme.titleLarge,
              ),
            ),
            TextButton.icon(
              onPressed: () => context.go(AppRoutes.live),
              icon: const Icon(Icons.arrow_forward, size: 18),
              label: Text(l10n.viewAll),
            ),
          ],
        ),
        const SizedBox(height: AppSpacing.md),
        if (fixtures.isEmpty)
          Card(
            child: Padding(
              padding: const EdgeInsets.all(AppSpacing.xl),
              child: Center(
                child: Text(
                  l10n.noFixtures,
                  style: theme.textTheme.bodyMedium?.copyWith(
                    color: theme.colorScheme.onSurfaceVariant,
                  ),
                ),
              ),
            ),
          )
        else
          for (final fixture in fixtures.take(3)) ...[
            _CompactFixtureRow(fixture: fixture),
            const SizedBox(height: AppSpacing.md),
          ],
      ],
    );
  }

  Widget _buildError(BuildContext context, AppLocalizations l10n) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(AppSpacing.xl),
        child: Column(
          children: [
            Text(l10n.errorLoading),
            const SizedBox(height: AppSpacing.lg),
            FilledButton.icon(
              onPressed: _load,
              icon: const Icon(Icons.refresh),
              label: Text(l10n.retry),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildEmpty(BuildContext context, AppLocalizations l10n) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(AppSpacing.xl),
        child: Center(
          child: Text(
            l10n.emptyState,
            style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                  color: Theme.of(context).colorScheme.onSurfaceVariant,
                ),
          ),
        ),
      ),
    );
  }
}

class _CompactFixtureRow extends StatelessWidget {
  const _CompactFixtureRow({required this.fixture});

  final Fixture fixture;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final material = MaterialLocalizations.of(context);

    final center = fixture.hasScore
        ? Text(
            '${fixture.homeScore} - ${fixture.awayScore}',
            style: theme.textTheme.titleMedium?.copyWith(
              fontWeight: FontWeight.w800,
            ),
          )
        : Text(
            material.formatTimeOfDay(
              TimeOfDay.fromDateTime(fixture.kickoffAt),
            ),
            style: theme.textTheme.bodyMedium?.copyWith(
              color: theme.colorScheme.onSurfaceVariant,
            ),
          );

    return Card(
      child: Padding(
        padding: const EdgeInsets.symmetric(
          horizontal: AppSpacing.lg,
          vertical: AppSpacing.md,
        ),
        child: Row(
          children: [
            Expanded(
              child: Text(
                fixture.homeClub.shortName,
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
                style: theme.textTheme.bodyLarge,
              ),
            ),
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: AppSpacing.md),
              child: Column(
                children: [
                  FixtureStatusBadge(status: fixture.status),
                  const SizedBox(height: AppSpacing.xs),
                  center,
                ],
              ),
            ),
            Expanded(
              child: Text(
                fixture.awayClub.shortName,
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
                textAlign: TextAlign.end,
                style: theme.textTheme.bodyLarge,
              ),
            ),
          ],
        ),
      ),
    );
  }
}