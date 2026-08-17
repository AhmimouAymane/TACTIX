import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:flutter_test/flutter_test.dart';
import 'package:integration_test/integration_test.dart';
import 'package:tactix/main.dart';
import 'package:tactix/l10n/app_localizations.dart';

Future<void> waitFor(WidgetTester tester, Finder finder,
    {Duration timeout = const Duration(seconds: 15)}) async {
  final end = DateTime.now().add(timeout);
  while (DateTime.now().isBefore(end)) {
    await tester.pump(const Duration(milliseconds: 250));
    if (finder.evaluate().isNotEmpty) return;
  }
  throw TestFailure('Timed out waiting for $finder');
}

Finder navLabel(String label) => find.descendant(
    of: find.byType(NavigationBar), matching: find.text(label));

void main() {
  IntegrationTestWidgetsFlutterBinding.ensureInitialized();

  testWidgets('register -> navigate -> logout -> login round trip',
      (tester) async {
    await tester.pumpWidget(const ProviderScope(child: TactixApp()));
    await tester.pump(const Duration(seconds: 1));

    await waitFor(tester, find.byType(NavigationBar));
    final l10n = AppLocalizations.of(
        tester.element(find.byType(NavigationBar)))!;

    final profileTab = l10n.navProfile;
    final homeWelcome = l10n.homeWelcome;
    final notLoggedIn = l10n.notLoggedIn;
    final signOutText = l10n.signOut;

    await tester.tap(navLabel(profileTab));
    await waitFor(tester,
        find.widgetWithText(FilledButton, l10n.login));

    await tester.tap(find.widgetWithText(OutlinedButton, l10n.register));
    await tester.pump(const Duration(seconds: 1));
    await waitFor(tester, find.byType(TextFormField).at(3));

    final suffix = DateTime.now().millisecondsSinceEpoch;
    final email = 'itest.$suffix@tactix.ma';
    const password = 'Password123!';

    await tester.enterText(find.byType(TextFormField).at(0), 'Tester');
    await tester.enterText(find.byType(TextFormField).at(1), email);
    await tester.enterText(find.byType(TextFormField).at(2), password);
    await tester.enterText(find.byType(TextFormField).at(3), password);
    await tester.pump(const Duration(milliseconds: 300));

    await tester.tap(find.widgetWithText(FilledButton, l10n.register));
    await waitFor(tester, find.text(homeWelcome));
    debugPrint('REGISTER_OK email=$email');

    await tester.tap(navLabel(profileTab));
    await waitFor(tester,
        find.widgetWithText(OutlinedButton, signOutText));
    expect(find.text(email), findsOneWidget);
    debugPrint('PROFILE_SHOWS_EMAIL_OK email=$email');

    await tester.tap(find.widgetWithText(OutlinedButton, signOutText));
    await waitFor(tester, find.text(notLoggedIn));
    debugPrint('LOGOUT_OK');

    await tester.tap(find.widgetWithText(FilledButton, l10n.login));
    await tester.pump(const Duration(seconds: 1));
    await waitFor(tester, find.byType(TextFormField).at(1));

    await tester.enterText(find.byType(TextFormField).at(0), email);
    await tester.enterText(find.byType(TextFormField).at(1), password);
    await tester.pump(const Duration(milliseconds: 300));

    await tester.tap(find.widgetWithText(FilledButton, l10n.login));
    await waitFor(tester, find.text(homeWelcome));
    debugPrint('LOGIN_OK email=$email');
  });
}