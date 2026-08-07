import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:go_router/go_router.dart';
import 'package:tactix/l10n/app_localizations.dart';
import 'package:tactix/core/core.dart';

class MainNavigationShell extends ConsumerStatefulWidget {
  const MainNavigationShell({
    super.key,
    required this.child,
  });

  final Widget child;

  @override
  ConsumerState<MainNavigationShell> createState() => _MainNavigationShellState();
}

class _MainNavigationShellState extends ConsumerState<MainNavigationShell> {
  int _currentIndex = 0;

  static const List<NavigationDestination> _destinations = [
    NavigationDestination(
      icon: Icon(Icons.home_outlined),
      selectedIcon: Icon(Icons.home),
      label: 'Home',
    ),
    NavigationDestination(
      icon: Icon(Icons.sports_soccer_outlined),
      selectedIcon: Icon(Icons.sports_soccer),
      label: 'Live',
    ),
    NavigationDestination(
      icon: Icon(Icons.people_outline),
      selectedIcon: Icon(Icons.people),
      label: 'Team',
    ),
    NavigationDestination(
      icon: Icon(Icons.emoji_events_outlined),
      selectedIcon: Icon(Icons.emoji_events),
      label: 'Leagues',
    ),
    NavigationDestination(
      icon: Icon(Icons.person_outline),
      selectedIcon: Icon(Icons.person),
      label: 'Profile',
    ),
  ];

  static const List<String> _routes = [
    AppRoutes.home,
    AppRoutes.live,
    AppRoutes.team,
    AppRoutes.leagues,
    AppRoutes.profile,
  ];

  void _onDestinationSelected(int index) {
    if (index != _currentIndex) {
      setState(() => _currentIndex = index);
      context.go(_routes[index]);
    }
  }

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context)!;
    final location = GoRouterState.of(context).uri.path;
    final currentIndex = _routes.indexWhere((route) => location.startsWith(route));
    
    if (currentIndex != -1 && currentIndex != _currentIndex) {
      _currentIndex = currentIndex;
    }

    return Scaffold(
      body: widget.child,
      bottomNavigationBar: NavigationBar(
        selectedIndex: _currentIndex.clamp(0, _destinations.length - 1),
        onDestinationSelected: _onDestinationSelected,
        destinations: [
          NavigationDestination(
            icon: const Icon(Icons.home_outlined),
            selectedIcon: const Icon(Icons.home),
            label: l10n.navHome,
          ),
          NavigationDestination(
            icon: const Icon(Icons.sports_soccer_outlined),
            selectedIcon: const Icon(Icons.sports_soccer),
            label: l10n.navLive,
          ),
          NavigationDestination(
            icon: const Icon(Icons.people_outline),
            selectedIcon: const Icon(Icons.people),
            label: l10n.navTeam,
          ),
          NavigationDestination(
            icon: const Icon(Icons.emoji_events_outlined),
            selectedIcon: const Icon(Icons.emoji_events),
            label: l10n.navLeagues,
          ),
          NavigationDestination(
            icon: const Icon(Icons.person_outline),
            selectedIcon: const Icon(Icons.person),
            label: l10n.navProfile,
          ),
        ],
      ),
    );
  }
}
