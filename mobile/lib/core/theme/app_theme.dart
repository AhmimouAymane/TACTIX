import 'package:flutter/material.dart';
import 'tokens.dart';

class AppTheme {
  const AppTheme._();

  static ThemeData get dark => ThemeData(
        useMaterial3: true,
        brightness: Brightness.dark,
        fontFamily: AppTypography.fontFamily,
        colorScheme: const ColorScheme.dark(
          primary: AppColors.primary,
          onPrimary: AppColors.onPrimary,
          primaryContainer: AppColors.primaryContainer,
          onPrimaryContainer: AppColors.onPrimaryContainer,
          secondary: AppColors.secondary,
          onSecondary: AppColors.onSecondary,
          secondaryContainer: AppColors.secondaryContainer,
          onSecondaryContainer: AppColors.onSecondaryContainer,
          tertiary: AppColors.accentGreen,
          onTertiary: AppColors.onPrimary,
          error: AppColors.error,
          onError: AppColors.onPrimary,
          surface: AppColors.surfaceCard,
          onSurface: AppColors.textPrimary,
          surfaceContainerHighest: AppColors.surfaceElevated,
          outline: AppColors.outline,
          outlineVariant: AppColors.divider,
        ),
        scaffoldBackgroundColor: AppColors.surfaceBackground,
        cardColor: AppColors.surfaceCard,
        dividerColor: AppColors.divider,
        shadowColor: Colors.black,
        indicatorColor: AppColors.primary,
        textTheme: _darkTextTheme,
        appBarTheme: _darkAppBarTheme,
        cardTheme: _darkCardTheme,
        elevatedButtonTheme: _darkElevatedButtonTheme,
        filledButtonTheme: _darkFilledButtonTheme,
        outlinedButtonTheme: _darkOutlinedButtonTheme,
        textButtonTheme: _darkTextButtonTheme,
        inputDecorationTheme: _darkInputDecorationTheme,
        bottomNavigationBarTheme: _darkBottomNavTheme,
        navigationBarTheme: _darkNavigationBarTheme,
        chipTheme: _darkChipTheme,
        dividerTheme: _darkDividerTheme,
        listTileTheme: _darkListTileTheme,
        dialogTheme: _darkDialogTheme,
        bottomSheetTheme: _darkBottomSheetTheme,
        snackBarTheme: _darkSnackBarTheme,
        tabBarTheme: _darkTabBarTheme,
        progressIndicatorTheme: _progressIndicatorTheme,
        sliderTheme: _darkSliderTheme,
        switchTheme: _darkSwitchTheme,
        checkboxTheme: _darkCheckboxTheme,
        radioTheme: _darkRadioTheme,
        floatingActionButtonTheme: _darkFabTheme,
      );

  static ThemeData get light => ThemeData(
        useMaterial3: true,
        brightness: Brightness.light,
        fontFamily: AppTypography.fontFamily,
        colorScheme: const ColorScheme.light(
          primary: AppColors.lightPrimary,
          onPrimary: AppColors.lightOnPrimary,
          primaryContainer: AppColors.lightPrimaryContainer,
          onPrimaryContainer: AppColors.lightOnPrimaryContainer,
          secondary: AppColors.lightSecondary,
          onSecondary: AppColors.lightOnSecondary,
          secondaryContainer: AppColors.lightSecondaryContainer,
          onSecondaryContainer: AppColors.lightOnSecondaryContainer,
          tertiary: AppColors.accentGreen,
          onTertiary: AppColors.lightOnPrimary,
          error: AppColors.error,
          onError: AppColors.lightOnPrimary,
          surface: AppColors.lightSurfaceCard,
          onSurface: AppColors.lightTextPrimary,
          surfaceContainerHighest: AppColors.lightSurfaceElevated,
          outline: AppColors.lightOutline,
          outlineVariant: AppColors.lightDivider,
        ),
        scaffoldBackgroundColor: AppColors.lightSurfaceBackground,
        cardColor: AppColors.lightSurfaceCard,
        dividerColor: AppColors.lightDivider,
        shadowColor: Colors.black,
        indicatorColor: AppColors.lightPrimary,
        textTheme: _lightTextTheme,
        appBarTheme: _lightAppBarTheme,
        cardTheme: _lightCardTheme,
        elevatedButtonTheme: _lightElevatedButtonTheme,
        filledButtonTheme: _lightFilledButtonTheme,
        outlinedButtonTheme: _lightOutlinedButtonTheme,
        textButtonTheme: _lightTextButtonTheme,
        inputDecorationTheme: _lightInputDecorationTheme,
        bottomNavigationBarTheme: _lightBottomNavTheme,
        navigationBarTheme: _lightNavigationBarTheme,
        chipTheme: _lightChipTheme,
        dividerTheme: _lightDividerTheme,
        listTileTheme: _lightListTileTheme,
        dialogTheme: _lightDialogTheme,
        bottomSheetTheme: _lightBottomSheetTheme,
        snackBarTheme: _lightSnackBarTheme,
        tabBarTheme: _lightTabBarTheme,
        progressIndicatorTheme: _progressIndicatorTheme,
        sliderTheme: _lightSliderTheme,
        switchTheme: _lightSwitchTheme,
        checkboxTheme: _lightCheckboxTheme,
        radioTheme: _lightRadioTheme,
        floatingActionButtonTheme: _lightFabTheme,
      );

  static final _darkTextTheme = TextTheme(
    displayLarge: AppTypography.displayLarge.copyWith(color: AppColors.textPrimary),
    displayMedium: AppTypography.displayMedium.copyWith(color: AppColors.textPrimary),
    displaySmall: AppTypography.displaySmall.copyWith(color: AppColors.textPrimary),
    headlineLarge: AppTypography.headlineLarge.copyWith(color: AppColors.textPrimary),
    headlineMedium: AppTypography.headlineMedium.copyWith(color: AppColors.textPrimary),
    headlineSmall: AppTypography.headlineSmall.copyWith(color: AppColors.textPrimary),
    titleLarge: AppTypography.titleLarge.copyWith(color: AppColors.textPrimary),
    titleMedium: AppTypography.titleMedium.copyWith(color: AppColors.textPrimary),
    titleSmall: AppTypography.titleSmall.copyWith(color: AppColors.textSecondary),
    bodyLarge: AppTypography.bodyLarge.copyWith(color: AppColors.textPrimary),
    bodyMedium: AppTypography.bodyMedium.copyWith(color: AppColors.textPrimary),
    bodySmall: AppTypography.bodySmall.copyWith(color: AppColors.textSecondary),
    labelLarge: AppTypography.labelLarge.copyWith(color: AppColors.textPrimary),
    labelMedium: AppTypography.labelMedium.copyWith(color: AppColors.textPrimary),
    labelSmall: AppTypography.labelSmall.copyWith(color: AppColors.textSecondary),
  );

  static final _lightTextTheme = TextTheme(
    displayLarge: AppTypography.displayLarge.copyWith(color: AppColors.lightTextPrimary),
    displayMedium: AppTypography.displayMedium.copyWith(color: AppColors.lightTextPrimary),
    displaySmall: AppTypography.displaySmall.copyWith(color: AppColors.lightTextPrimary),
    headlineLarge: AppTypography.headlineLarge.copyWith(color: AppColors.lightTextPrimary),
    headlineMedium: AppTypography.headlineMedium.copyWith(color: AppColors.lightTextPrimary),
    headlineSmall: AppTypography.headlineSmall.copyWith(color: AppColors.lightTextPrimary),
    titleLarge: AppTypography.titleLarge.copyWith(color: AppColors.lightTextPrimary),
    titleMedium: AppTypography.titleMedium.copyWith(color: AppColors.lightTextPrimary),
    titleSmall: AppTypography.titleSmall.copyWith(color: AppColors.lightTextSecondary),
    bodyLarge: AppTypography.bodyLarge.copyWith(color: AppColors.lightTextPrimary),
    bodyMedium: AppTypography.bodyMedium.copyWith(color: AppColors.lightTextPrimary),
    bodySmall: AppTypography.bodySmall.copyWith(color: AppColors.lightTextSecondary),
    labelLarge: AppTypography.labelLarge.copyWith(color: AppColors.lightTextPrimary),
    labelMedium: AppTypography.labelMedium.copyWith(color: AppColors.lightTextPrimary),
    labelSmall: AppTypography.labelSmall.copyWith(color: AppColors.lightTextSecondary),
  );

  static final _darkAppBarTheme = AppBarTheme(
    centerTitle: false,
    elevation: 0,
    scrolledUnderElevation: 1,
    surfaceTintColor: Colors.transparent,
    backgroundColor: AppColors.surfaceBackground,
    foregroundColor: AppColors.textPrimary,
    titleTextStyle: AppTypography.headlineSmall.copyWith(color: AppColors.textPrimary),
    toolbarTextStyle: AppTypography.bodyMedium.copyWith(color: AppColors.textPrimary),
  );

  static final _lightAppBarTheme = AppBarTheme(
    centerTitle: false,
    elevation: 0,
    scrolledUnderElevation: 1,
    surfaceTintColor: Colors.transparent,
    backgroundColor: AppColors.lightSurfaceBackground,
    foregroundColor: AppColors.lightTextPrimary,
    titleTextStyle: AppTypography.headlineSmall.copyWith(color: AppColors.lightTextPrimary),
    toolbarTextStyle: AppTypography.bodyMedium.copyWith(color: AppColors.lightTextPrimary),
  );

  static final _darkCardTheme = CardThemeData(
    color: AppColors.surfaceCard,
    elevation: 0,
    surfaceTintColor: Colors.transparent,
    margin: EdgeInsets.zero,
    shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.all(Radius.circular(AppRadii.medium)),
      side: BorderSide(color: AppColors.outline, width: 0.5),
    ),
  );

  static final _lightCardTheme = CardThemeData(
    color: AppColors.lightSurfaceCard,
    elevation: 0,
    surfaceTintColor: Colors.transparent,
    margin: EdgeInsets.zero,
    shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.all(Radius.circular(AppRadii.medium)),
      side: BorderSide(color: AppColors.lightOutline, width: 0.5),
    ),
  );

  static final _darkElevatedButtonTheme = ElevatedButtonThemeData(
    style: ElevatedButton.styleFrom(
      backgroundColor: AppColors.primary,
      foregroundColor: AppColors.onPrimary,
      elevation: 0,
      shadowColor: Colors.transparent,
      padding: const EdgeInsets.symmetric(
        horizontal: AppSpacing.lg,
        vertical: AppSpacing.md,
      ),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(AppRadii.medium),
      ),
      textStyle: AppTypography.labelLarge,
      minimumSize: const Size(0, 48),
    ),
  );

  static final _lightElevatedButtonTheme = ElevatedButtonThemeData(
    style: ElevatedButton.styleFrom(
      backgroundColor: AppColors.lightPrimary,
      foregroundColor: AppColors.lightOnPrimary,
      elevation: 0,
      shadowColor: Colors.transparent,
      padding: const EdgeInsets.symmetric(
        horizontal: AppSpacing.lg,
        vertical: AppSpacing.md,
      ),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(AppRadii.medium),
      ),
      textStyle: AppTypography.labelLarge,
      minimumSize: const Size(0, 48),
    ),
  );

  static final _darkFilledButtonTheme = FilledButtonThemeData(
    style: FilledButton.styleFrom(
      backgroundColor: AppColors.primary,
      foregroundColor: AppColors.onPrimary,
      padding: const EdgeInsets.symmetric(
        horizontal: AppSpacing.lg,
        vertical: AppSpacing.md,
      ),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(AppRadii.medium),
      ),
      textStyle: AppTypography.labelLarge,
      minimumSize: const Size(0, 48),
    ),
  );

  static final _lightFilledButtonTheme = FilledButtonThemeData(
    style: FilledButton.styleFrom(
      backgroundColor: AppColors.lightPrimary,
      foregroundColor: AppColors.lightOnPrimary,
      padding: const EdgeInsets.symmetric(
        horizontal: AppSpacing.lg,
        vertical: AppSpacing.md,
      ),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(AppRadii.medium),
      ),
      textStyle: AppTypography.labelLarge,
      minimumSize: const Size(0, 48),
    ),
  );

  static final _darkOutlinedButtonTheme = OutlinedButtonThemeData(
    style: OutlinedButton.styleFrom(
      foregroundColor: AppColors.textPrimary,
      side: const BorderSide(color: AppColors.outline, width: 1),
      padding: const EdgeInsets.symmetric(
        horizontal: AppSpacing.lg,
        vertical: AppSpacing.md,
      ),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(AppRadii.medium),
      ),
      textStyle: AppTypography.labelLarge,
      minimumSize: const Size(0, 48),
    ),
  );

  static final _lightOutlinedButtonTheme = OutlinedButtonThemeData(
    style: OutlinedButton.styleFrom(
      foregroundColor: AppColors.lightTextPrimary,
      side: const BorderSide(color: AppColors.lightOutline, width: 1),
      padding: const EdgeInsets.symmetric(
        horizontal: AppSpacing.lg,
        vertical: AppSpacing.md,
      ),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(AppRadii.medium),
      ),
      textStyle: AppTypography.labelLarge,
      minimumSize: const Size(0, 48),
    ),
  );

  static final _darkTextButtonTheme = TextButtonThemeData(
    style: TextButton.styleFrom(
      foregroundColor: AppColors.primary,
      padding: const EdgeInsets.symmetric(
        horizontal: AppSpacing.md,
        vertical: AppSpacing.sm,
      ),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(AppRadii.medium),
      ),
      textStyle: AppTypography.labelLarge,
    ),
  );

  static final _lightTextButtonTheme = TextButtonThemeData(
    style: TextButton.styleFrom(
      foregroundColor: AppColors.lightPrimary,
      padding: const EdgeInsets.symmetric(
        horizontal: AppSpacing.md,
        vertical: AppSpacing.sm,
      ),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(AppRadii.medium),
      ),
      textStyle: AppTypography.labelLarge,
    ),
  );

  static final _darkInputDecorationTheme = InputDecorationTheme(
    filled: true,
    fillColor: AppColors.secondary,
    contentPadding: EdgeInsets.symmetric(
      horizontal: AppSpacing.lg,
      vertical: AppSpacing.md,
    ),
    border: OutlineInputBorder(
      borderRadius: BorderRadius.all(Radius.circular(AppRadii.medium)),
      borderSide: BorderSide.none,
    ),
    enabledBorder: OutlineInputBorder(
      borderRadius: BorderRadius.all(Radius.circular(AppRadii.medium)),
      borderSide: BorderSide(color: AppColors.outline, width: 1),
    ),
    focusedBorder: OutlineInputBorder(
      borderRadius: BorderRadius.all(Radius.circular(AppRadii.medium)),
      borderSide: BorderSide(color: AppColors.primary, width: 2),
    ),
    errorBorder: OutlineInputBorder(
      borderRadius: BorderRadius.all(Radius.circular(AppRadii.medium)),
      borderSide: BorderSide(color: AppColors.error, width: 1),
    ),
    focusedErrorBorder: OutlineInputBorder(
      borderRadius: BorderRadius.all(Radius.circular(AppRadii.medium)),
      borderSide: BorderSide(color: AppColors.error, width: 2),
    ),
    disabledBorder: OutlineInputBorder(
      borderRadius: BorderRadius.all(Radius.circular(AppRadii.medium)),
      borderSide: BorderSide(color: AppColors.divider, width: 1),
    ),
    labelStyle: AppTypography.bodyMedium.copyWith(color: AppColors.textSecondary),
    hintStyle: AppTypography.bodyMedium.copyWith(color: AppColors.textMuted),
    errorStyle: AppTypography.bodySmall.copyWith(color: AppColors.error),
    floatingLabelStyle: AppTypography.bodySmall.copyWith(color: AppColors.primary),
    prefixIconColor: WidgetStateColor.resolveWith((states) =>
        states.contains(WidgetState.focused) ? AppColors.primary : AppColors.textMuted),
    suffixIconColor: WidgetStateColor.resolveWith((states) =>
        states.contains(WidgetState.focused) ? AppColors.primary : AppColors.textMuted),
  );

  static final _lightInputDecorationTheme = InputDecorationTheme(
    filled: true,
    fillColor: AppColors.lightSecondaryContainer,
    contentPadding: EdgeInsets.symmetric(
      horizontal: AppSpacing.lg,
      vertical: AppSpacing.md,
    ),
    border: OutlineInputBorder(
      borderRadius: BorderRadius.all(Radius.circular(AppRadii.medium)),
      borderSide: BorderSide.none,
    ),
    enabledBorder: OutlineInputBorder(
      borderRadius: BorderRadius.all(Radius.circular(AppRadii.medium)),
      borderSide: BorderSide(color: AppColors.lightOutline, width: 1),
    ),
    focusedBorder: OutlineInputBorder(
      borderRadius: BorderRadius.all(Radius.circular(AppRadii.medium)),
      borderSide: BorderSide(color: AppColors.lightPrimary, width: 2),
    ),
    errorBorder: OutlineInputBorder(
      borderRadius: BorderRadius.all(Radius.circular(AppRadii.medium)),
      borderSide: BorderSide(color: AppColors.error, width: 1),
    ),
    focusedErrorBorder: OutlineInputBorder(
      borderRadius: BorderRadius.all(Radius.circular(AppRadii.medium)),
      borderSide: BorderSide(color: AppColors.error, width: 2),
    ),
    disabledBorder: OutlineInputBorder(
      borderRadius: BorderRadius.all(Radius.circular(AppRadii.medium)),
      borderSide: BorderSide(color: AppColors.lightDivider, width: 1),
    ),
    labelStyle: AppTypography.bodyMedium.copyWith(color: AppColors.lightTextSecondary),
    hintStyle: AppTypography.bodyMedium.copyWith(color: AppColors.lightTextMuted),
    errorStyle: AppTypography.bodySmall.copyWith(color: AppColors.error),
    floatingLabelStyle: AppTypography.bodySmall.copyWith(color: AppColors.lightPrimary),
    prefixIconColor: WidgetStateColor.resolveWith((states) =>
        states.contains(WidgetState.focused) ? AppColors.lightPrimary : AppColors.lightTextMuted),
    suffixIconColor: WidgetStateColor.resolveWith((states) =>
        states.contains(WidgetState.focused) ? AppColors.lightPrimary : AppColors.lightTextMuted),
  );

  static final _darkBottomNavTheme = BottomNavigationBarThemeData(
    backgroundColor: AppColors.surfaceCard,
    selectedItemColor: AppColors.primary,
    unselectedItemColor: AppColors.textMuted,
    selectedLabelStyle: AppTypography.labelSmall,
    unselectedLabelStyle: AppTypography.labelSmall,
    type: BottomNavigationBarType.fixed,
    elevation: 8,
    showSelectedLabels: true,
    showUnselectedLabels: true,
  );

  static final _lightBottomNavTheme = BottomNavigationBarThemeData(
    backgroundColor: AppColors.lightSurfaceCard,
    selectedItemColor: AppColors.lightPrimary,
    unselectedItemColor: AppColors.lightTextMuted,
    selectedLabelStyle: AppTypography.labelSmall,
    unselectedLabelStyle: AppTypography.labelSmall,
    type: BottomNavigationBarType.fixed,
    elevation: 8,
    showSelectedLabels: true,
    showUnselectedLabels: true,
  );

  static final _darkNavigationBarTheme = NavigationBarThemeData(
    backgroundColor: AppColors.surfaceCard,
    indicatorColor: AppColors.primary.withValues(alpha: 0.12),
    labelTextStyle: WidgetStatePropertyAll(AppTypography.labelSmall),
    iconTheme: WidgetStateProperty.resolveWith((states) {
      if (states.contains(WidgetState.selected)) {
        return const IconThemeData(color: AppColors.primary, size: 24);
      }
      return const IconThemeData(color: AppColors.textMuted, size: 24);
    }),
    height: 72,
    surfaceTintColor: Colors.transparent,
  );

  static final _lightNavigationBarTheme = NavigationBarThemeData(
    backgroundColor: AppColors.lightSurfaceCard,
    indicatorColor: AppColors.lightPrimary.withValues(alpha: 0.12),
    labelTextStyle: WidgetStatePropertyAll(AppTypography.labelSmall),
    iconTheme: WidgetStateProperty.resolveWith((states) {
      if (states.contains(WidgetState.selected)) {
        return const IconThemeData(color: AppColors.lightPrimary, size: 24);
      }
      return const IconThemeData(color: AppColors.lightTextMuted, size: 24);
    }),
    height: 72,
    surfaceTintColor: Colors.transparent,
  );

  static final _darkChipTheme = ChipThemeData(
    backgroundColor: AppColors.secondary,
    selectedColor: AppColors.primary.withValues(alpha: 0.2),
    disabledColor: AppColors.divider,
    padding: const EdgeInsets.symmetric(horizontal: AppSpacing.md, vertical: AppSpacing.xs),
    labelStyle: AppTypography.labelMedium.copyWith(color: AppColors.textPrimary),
    secondaryLabelStyle: AppTypography.labelMedium.copyWith(color: AppColors.onPrimary),
    brightness: Brightness.dark,
    shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(AppRadii.pill),
      side: BorderSide.none,
    ),
    side: BorderSide.none,
  );

  static final _lightChipTheme = ChipThemeData(
    backgroundColor: AppColors.lightSecondaryContainer,
    selectedColor: AppColors.lightPrimary.withValues(alpha: 0.2),
    disabledColor: AppColors.lightDivider,
    padding: const EdgeInsets.symmetric(horizontal: AppSpacing.md, vertical: AppSpacing.xs),
    labelStyle: AppTypography.labelMedium.copyWith(color: AppColors.lightTextPrimary),
    secondaryLabelStyle: AppTypography.labelMedium.copyWith(color: AppColors.lightOnPrimary),
    brightness: Brightness.light,
    shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(AppRadii.pill),
      side: BorderSide.none,
    ),
    side: BorderSide.none,
  );

  static const _darkDividerTheme = DividerThemeData(
    color: AppColors.divider,
    thickness: 0.5,
    space: 0,
    indent: 0,
    endIndent: 0,
  );

  static const _lightDividerTheme = DividerThemeData(
    color: AppColors.lightDivider,
    thickness: 0.5,
    space: 0,
    indent: 0,
    endIndent: 0,
  );

  static final _darkListTileTheme = ListTileThemeData(
    contentPadding: const EdgeInsets.symmetric(horizontal: AppSpacing.lg),
    titleTextStyle: AppTypography.bodyLarge.copyWith(color: AppColors.textPrimary),
    subtitleTextStyle: AppTypography.bodySmall.copyWith(color: AppColors.textSecondary),
    leadingAndTrailingTextStyle: AppTypography.bodyMedium.copyWith(color: AppColors.textSecondary),
    iconColor: AppColors.textSecondary,
    textColor: AppColors.textPrimary,
    selectedColor: AppColors.primary.withValues(alpha: 0.12),
    selectedTileColor: AppColors.primary.withValues(alpha: 0.08),
    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(AppRadii.medium)),
  );

  static final _lightListTileTheme = ListTileThemeData(
    contentPadding: const EdgeInsets.symmetric(horizontal: AppSpacing.lg),
    titleTextStyle: AppTypography.bodyLarge.copyWith(color: AppColors.lightTextPrimary),
    subtitleTextStyle: AppTypography.bodySmall.copyWith(color: AppColors.lightTextSecondary),
    leadingAndTrailingTextStyle: AppTypography.bodyMedium.copyWith(color: AppColors.lightTextSecondary),
    iconColor: AppColors.lightTextSecondary,
    textColor: AppColors.lightTextPrimary,
    selectedColor: AppColors.lightPrimary.withValues(alpha: 0.12),
    selectedTileColor: AppColors.lightPrimary.withValues(alpha: 0.08),
    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(AppRadii.medium)),
  );

  static final _darkDialogTheme = DialogThemeData(
    backgroundColor: AppColors.surfaceCard,
    surfaceTintColor: Colors.transparent,
    elevation: 8,
    shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(AppRadii.large),
    ),
    titleTextStyle: AppTypography.headlineSmall.copyWith(color: AppColors.textPrimary),
    contentTextStyle: AppTypography.bodyMedium.copyWith(color: AppColors.textPrimary),
  );

  static final _lightDialogTheme = DialogThemeData(
    backgroundColor: AppColors.lightSurfaceCard,
    surfaceTintColor: Colors.transparent,
    elevation: 8,
    shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(AppRadii.large),
    ),
    titleTextStyle: AppTypography.headlineSmall.copyWith(color: AppColors.lightTextPrimary),
    contentTextStyle: AppTypography.bodyMedium.copyWith(color: AppColors.lightTextPrimary),
  );

  static final _darkBottomSheetTheme = BottomSheetThemeData(
    backgroundColor: AppColors.surfaceCard,
    surfaceTintColor: Colors.transparent,
    elevation: 8,
    shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.vertical(top: Radius.circular(AppRadii.large)),
    ),
    modalBackgroundColor: AppColors.surfaceCard,
    dragHandleColor: AppColors.textMuted,
    showDragHandle: true,
  );

  static final _lightBottomSheetTheme = BottomSheetThemeData(
    backgroundColor: AppColors.lightSurfaceCard,
    surfaceTintColor: Colors.transparent,
    elevation: 8,
    shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.vertical(top: Radius.circular(AppRadii.large)),
    ),
    modalBackgroundColor: AppColors.lightSurfaceCard,
    dragHandleColor: AppColors.lightTextMuted,
    showDragHandle: true,
  );

  static final _darkSnackBarTheme = SnackBarThemeData(
    backgroundColor: AppColors.surfaceElevated,
    contentTextStyle: AppTypography.bodyMedium.copyWith(color: AppColors.textPrimary),
    actionTextColor: AppColors.primary,
    behavior: SnackBarBehavior.floating,
    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(AppRadii.medium)),
    elevation: 4,
  );

  static final _lightSnackBarTheme = SnackBarThemeData(
    backgroundColor: AppColors.lightSurfaceElevated,
    contentTextStyle: AppTypography.bodyMedium.copyWith(color: AppColors.lightTextPrimary),
    actionTextColor: AppColors.lightPrimary,
    behavior: SnackBarBehavior.floating,
    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(AppRadii.medium)),
    elevation: 4,
  );

  static final _darkTabBarTheme = TabBarThemeData(
    labelColor: AppColors.primary,
    unselectedLabelColor: AppColors.textMuted,
    labelStyle: AppTypography.labelLarge,
    unselectedLabelStyle: AppTypography.labelLarge,
    indicator: BoxDecoration(
      border: Border(
        bottom: BorderSide(color: AppColors.primary, width: 3),
      ),
    ),
    dividerColor: Colors.transparent,
    overlayColor: WidgetStatePropertyAll(AppColors.primary.withValues(alpha: 0.12)),
  );

  static final _lightTabBarTheme = TabBarThemeData(
    labelColor: AppColors.lightPrimary,
    unselectedLabelColor: AppColors.lightTextMuted,
    labelStyle: AppTypography.labelLarge,
    unselectedLabelStyle: AppTypography.labelLarge,
    indicator: BoxDecoration(
      border: Border(
        bottom: BorderSide(color: AppColors.lightPrimary, width: 3),
      ),
    ),
    dividerColor: Colors.transparent,
    overlayColor: WidgetStatePropertyAll(AppColors.lightPrimary.withValues(alpha: 0.12)),
  );

  static final _progressIndicatorTheme = ProgressIndicatorThemeData(
    color: AppColors.primary,
    linearTrackColor: AppColors.divider,
    circularTrackColor: AppColors.divider,
    refreshBackgroundColor: AppColors.surfaceCard,
  );

  static final _darkSliderTheme = SliderThemeData(
    activeTrackColor: AppColors.primary,
    inactiveTrackColor: AppColors.divider,
    thumbColor: AppColors.primary,
    overlayColor: AppColors.primary.withValues(alpha: 0.12),
    valueIndicatorColor: AppColors.primary,
    valueIndicatorTextStyle: AppTypography.labelSmall.copyWith(color: AppColors.onPrimary),
    trackHeight: 4,
  );

  static final _lightSliderTheme = SliderThemeData(
    activeTrackColor: AppColors.lightPrimary,
    inactiveTrackColor: AppColors.lightDivider,
    thumbColor: AppColors.lightPrimary,
    overlayColor: AppColors.lightPrimary.withValues(alpha: 0.12),
    valueIndicatorColor: AppColors.lightPrimary,
    valueIndicatorTextStyle: AppTypography.labelSmall.copyWith(color: AppColors.lightOnPrimary),
    trackHeight: 4,
  );

  static final _darkSwitchTheme = SwitchThemeData(
    thumbColor: WidgetStateProperty.resolveWith((states) {
      if (states.contains(WidgetState.selected)) {
        return AppColors.primary;
      }
      return AppColors.textMuted;
    }),
    trackColor: WidgetStateProperty.resolveWith((states) {
      if (states.contains(WidgetState.selected)) {
        return AppColors.primary.withValues(alpha: 0.5);
      }
      return AppColors.divider;
    }),
    overlayColor: WidgetStatePropertyAll(AppColors.primary.withValues(alpha: 0.12)),
    trackOutlineColor: WidgetStatePropertyAll(Colors.transparent),
  );

  static final _lightSwitchTheme = SwitchThemeData(
    thumbColor: WidgetStateProperty.resolveWith((states) {
      if (states.contains(WidgetState.selected)) {
        return AppColors.lightPrimary;
      }
      return AppColors.lightTextMuted;
    }),
    trackColor: WidgetStateProperty.resolveWith((states) {
      if (states.contains(WidgetState.selected)) {
        return AppColors.lightPrimary.withValues(alpha: 0.5);
      }
      return AppColors.lightDivider;
    }),
    overlayColor: WidgetStatePropertyAll(AppColors.lightPrimary.withValues(alpha: 0.12)),
    trackOutlineColor: WidgetStatePropertyAll(Colors.transparent),
  );

  static final _darkCheckboxTheme = CheckboxThemeData(
    fillColor: WidgetStateProperty.resolveWith((states) {
      if (states.contains(WidgetState.selected)) {
        return AppColors.primary;
      }
      return Colors.transparent;
    }),
    checkColor: WidgetStatePropertyAll(AppColors.onPrimary),
    overlayColor: WidgetStatePropertyAll(AppColors.primary.withValues(alpha: 0.12)),
    side: const BorderSide(color: AppColors.outline, width: 2),
    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(AppRadii.small)),
  );

  static final _lightCheckboxTheme = CheckboxThemeData(
    fillColor: WidgetStateProperty.resolveWith((states) {
      if (states.contains(WidgetState.selected)) {
        return AppColors.lightPrimary;
      }
      return Colors.transparent;
    }),
    checkColor: WidgetStatePropertyAll(AppColors.lightOnPrimary),
    overlayColor: WidgetStatePropertyAll(AppColors.lightPrimary.withValues(alpha: 0.12)),
    side: const BorderSide(color: AppColors.lightOutline, width: 2),
    shape: RoundedRectangleBorder(borderRadius: BorderRadius.circular(AppRadii.small)),
  );

  static final _darkRadioTheme = RadioThemeData(
    fillColor: WidgetStateProperty.resolveWith((states) {
      if (states.contains(WidgetState.selected)) {
        return AppColors.primary;
      }
      return AppColors.textMuted;
    }),
    overlayColor: WidgetStatePropertyAll(AppColors.primary.withValues(alpha: 0.12)),
  );

  static final _lightRadioTheme = RadioThemeData(
    fillColor: WidgetStateProperty.resolveWith((states) {
      if (states.contains(WidgetState.selected)) {
        return AppColors.lightPrimary;
      }
      return AppColors.lightTextMuted;
    }),
    overlayColor: WidgetStatePropertyAll(AppColors.lightPrimary.withValues(alpha: 0.12)),
  );

  static final _darkFabTheme = FloatingActionButtonThemeData(
    backgroundColor: AppColors.primary,
    foregroundColor: AppColors.onPrimary,
    elevation: 4,
    focusElevation: 6,
    hoverElevation: 6,
    highlightElevation: 8,
    shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(AppRadii.large),
    ),
  );

  static final _lightFabTheme = FloatingActionButtonThemeData(
    backgroundColor: AppColors.lightPrimary,
    foregroundColor: AppColors.lightOnPrimary,
    elevation: 4,
    focusElevation: 6,
    hoverElevation: 6,
    highlightElevation: 8,
    shape: RoundedRectangleBorder(
      borderRadius: BorderRadius.circular(AppRadii.large),
    ),
  );
}