import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:tactix/l10n/app_localizations.dart';

import 'package:tactix/core/core.dart';
import 'package:tactix/shared/widgets/widgets.dart';

class TactixApp extends ConsumerWidget {
  const TactixApp({super.key});

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final router = ref.watch(routerProvider);
    final themeMode = ref.watch(themeModeProvider);

    return MaterialApp.router(
      title: 'TACTIX',
      debugShowCheckedModeBanner: false,
      theme: AppTheme.light,
      darkTheme: AppTheme.dark,
      themeMode: themeMode,
      routerConfig: router,
      supportedLocales: AppLocalizations.supportedLocales,
      localizationsDelegates: AppLocalizations.localizationsDelegates,
      localeResolutionCallback: (locale, supportedLocales) {
        if (locale == null) {
          return supportedLocales.first;
        }
        for (final supportedLocale in supportedLocales) {
          if (supportedLocale.languageCode == locale.languageCode) {
            return supportedLocale;
          }
        }
        return supportedLocales.first;
      },
      builder: (context, child) {
        return RtlAwareWidget(child: child!);
      },
    );
  }
}
