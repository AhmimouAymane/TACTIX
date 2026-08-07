import 'package:flutter_test/flutter_test.dart';
import 'package:flutter/material.dart';
import 'package:tactix/core/theme/tokens.dart';
import 'package:tactix/core/theme/app_theme.dart';

void main() {
  group('AppTheme', () {
    test('dark theme has correct brightness', () {
      expect(AppTheme.dark.brightness, equals(Brightness.dark));
    });

    test('light theme has correct brightness', () {
      expect(AppTheme.light.brightness, equals(Brightness.light));
    });

    test('dark theme uses correct primary color', () {
      expect(AppTheme.dark.colorScheme.primary, equals(AppColors.primary));
    });

    test('light theme uses correct primary color', () {
      expect(AppTheme.light.colorScheme.primary, equals(AppColors.lightPrimary));
    });

    test('dark theme has correct scaffold background', () {
      expect(AppTheme.dark.scaffoldBackgroundColor, equals(AppColors.surfaceBackground));
    });

    test('light theme has correct scaffold background', () {
      expect(AppTheme.light.scaffoldBackgroundColor, equals(AppColors.lightSurfaceBackground));
    });

    test('dark theme uses Inter font family', () {
      expect(AppTheme.dark.textTheme.bodyMedium?.fontFamily, equals(AppTypography.fontFamily));
    });

    test('light theme uses Inter font family', () {
      expect(AppTheme.light.textTheme.bodyMedium?.fontFamily, equals(AppTypography.fontFamily));
    });
  });

  group('AppColors', () {
    test('primary color is correct', () {
      expect(AppColors.primary, equals(const Color(0xFFFFB020)));
    });

    test('dark background color is correct', () {
      expect(AppColors.surfaceBackground, equals(const Color(0xFF0F172A)));
    });

    test('light background color is correct', () {
      expect(AppColors.lightSurfaceBackground, equals(const Color(0xFFF8FAFC)));
    });
  });

  group('AppSpacing', () {
    test('base unit is 4', () {
      expect(AppSpacing.base, equals(4.0));
    });

    test('layout margin is 16', () {
      expect(AppSpacing.layoutMargin, equals(16.0));
    });
  });

  group('AppRadii', () {
    test('small radius is 8', () {
      expect(AppRadii.small, equals(8.0));
    });

    test('medium radius is 12', () {
      expect(AppRadii.medium, equals(12.0));
    });

    test('large radius is 16', () {
      expect(AppRadii.large, equals(16.0));
    });
  });
}