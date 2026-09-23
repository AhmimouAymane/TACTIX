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

    test('dark theme uses Barlow font family', () {
      expect(AppTheme.dark.textTheme.bodyMedium?.fontFamily, equals(AppTypography.fontFamily));
    });

    test('light theme uses Barlow font family', () {
      expect(AppTheme.light.textTheme.bodyMedium?.fontFamily, equals(AppTypography.fontFamily));
    });

    test('display styles use Barlow Condensed', () {
      expect(AppTheme.dark.textTheme.headlineSmall?.fontFamily,
          equals(AppTypography.displayFontFamily));
    });
  });

  group('AppColors', () {
    test('primary color is FPL mint', () {
      expect(AppColors.primary, equals(const Color(0xFF00FF87)));
    });

    test('dark background color is PL purple', () {
      expect(AppColors.surfaceBackground, equals(const Color(0xFF37003C)));
    });

    test('light background color is correct', () {
      expect(AppColors.lightSurfaceBackground, equals(const Color(0xFFF7F1F8)));
    });

    test('position colors are distinct', () {
      expect(AppColors.posGk, isNot(AppColors.posDef));
      expect(AppColors.posDef, isNot(AppColors.posMid));
      expect(AppColors.posMid, isNot(AppColors.posFwd));
      expect(AppColors.position('GK'), equals(AppColors.posGk));
      expect(AppColors.position('SUB'), equals(AppColors.posSub));
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