import 'package:flutter/material.dart';
import 'package:tactix/core/models/club.dart';
import 'package:tactix/core/models/fixture.dart';
import 'package:tactix/core/theme/tokens.dart';
import 'package:tactix/l10n/app_localizations.dart';

String statusLabelKey(String status) {
  switch (status) {
    case 'SCHEDULED':
      return 'statusScheduled';
    case 'LIVE':
      return 'statusLive';
    case 'FINISHED':
      return 'statusFinished';
    case 'POSTPONED':
      return 'statusPostponed';
    case 'CANCELLED':
      return 'statusCancelled';
    default:
      return 'statusScheduled';
  }
}

class ClubBadge extends StatelessWidget {
  const ClubBadge({
    super.key,
    required this.club,
    this.alignment = CrossAxisAlignment.center,
  });

  final Club club;
  final CrossAxisAlignment alignment;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Column(
      crossAxisAlignment: alignment,
      mainAxisSize: MainAxisSize.min,
      children: [
        CircleAvatar(
          radius: 22,
          backgroundColor: theme.colorScheme.surfaceContainerHighest,
          foregroundImage: club.crestUrl != null && club.crestUrl!.isNotEmpty
              ? NetworkImage(club.crestUrl!)
              : null,
          child: club.crestUrl != null && club.crestUrl!.isNotEmpty
              ? null
              : Text(
                  club.shortName.isEmpty
                      ? '?'
                      : club.shortName.substring(0, 1).toUpperCase(),
                  style: theme.textTheme.titleMedium?.copyWith(
                    color: theme.colorScheme.primary,
                    fontWeight: FontWeight.w700,
                  ),
                ),
        ),
        const SizedBox(height: AppSpacing.xs),
        Text(
          club.name,
          maxLines: 2,
          overflow: TextOverflow.ellipsis,
          textAlign: TextAlign.center,
          style: theme.textTheme.labelMedium,
        ),
      ],
    );
  }
}

class FixtureStatusBadge extends StatelessWidget {
  const FixtureStatusBadge({super.key, required this.status});

  final String status;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final l10n = AppLocalizations.of(context);
    final label = statusLabelKey(status);

    final Color background;
    final Color foreground;
    switch (status) {
      case 'LIVE':
        background = theme.colorScheme.error;
        foreground = theme.colorScheme.onError;
      case 'FINISHED':
        background = theme.colorScheme.surfaceContainerHighest;
        foreground = theme.colorScheme.onSurfaceVariant;
      default:
        background = theme.colorScheme.secondaryContainer;
        foreground = theme.colorScheme.onSecondaryContainer;
    }

    final text = switch (label) {
      'statusScheduled' => l10n.statusScheduled,
      'statusLive' => l10n.statusLive,
      'statusFinished' => l10n.statusFinished,
      'statusPostponed' => l10n.statusPostponed,
      'statusCancelled' => l10n.statusCancelled,
      _ => l10n.statusScheduled,
    };

    return Container(
      padding: const EdgeInsets.symmetric(
        horizontal: AppSpacing.sm,
        vertical: AppSpacing.xs,
      ),
      decoration: BoxDecoration(
        color: background,
        borderRadius: BorderRadius.circular(AppRadii.pill),
      ),
      child: Text(
        text,
        style: theme.textTheme.labelSmall?.copyWith(
          color: foreground,
          fontWeight: FontWeight.w700,
        ),
      ),
    );
  }
}

class FixtureCard extends StatelessWidget {
  const FixtureCard({
    super.key,
    required this.fixture,
    this.onTap,
  });

  final Fixture fixture;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final material = MaterialLocalizations.of(context);

    final center = fixture.hasScore
        ? Text(
            '${fixture.homeScore} - ${fixture.awayScore}',
            style: theme.textTheme.headlineSmall?.copyWith(
              fontWeight: FontWeight.w800,
            ),
          )
        : Text(
            material.formatTimeOfDay(
              TimeOfDay.fromDateTime(fixture.kickoffAt),
            ),
            style: theme.textTheme.titleMedium?.copyWith(
              color: theme.colorScheme.onSurfaceVariant,
            ),
          );

    return Card(
      clipBehavior: Clip.antiAlias,
      child: InkWell(
        onTap: onTap,
        child: Padding(
          padding: const EdgeInsets.all(AppSpacing.lg),
          child: Column(
            children: [
              Row(
                children: [
                  Expanded(
                    child: ClubBadge(
                      club: fixture.homeClub,
                      alignment: CrossAxisAlignment.center,
                    ),
                  ),
                  Padding(
                    padding: const EdgeInsets.symmetric(
                      horizontal: AppSpacing.md,
                    ),
                    child: Column(
                      children: [
                        FixtureStatusBadge(status: fixture.status),
                        const SizedBox(height: AppSpacing.sm),
                        center,
                      ],
                    ),
                  ),
                  Expanded(
                    child: ClubBadge(
                      club: fixture.awayClub,
                      alignment: CrossAxisAlignment.center,
                    ),
                  ),
                ],
              ),
            ],
          ),
        ),
      ),
    );
  }
}