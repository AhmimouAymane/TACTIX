import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:tactix/core/core.dart';
import 'package:tactix/features/fixtures/fixtures.dart';
import 'package:tactix/features/gameweeks/gameweeks.dart';
import 'package:tactix/l10n/app_localizations.dart';
import 'package:tactix/shared/widgets/widgets.dart';

class LiveScreen extends ConsumerStatefulWidget {
  const LiveScreen({super.key});

  @override
  ConsumerState<LiveScreen> createState() => _LiveScreenState();
}

class _LiveScreenState extends ConsumerState<LiveScreen> {
  String? _gameweekId;
  String? _status;

  @override
  void initState() {
    super.initState();
    Future.microtask(() {
      ref.read(gameweeksControllerProvider.notifier).load();
      ref.read(fixturesControllerProvider.notifier).load();
    });
  }

  Future<void> _refresh() async {
    await Future.wait([
      ref.read(gameweeksControllerProvider.notifier).load(),
      ref.read(fixturesControllerProvider.notifier).load(
            gameweekId: _gameweekId,
            status: _status,
          ),
    ]);
  }

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context);
    final gameweeksState = ref.watch(gameweeksControllerProvider);
    final fixturesState = ref.watch(fixturesControllerProvider);

    return RtlAwareScaffold(
      appBar: AppBar(
        title: Text(l10n.navLive),
        actions: [
          IconButton(
            icon: const Icon(Icons.refresh),
            onPressed: _refresh,
            tooltip: l10n.retry,
          ),
        ],
      ),
      body: switch (gameweeksState) {
        GameweeksLoading() || GameweeksInitial() => const Center(
            child: CircularProgressIndicator(),
          ),
        GameweeksError() => _ErrorView(
            message: l10n.errorLoading,
            onRetry: _refresh,
          ),
        GameweeksData(:final gameweeks) => _buildContent(
            context,
            l10n,
            gameweeks,
            fixturesState,
          ),
      },
    );
  }

  Widget _buildContent(
    BuildContext context,
    AppLocalizations l10n,
    List<Gameweek> gameweeks,
    FixturesState fixturesState,
  ) {
    return Column(
      children: [
        SizedBox(
          height: 56,
          child: ListView(
            scrollDirection: Axis.horizontal,
            padding: const EdgeInsets.symmetric(horizontal: AppSpacing.lg),
            children: [
              Padding(
                padding: const EdgeInsets.only(right: AppSpacing.sm),
                child: _FilterChip(
                  label: l10n.statusAll,
                  selected: _gameweekId == null,
                  onSelected: () {
                    setState(() => _gameweekId = null);
                    ref
                        .read(fixturesControllerProvider.notifier)
                        .load(status: _status);
                  },
                ),
              ),
              ...gameweeks.map(
                (gameweek) => Padding(
                  padding: const EdgeInsets.only(right: AppSpacing.sm),
                  child: _FilterChip(
                    label: l10n.gameweekNumber('${gameweek.number}'),
                    selected: _gameweekId == gameweek.id,
                    onSelected: () {
                      setState(() => _gameweekId = gameweek.id);
                      ref
                          .read(fixturesControllerProvider.notifier)
                          .load(gameweekId: gameweek.id, status: _status);
                    },
                  ),
                ),
              ),
            ],
          ),
        ),
        SizedBox(
          height: 48,
          child: ListView(
            scrollDirection: Axis.horizontal,
            padding: const EdgeInsets.symmetric(horizontal: AppSpacing.lg),
            children: [
              for (final entry in const [
                (null, 'statusAll'),
                ('SCHEDULED', 'statusScheduled'),
                ('LIVE', 'statusLive'),
                ('FINISHED', 'statusFinished'),
                ('POSTPONED', 'statusPostponed'),
                ('CANCELLED', 'statusCancelled'),
              ])
                Padding(
                  padding: const EdgeInsets.only(right: AppSpacing.sm),
                  child: _FilterChip(
                    label: switch (entry.$2) {
                      'statusAll' => l10n.statusAll,
                      'statusScheduled' => l10n.statusScheduled,
                      'statusLive' => l10n.statusLive,
                      'statusFinished' => l10n.statusFinished,
                      'statusPostponed' => l10n.statusPostponed,
                      _ => l10n.statusCancelled,
                    },
                    selected: _status == entry.$1,
                    onSelected: () {
                      setState(() => _status = entry.$1);
                      ref
                          .read(fixturesControllerProvider.notifier)
                          .load(gameweekId: _gameweekId, status: entry.$1);
                    },
                  ),
                ),
            ],
          ),
        ),
        Expanded(
          child: switch (fixturesState) {
            FixturesLoading() || FixturesInitial() => const Center(
                child: CircularProgressIndicator(),
              ),
            FixturesError() => _ErrorView(
                message: l10n.errorLoading,
                onRetry: _refresh,
              ),
            FixturesData(:final fixtures) => fixtures.isEmpty
                ? _EmptyView(
                    icon: Icons.sports_soccer,
                    message: l10n.noFixtures,
                  )
                : RefreshIndicator(
                    onRefresh: _refresh,
                    child: ListView.separated(
                      physics: const AlwaysScrollableScrollPhysics(),
                      padding: const EdgeInsets.all(AppSpacing.lg),
                      itemCount: fixtures.length,
                      separatorBuilder: (context, index) =>
                          const SizedBox(height: AppSpacing.md),
                      itemBuilder: (context, index) {
                        final fixture = fixtures[index];
                        return FixtureCard(
                          fixture: fixture,
                          onTap: () => context.push(
                            AppRoutes.fixtureDetail
                                .replaceFirst(':id', fixture.id),
                          ),
                        );
                      },
                    ),
                  ),
          },
        ),
      ],
    );
  }
}

class _FilterChip extends StatelessWidget {
  const _FilterChip({
    required this.label,
    required this.selected,
    required this.onSelected,
  });

  final String label;
  final bool selected;
  final VoidCallback onSelected;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return InkWell(
      onTap: onSelected,
      borderRadius: BorderRadius.circular(AppRadii.pill),
      child: Container(
        padding: const EdgeInsets.symmetric(
          horizontal: AppSpacing.lg,
          vertical: AppSpacing.sm,
        ),
        decoration: BoxDecoration(
          color: selected
              ? theme.colorScheme.primary
              : theme.colorScheme.surfaceContainerHighest,
          borderRadius: BorderRadius.circular(AppRadii.pill),
        ),
        child: Text(
          label,
          style: theme.textTheme.labelMedium?.copyWith(
            color: selected
                ? theme.colorScheme.onPrimary
                : theme.colorScheme.onSurfaceVariant,
            fontWeight: selected ? FontWeight.w700 : FontWeight.w500,
          ),
        ),
      ),
    );
  }
}

class _ErrorView extends StatelessWidget {
  const _ErrorView({required this.message, required this.onRetry});

  final String message;
  final VoidCallback onRetry;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final l10n = AppLocalizations.of(context);

    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(
            Icons.cloud_off_outlined,
            size: 48,
            color: theme.colorScheme.onSurfaceVariant,
          ),
          const SizedBox(height: AppSpacing.md),
          Text(message, style: theme.textTheme.bodyMedium),
          const SizedBox(height: AppSpacing.lg),
          FilledButton.icon(
            onPressed: onRetry,
            icon: const Icon(Icons.refresh),
            label: Text(l10n.retry),
          ),
        ],
      ),
    );
  }
}

class _EmptyView extends StatelessWidget {
  const _EmptyView({required this.icon, required this.message});

  final IconData icon;
  final String message;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(icon, size: 48, color: theme.colorScheme.onSurfaceVariant),
          const SizedBox(height: AppSpacing.md),
          Text(
            message,
            style: theme.textTheme.bodyMedium?.copyWith(
              color: theme.colorScheme.onSurfaceVariant,
            ),
          ),
        ],
      ),
    );
  }
}