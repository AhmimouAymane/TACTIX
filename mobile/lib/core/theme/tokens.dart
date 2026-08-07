import 'package:flutter/material.dart';

class AppColors {
  const AppColors._();

  static const primary = Color(0xFFFFB020);
  static const primaryContainer = Color(0xFFFFD54F);
  static const onPrimary = Color(0xFF1A1A1A);
  static const onPrimaryContainer = Color(0xFF1A1A1A);

  static const secondary = Color(0xFF101828);
  static const secondaryContainer = Color(0xFF0B1120);
  static const onSecondary = Color(0xFFFFFFFF);
  static const onSecondaryContainer = Color(0xFFFFFFFF);

  static const accentGreen = Color(0xFF10B981);
  static const accentRed = Color(0xFFEF4444);
  static const accentBlue = Color(0xFF3B82F6);
  static const accentGold = Color(0xFFF59E0B);

  static const textPrimary = Color(0xFFFFFFFF);
  static const textSecondary = Color(0xFF94A3B8);
  static const textMuted = Color(0xFF64748B);

  static const surfaceCard = Color(0xFF1E293B);
  static const surfaceBackground = Color(0xFF0F172A);
  static const surfaceElevated = Color(0xFF1E293B);

  static const success = Color(0xFF10B981);
  static const warning = Color(0xFFF59E0B);
  static const error = Color(0xFFEF4444);
  static const info = Color(0xFF3B82F6);

  static const divider = Color(0xFF334155);
  static const outline = Color(0xFF475569);

  static const lightPrimary = Color(0xFFFFB020);
  static const lightPrimaryContainer = Color(0xFFFFF3E0);
  static const lightOnPrimary = Color(0xFF1A1A1A);
  static const lightOnPrimaryContainer = Color(0xFF1A1A1A);

  static const lightSecondary = Color(0xFFFFFFFF);
  static const lightSecondaryContainer = Color(0xFFF8FAFC);
  static const lightOnSecondary = Color(0xFF0F172A);
  static const lightOnSecondaryContainer = Color(0xFF0F172A);

  static const lightTextPrimary = Color(0xFF0F172A);
  static const lightTextSecondary = Color(0xFF475569);
  static const lightTextMuted = Color(0xFF64748B);

  static const lightSurfaceCard = Color(0xFFFFFFFF);
  static const lightSurfaceBackground = Color(0xFFF8FAFC);
  static const lightSurfaceElevated = Color(0xFFFFFFFF);

  static const lightDivider = Color(0xFFE2E8F0);
  static const lightOutline = Color(0xFFCBD5E1);
}

class AppSpacing {
  const AppSpacing._();

  static const base = 4.0;
  static const xs = 4.0;
  static const sm = 8.0;
  static const md = 12.0;
  static const lg = 16.0;
  static const xl = 20.0;
  static const xxl = 24.0;
  static const xxxl = 32.0;

  static const layoutMargin = 16.0;
  static const cardPadding = 16.0;
}

class AppRadii {
  const AppRadii._();

  static const small = 8.0;
  static const medium = 12.0;
  static const large = 16.0;
  static const pill = 999.0;
}

class AppShadows {
  const AppShadows._();

  static const elevated = [
    BoxShadow(
      color: Color(0x1A000000),
      blurRadius: 16,
      offset: Offset(0, 4),
    ),
    BoxShadow(
      color: Color(0x0D000000),
      blurRadius: 4,
      offset: Offset(0, 1),
    ),
  ];

  static const bottomSheet = [
    BoxShadow(
      color: Color(0x1A000000),
      blurRadius: 24,
      offset: Offset(0, -8),
    ),
  ];

  static const glow = [
    BoxShadow(
      color: Color(0x33FFB020),
      blurRadius: 24,
      offset: Offset(0, 0),
    ),
  ];
}

class AppTypography {
  static const fontFamily = 'Inter';

  static const displayLarge = TextStyle(
    fontFamily: fontFamily,
    fontSize: 32,
    fontWeight: FontWeight.w700,
    height: 1.2,
    letterSpacing: -0.5,
  );

  static const displayMedium = TextStyle(
    fontFamily: fontFamily,
    fontSize: 28,
    fontWeight: FontWeight.w700,
    height: 1.2,
    letterSpacing: -0.3,
  );

  static const displaySmall = TextStyle(
    fontFamily: fontFamily,
    fontSize: 24,
    fontWeight: FontWeight.w600,
    height: 1.3,
  );

  static const headlineLarge = TextStyle(
    fontFamily: fontFamily,
    fontSize: 22,
    fontWeight: FontWeight.w600,
    height: 1.3,
  );

  static const headlineMedium = TextStyle(
    fontFamily: fontFamily,
    fontSize: 20,
    fontWeight: FontWeight.w600,
    height: 1.4,
  );

  static const headlineSmall = TextStyle(
    fontFamily: fontFamily,
    fontSize: 18,
    fontWeight: FontWeight.w600,
    height: 1.4,
  );

  static const titleLarge = TextStyle(
    fontFamily: fontFamily,
    fontSize: 16,
    fontWeight: FontWeight.w600,
    height: 1.5,
  );

  static const titleMedium = TextStyle(
    fontFamily: fontFamily,
    fontSize: 14,
    fontWeight: FontWeight.w500,
    height: 1.5,
  );

  static const titleSmall = TextStyle(
    fontFamily: fontFamily,
    fontSize: 12,
    fontWeight: FontWeight.w500,
    height: 1.5,
    letterSpacing: 0.1,
  );

  static const bodyLarge = TextStyle(
    fontFamily: fontFamily,
    fontSize: 16,
    fontWeight: FontWeight.w400,
    height: 1.5,
  );

  static const bodyMedium = TextStyle(
    fontFamily: fontFamily,
    fontSize: 14,
    fontWeight: FontWeight.w400,
    height: 1.5,
  );

  static const bodySmall = TextStyle(
    fontFamily: fontFamily,
    fontSize: 12,
    fontWeight: FontWeight.w400,
    height: 1.5,
  );

  static const labelLarge = TextStyle(
    fontFamily: fontFamily,
    fontSize: 14,
    fontWeight: FontWeight.w500,
    height: 1.4,
  );

  static const labelMedium = TextStyle(
    fontFamily: fontFamily,
    fontSize: 12,
    fontWeight: FontWeight.w500,
    height: 1.4,
  );

  static const labelSmall = TextStyle(
    fontFamily: fontFamily,
    fontSize: 11,
    fontWeight: FontWeight.w500,
    height: 1.4,
    letterSpacing: 0.1,
  );
}