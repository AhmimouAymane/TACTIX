import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:tactix/l10n/app_localizations.dart';
import 'package:tactix/core/core.dart';
import 'package:tactix/shared/widgets/widgets.dart';
import 'package:tactix/features/auth/domain/auth_state.dart';
import 'package:tactix/features/auth/presentation/auth_controller.dart';

class ProfileScreen extends ConsumerWidget {
  const ProfileScreen({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final l10n = AppLocalizations.of(context)!;
    final authState = ref.watch(authControllerProvider);

    return RtlAwareScaffold(
      appBar: AppBar(
        title: Text(l10n.navProfile),
        actions: [
          IconButton(
            icon: const Icon(Icons.settings_outlined),
            onPressed: () {
              // TODO: Navigate to settings
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
                  _buildProfileHeader(context, l10n, authState),
                  const SizedBox(height: AppSpacing.xxl),
                  _buildSectionCard(context, l10n),
                  const SizedBox(height: AppSpacing.lg),
                  _buildSettingsCard(context, l10n),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildProfileHeader(
    BuildContext context,
    AppLocalizations l10n,
    AuthState authState,
  ) {
    final isAuthenticated = authState.maybeWhen(authenticated: (_, __, ___, ____) => true, orElse: () => false);
    final email = authState.maybeWhen(authenticated: (_, __, ___, email) => email, orElse: () => '');
    return Card(
      child: Padding(
        padding: const EdgeInsets.all(AppSpacing.lg),
        child: Row(
          children: [
            CircleAvatar(
              radius: 40,
              backgroundColor: Theme.of(context).colorScheme.primaryContainer,
              child: Icon(
                Icons.person,
                size: 40,
                color: Theme.of(context).colorScheme.onPrimaryContainer,
              ),
            ),
            const SizedBox(width: AppSpacing.lg),
            Expanded(
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    isAuthenticated ? email : l10n.guestUser,
                    style: Theme.of(context).textTheme.titleLarge,
                  ),
                  const SizedBox(height: AppSpacing.xs),
                  Text(
                    isAuthenticated ? l10n.loggedIn : l10n.notLoggedIn,
                    style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                          color: Theme.of(context).colorScheme.onSurfaceVariant,
                        ),
                  ),
                ],
              ),
            ),
          ],
        ),
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
              l10n.profileComingSoonDesc,
              style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                    color: Theme.of(context).colorScheme.onSurfaceVariant,
                  ),
            ),
          ],
        ),
      ),
    );
  }

  Widget _buildSettingsCard(BuildContext context, AppLocalizations l10n) {
    return Card(
      child: Column(
        children: [
          ListTile(
            leading: const Icon(Icons.language_outlined),
            title: Text(l10n.language),
            subtitle: Text(l10n.languageDesc),
            trailing: const Icon(Icons.chevron_right),
            onTap: () {
              // TODO: Navigate to language settings
            },
          ),
          const Divider(height: 1),
          ListTile(
            leading: const Icon(Icons.dark_mode_outlined),
            title: Text(l10n.theme),
            subtitle: Text(l10n.themeDesc),
            trailing: const Icon(Icons.chevron_right),
            onTap: () {
              // TODO: Navigate to theme settings
            },
          ),
          const Divider(height: 1),
          ListTile(
            leading: const Icon(Icons.notifications_outlined),
            title: Text(l10n.notifications),
            subtitle: Text(l10n.notificationsDesc),
            trailing: const Icon(Icons.chevron_right),
            onTap: () {
              // TODO: Navigate to notification settings
            },
          ),
        ],
      ),
    );
  }
}
