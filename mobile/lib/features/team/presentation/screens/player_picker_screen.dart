import 'dart:async';

import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:tactix/core/core.dart';
import 'package:tactix/core/models/catalog_player.dart';
import 'package:tactix/features/team/domain/team_state.dart';
import 'package:tactix/features/team/presentation/team_controller.dart';
import 'package:tactix/l10n/app_localizations.dart';
import 'package:tactix/shared/widgets/widgets.dart';

class PlayerPickerScreen extends ConsumerStatefulWidget {
  const PlayerPickerScreen({
    super.key,
    required this.group,
    required this.excludeIds,
  });

  final String group;
  final Set<String> excludeIds;

  @override
  ConsumerState<PlayerPickerScreen> createState() =>
      _PlayerPickerScreenState();
}

class _PlayerPickerScreenState extends ConsumerState<PlayerPickerScreen> {
  final _searchController = TextEditingController();
  Timer? _debounce;

  @override
  void initState() {
    super.initState();
    Future.microtask(() => _reload());
  }

  @override
  void dispose() {
    _debounce?.cancel();
    _searchController.dispose();
    super.dispose();
  }

  void _reload() {
    ref.read(playersControllerProvider.notifier).load(
          search: _searchController.text.trim().isEmpty
              ? null
              : _searchController.text.trim(),
          position: widget.group == 'SUB' ? null : widget.group,
        );
  }

  void _onSearchChanged(String _) {
    _debounce?.cancel();
    _debounce = Timer(const Duration(milliseconds: 500), _reload);
  }

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context);
    final theme = Theme.of(context);
    final state = ref.watch(playersControllerProvider);

    return RtlAwareScaffold(
      appBar: AppBar(
        title: Text('${l10n.pickPlayer} · ${widget.group}'),
      ),
      body: Column(
        children: [
          Padding(
            padding: const EdgeInsets.all(AppSpacing.lg),
            child: TextField(
              controller: _searchController,
              onChanged: _onSearchChanged,
              textInputAction: TextInputAction.search,
              onSubmitted: (_) => _reload(),
              decoration: InputDecoration(
                hintText: l10n.searchPlayers,
                prefixIcon: const Icon(Icons.search),
                suffixIcon: _searchController.text.isEmpty
                    ? null
                    : IconButton(
                        icon: const Icon(Icons.clear),
                        onPressed: () {
                          _searchController.clear();
                          _reload();
                        },
                      ),
                border: const OutlineInputBorder(),
              ),
            ),
          ),
          Expanded(
            child: switch (state) {
              PlayersInitial() || PlayersLoading() => const Center(
                  child: CircularProgressIndicator(),
                ),
              PlayersError(:final message) => Center(
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
              PlayersData(
                :final players,
                :final hasMore,
              ) =>
                Builder(builder: (context) {
                  final visible = players
                      .where((p) => !widget.excludeIds.contains(p.id))
                      .toList();
                  if (visible.isEmpty) {
                    return Center(child: Text(l10n.emptyState));
                  }
                  return ListView.separated(
                    padding: const EdgeInsets.symmetric(
                      horizontal: AppSpacing.lg,
                    ),
                    itemCount: visible.length + (hasMore ? 1 : 0),
                    separatorBuilder: (context, index) =>
                        const SizedBox(height: AppSpacing.sm),
                    itemBuilder: (context, index) {
                      if (index >= visible.length) {
                        return Center(
                          child: TextButton(
                            onPressed: () => ref
                                .read(playersControllerProvider.notifier)
                                .load(
                                  search: _searchController.text
                                          .trim()
                                          .isEmpty
                                      ? null
                                      : _searchController.text.trim(),
                                  position: widget.group == 'SUB'
                                      ? null
                                      : widget.group,
                                  append: true,
                                ),
                            child: Text(l10n.loadMore),
                          ),
                        );
                      }
                      final player = visible[index];
                      return _PlayerRow(
                        player: player,
                        onTap: () => Navigator.of(context).pop(player),
                      );
                    },
                  );
                }),
            },
          ),
        ],
      ),
    );
  }
}

class _PlayerRow extends StatelessWidget {
  const _PlayerRow({required this.player, required this.onTap});

  final CatalogPlayer player;
  final VoidCallback onTap;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);
    final posColor = AppColors.position(player.position);
    return Card(
      clipBehavior: Clip.antiAlias,
      child: InkWell(
        onTap: onTap,
        child: Padding(
          padding: const EdgeInsets.all(AppSpacing.md),
          child: Row(
            children: [
              Container(
                padding: const EdgeInsets.all(2),
                decoration: BoxDecoration(
                  shape: BoxShape.circle,
                  color: Colors.white,
                  border: Border.all(color: posColor, width: 2),
                ),
                child: CircleAvatar(
                  radius: 18,
                  backgroundColor: posColor,
                  foregroundImage: player.photoUrl != null &&
                          player.photoUrl!.isNotEmpty
                      ? NetworkImage(player.photoUrl!)
                      : null,
                  child: player.photoUrl != null && player.photoUrl!.isNotEmpty
                      ? null
                      : Text(
                          player.position,
                          style: theme.textTheme.labelSmall?.copyWith(
                            fontFamily: AppTypography.displayFontFamily,
                            fontWeight: FontWeight.w700,
                            color: AppColors.onPosition(player.position),
                          ),
                        ),
                ),
              ),
              const SizedBox(width: AppSpacing.md),
              Expanded(
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Text(
                      player.displayName,
                      style: theme.textTheme.bodyMedium?.copyWith(
                        fontWeight: FontWeight.w600,
                      ),
                    ),
                    const SizedBox(height: 3),
                    Row(
                      children: [
                        Container(
                          padding: const EdgeInsets.symmetric(
                            horizontal: 6,
                            vertical: 1,
                          ),
                          decoration: BoxDecoration(
                            color: posColor,
                            borderRadius: BorderRadius.circular(4),
                          ),
                          child: Text(
                            player.position,
                            style: TextStyle(
                              fontFamily: AppTypography.displayFontFamily,
                              fontSize: 11,
                              fontWeight: FontWeight.w700,
                              color: AppColors.onPosition(player.position),
                              height: 1.2,
                            ),
                          ),
                        ),
                        const SizedBox(width: AppSpacing.sm),
                        Expanded(
                          child: Text(
                            player.club?.shortName ?? '',
                            maxLines: 1,
                            overflow: TextOverflow.ellipsis,
                            style: theme.textTheme.labelMedium?.copyWith(
                              color: theme.colorScheme.onSurfaceVariant,
                            ),
                          ),
                        ),
                      ],
                    ),
                  ],
                ),
              ),
              const SizedBox(width: AppSpacing.sm),
              Text(
                player.currentPrice.toStringAsFixed(1),
                style: const TextStyle(
                  fontFamily: AppTypography.displayFontFamily,
                  fontSize: 17,
                  fontWeight: FontWeight.w700,
                  color: AppColors.primary,
                ),
              ),
            ],
          ),
        ),
      ),
    );
  }
}
