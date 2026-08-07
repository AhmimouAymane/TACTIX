import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter/material.dart';

enum ThemeModePreference {
  system,
  light,
  dark,
}

class ThemeNotifier extends StateNotifier<ThemeModePreference> {
  ThemeNotifier() : super(ThemeModePreference.dark);

  void setThemeMode(ThemeModePreference mode) {
    state = mode;
  }

  void toggleTheme() {
    switch (state) {
      case ThemeModePreference.light:
        state = ThemeModePreference.dark;
        break;
      case ThemeModePreference.dark:
        state = ThemeModePreference.light;
        break;
      case ThemeModePreference.system:
        state = ThemeModePreference.dark;
        break;
    }
  }
}

final themeProvider = StateNotifierProvider<ThemeNotifier, ThemeModePreference>(
  (ref) => ThemeNotifier(),
);

final themeModeProvider = Provider<ThemeMode>((ref) {
  final preference = ref.watch(themeProvider);
  switch (preference) {
    case ThemeModePreference.light:
      return ThemeMode.light;
    case ThemeModePreference.dark:
      return ThemeMode.dark;
    case ThemeModePreference.system:
      return ThemeMode.system;
  }
});