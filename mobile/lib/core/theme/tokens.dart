import 'package:flutter/material.dart';

class AppColors {
  const AppColors._();

  // Premier League / FPL brand palette.
  static const primary = Color(0xFF00FF87);
  static const primaryContainer = Color(0xFF00CC6A);
  static const onPrimary = Color(0xFF2A002F);
  static const onPrimaryContainer = Color(0xFF2A002F);

  static const green = Color(0xFF00FF87);
  static const onGreen = Color(0xFF2A002F);

  static const secondary = Color(0xFF2A002F);
  static const secondaryContainer = Color(0xFF4C0D52);
  static const onSecondary = Color(0xFFFFFFFF);
  static const onSecondaryContainer = Color(0xFFFFFFFF);

  static const accentGreen = Color(0xFF00FF87);
  static const accentRed = Color(0xFFE90052);
  static const accentBlue = Color(0xFF04F5FF);
  static const accentGold = Color(0xFFFFC800);

  // Position colors (FPL-style).
  static const posGk = Color(0xFFFFC800);
  static const posDef = Color(0xFF04F5FF);
  static const posMid = Color(0xFF00FF87);
  static const posFwd = Color(0xFFE90052);
  static const posSub = Color(0xFFD9B8DD);

  static Color position(String group) => switch (group) {
        'GK' => posGk,
        'DEF' => posDef,
        'MID' => posMid,
        'FWD' => posFwd,
        _ => posSub,
      };

  static Color onPosition(String group) =>
      group == 'FWD' ? const Color(0xFFFFFFFF) : onPrimary;

  static const textPrimary = Color(0xFFFFFFFF);
  static const textSecondary = Color(0xFFD9B8DD);
  static const textMuted = Color(0xFFB58BB9);

  static const surfaceCard = Color(0xFF4C0D52);
  static const surfaceBackground = Color(0xFF37003C);
  static const surfaceElevated = Color(0xFF5A1460);

  static const success = Color(0xFF00FF87);
  static const warning = Color(0xFFFFC800);
  static const error = Color(0xFFE90052);
  static const info = Color(0xFF04F5FF);

  static const divider = Color(0xFF6B3572);
  static const outline = Color(0xFF8A5C90);

  // Light mode: white surfaces, PL purple text, green CTAs.
  static const lightPrimary = Color(0xFF37003C);
  static const lightPrimaryContainer = Color(0xFFEFE0F1);
  static const lightOnPrimary = Color(0xFFFFFFFF);
  static const lightOnPrimaryContainer = Color(0xFF37003C);

  static const lightSecondary = Color(0xFFFFFFFF);
  static const lightSecondaryContainer = Color(0xFFF6EEF7);
  static const lightOnSecondary = Color(0xFF37003C);
  static const lightOnSecondaryContainer = Color(0xFF37003C);

  static const lightTextPrimary = Color(0xFF37003C);
  static const lightTextSecondary = Color(0xFF6B4A70);
  static const lightTextMuted = Color(0xFF8A6C8F);

  static const lightSurfaceCard = Color(0xFFFFFFFF);
  static const lightSurfaceBackground = Color(0xFFF7F1F8);
  static const lightSurfaceElevated = Color(0xFFFFFFFF);

  static const lightDivider = Color(0xFFEADCEF);
  static const lightOutline = Color(0xFFD4BCD8);
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
      color: Color(0x4D000000),
      blurRadius: 16,
      offset: Offset(0, 4),
    ),
    BoxShadow(
      color: Color(0x26000000),
      blurRadius: 4,
      offset: Offset(0, 1),
    ),
  ];

  static const bottomSheet = [
    BoxShadow(
      color: Color(0x66000000),
      blurRadius: 24,
      offset: Offset(0, -8),
    ),
  ];

  static const glow = [
    BoxShadow(
      color: Color(0x4D00FF87),
      blurRadius: 24,
      offset: Offset(0, 0),
    ),
  ];
}

class AppTypography {
  static const fontFamily = 'Barlow';
  static const displayFontFamily = 'BarlowCondensed';

  static const displayLarge = TextStyle(
    fontFamily: displayFontFamily,
    fontSize: 34,
    fontWeight: FontWeight.w700,
    height: 1.1,
    letterSpacing: -0.5,
  );

  static const displayMedium = TextStyle(
    fontFamily: displayFontFamily,
    fontSize: 28,
    fontWeight: FontWeight.w700,
    height: 1.15,
    letterSpacing: -0.3,
  );

  static const displaySmall = TextStyle(
    fontFamily: displayFontFamily,
    fontSize: 24,
    fontWeight: FontWeight.w700,
    height: 1.2,
  );

  static const headlineLarge = TextStyle(
    fontFamily: displayFontFamily,
    fontSize: 22,
    fontWeight: FontWeight.w600,
    height: 1.25,
  );

  static const headlineMedium = TextStyle(
    fontFamily: displayFontFamily,
    fontSize: 20,
    fontWeight: FontWeight.w600,
    height: 1.3,
  );

  static const headlineSmall = TextStyle(
    fontFamily: displayFontFamily,
    fontSize: 18,
    fontWeight: FontWeight.w600,
    height: 1.35,
  );

  static const titleLarge = TextStyle(
    fontFamily: displayFontFamily,
    fontSize: 16,
    fontWeight: FontWeight.w600,
    height: 1.4,
    letterSpacing: 0.2,
  );

  static const titleMedium = TextStyle(
    fontFamily: fontFamily,
    fontSize: 14,
    fontWeight: FontWeight.w600,
    height: 1.5,
  );

  static const titleSmall = TextStyle(
    fontFamily: fontFamily,
    fontSize: 12,
    fontWeight: FontWeight.w600,
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
    fontWeight: FontWeight.w600,
    height: 1.4,
  );

  static const labelMedium = TextStyle(
    fontFamily: fontFamily,
    fontSize: 12,
    fontWeight: FontWeight.w600,
    height: 1.4,
  );

  static const labelSmall = TextStyle(
    fontFamily: fontFamily,
    fontSize: 11,
    fontWeight: FontWeight.w600,
    height: 1.4,
    letterSpacing: 0.1,
  );
}
