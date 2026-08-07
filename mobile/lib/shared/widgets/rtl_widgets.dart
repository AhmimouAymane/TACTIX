import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:tactix/l10n/app_localizations.dart';

class RtlAwareWidget extends ConsumerWidget {
  const RtlAwareWidget({
    super.key,
    required this.child,
  });

  final Widget child;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final locale = Localizations.localeOf(context);
    final isRtl = locale.languageCode == 'ar';

    return Directionality(
      textDirection: isRtl ? TextDirection.rtl : TextDirection.ltr,
      child: child,
    );
  }
}

class RtlAwareScaffold extends ConsumerWidget {
  const RtlAwareScaffold({
    super.key,
    this.appBar,
    this.body,
    this.bottomNavigationBar,
    this.floatingActionButton,
    this.drawer,
    this.endDrawer,
    this.backgroundColor,
    this.resizeToAvoidBottomInset = true,
  });

  final PreferredSizeWidget? appBar;
  final Widget? body;
  final Widget? bottomNavigationBar;
  final Widget? floatingActionButton;
  final Widget? drawer;
  final Widget? endDrawer;
  final Color? backgroundColor;
  final bool resizeToAvoidBottomInset;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final locale = Localizations.localeOf(context);
    final isRtl = locale.languageCode == 'ar';

    return Directionality(
      textDirection: isRtl ? TextDirection.rtl : TextDirection.ltr,
      child: Scaffold(
        appBar: appBar,
        body: body,
        bottomNavigationBar: bottomNavigationBar,
        floatingActionButton: floatingActionButton,
        drawer: isRtl ? endDrawer : drawer,
        endDrawer: isRtl ? drawer : endDrawer,
        backgroundColor: backgroundColor,
        resizeToAvoidBottomInset: resizeToAvoidBottomInset,
      ),
    );
  }
}

class RtlAwareSliverAppBar extends ConsumerWidget {
  const RtlAwareSliverAppBar({
    super.key,
    this.title,
    this.leading,
    this.actions,
    this.centerTitle = false,
    this.elevation = 0,
    this.scrolledUnderElevation,
    this.backgroundColor,
    this.foregroundColor,
    this.expandedHeight,
    this.flexibleSpace,
    this.pinned = false,
    this.snap = false,
    this.floating = false,
  });

  final Widget? title;
  final Widget? leading;
  final List<Widget>? actions;
  final bool centerTitle;
  final double elevation;
  final double? scrolledUnderElevation;
  final Color? backgroundColor;
  final Color? foregroundColor;
  final double? expandedHeight;
  final Widget? flexibleSpace;
  final bool pinned;
  final bool snap;
  final bool floating;

  @override
  Widget build(BuildContext context, WidgetRef ref) {
    final locale = Localizations.localeOf(context);
    final isRtl = locale.languageCode == 'ar';

    return Directionality(
      textDirection: isRtl ? TextDirection.rtl : TextDirection.ltr,
      child: SliverAppBar(
        title: title,
        leading: leading,
        actions: actions,
        centerTitle: centerTitle,
        elevation: elevation,
        scrolledUnderElevation: scrolledUnderElevation,
        backgroundColor: backgroundColor,
        foregroundColor: foregroundColor,
        expandedHeight: expandedHeight,
        flexibleSpace: flexibleSpace,
        pinned: pinned,
        snap: snap,
        floating: floating,
      ),
    );
  }
}

extension LocaleExtension on BuildContext {
  bool get isRtl => Localizations.localeOf(this).languageCode == 'ar';
  String get currentLanguage => Localizations.localeOf(this).languageCode;
  AppLocalizations get l10n => AppLocalizations.of(this)!;
}

extension TextDirectionExtension on String {
  TextDirection get textDirection => this == 'ar' ? TextDirection.rtl : TextDirection.ltr;
}
