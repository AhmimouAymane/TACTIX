import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:tactix/l10n/app_localizations.dart';
import 'package:tactix/core/core.dart';
import 'package:tactix/shared/widgets/widgets.dart';

class LeaguesScreen extends ConsumerWidget {
  const LeaguesScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final l10n = AppLocalizations.of(context)!;

    return RtlAwareScaffold(
      appBar: AppBar(
        title: Text(l10n.navLeagues),
        actions: [
          IconButton(
            icon: const Icon(Icons.add_outlined),
            onPressed: () {
              // TODO: Navigate to create league
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
                    l10n.leaguesTitle,
                    style: Theme.of(context).textTheme.headlineMedium,
                  ),
                  const SizedBox(height: AppSpacing.xs),
                  Text(
                    l10n.leaguesSubtitle,
                    style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                          color: Theme.of(context).colorScheme.onSurfaceVariant,
                        ),
                  ),
                  const SizedBox(height: AppSpacing.xxl),
                  _buildSectionCard(context, l10n),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildSectionCard(BuildContext context, AppLocalizations l10n) {
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(AppSpacing.lg),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            Text(
              l10n.comingSoon,
              style: Theme.of(context).textTheme.titleLarge,
            ),
            const SizedBox(height: AppSpacing.md),
            Text(
              l10n.leaguesComingSoonDesc,
              style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                    color: Theme.of(context).colorScheme.onSurfaceVariant,
                  ),
            ),
          ],
        ),
      ),
    );
  }
}
