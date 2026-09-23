import 'dart:async';

import 'package:flutter/foundation.dart';
import 'package:flutter/widgets.dart';
import 'package:flutter_localizations/flutter_localizations.dart';
import 'package:intl/intl.dart' as intl;

import 'app_localizations_ar.dart';
import 'app_localizations_en.dart';
import 'app_localizations_fr.dart';

// ignore_for_file: type=lint

/// Callers can lookup localized strings with an instance of AppLocalizations
/// returned by `AppLocalizations.of(context)`.
///
/// Applications need to include `AppLocalizations.delegate()` in their app's
/// `localizationDelegates` list, and the locales they support in the app's
/// `supportedLocales` list. For example:
///
/// ```dart
/// import 'l10n/app_localizations.dart';
///
/// return MaterialApp(
///   localizationsDelegates: AppLocalizations.localizationsDelegates,
///   supportedLocales: AppLocalizations.supportedLocales,
///   home: MyApplicationHome(),
/// );
/// ```
///
/// ## Update pubspec.yaml
///
/// Please make sure to update your pubspec.yaml to include the following
/// packages:
///
/// ```yaml
/// dependencies:
///   # Internationalization support.
///   flutter_localizations:
///     sdk: flutter
///   intl: any # Use the pinned version from flutter_localizations
///
///   # Rest of dependencies
/// ```
///
/// ## iOS Applications
///
/// iOS applications define key application metadata, including supported
/// locales, in an Info.plist file that is built into the application bundle.
/// To configure the locales supported by your app, you’ll need to edit this
/// file.
///
/// First, open your project’s ios/Runner.xcworkspace Xcode workspace file.
/// Then, in the Project Navigator, open the Info.plist file under the Runner
/// project’s Runner folder.
///
/// Next, select the Information Property List item, select Add Item from the
/// Editor menu, then select Localizations from the pop-up menu.
///
/// Select and expand the newly-created Localizations item then, for each
/// locale your application supports, add a new item and select the locale
/// you wish to add from the pop-up menu in the Value field. This list should
/// be consistent with the languages listed in the AppLocalizations.supportedLocales
/// property.
abstract class AppLocalizations {
  AppLocalizations(String locale)
      : localeName = intl.Intl.canonicalizedLocale(locale.toString());

  final String localeName;

  static AppLocalizations of(BuildContext context) {
    return Localizations.of<AppLocalizations>(context, AppLocalizations)!;
  }

  static const LocalizationsDelegate<AppLocalizations> delegate =
      _AppLocalizationsDelegate();

  /// A list of this localizations delegate along with the default localizations
  /// delegates.
  ///
  /// Returns a list of localizations delegates containing this delegate along with
  /// GlobalMaterialLocalizations.delegate, GlobalCupertinoLocalizations.delegate,
  /// and GlobalWidgetsLocalizations.delegate.
  ///
  /// Additional delegates can be added by appending to this list in
  /// MaterialApp. This list does not have to be used at all if a custom list
  /// of delegates is preferred or required.
  static const List<LocalizationsDelegate<dynamic>> localizationsDelegates =
      <LocalizationsDelegate<dynamic>>[
    delegate,
    GlobalMaterialLocalizations.delegate,
    GlobalCupertinoLocalizations.delegate,
    GlobalWidgetsLocalizations.delegate,
  ];

  /// A list of this localizations delegate's supported locales.
  static const List<Locale> supportedLocales = <Locale>[
    Locale('ar'),
    Locale('en'),
    Locale('fr')
  ];

  /// No description provided for @appName.
  ///
  /// In en, this message translates to:
  /// **'TACTIX'**
  String get appName;

  /// No description provided for @loginSubtitle.
  ///
  /// In en, this message translates to:
  /// **'Sign in to your fantasy football account'**
  String get loginSubtitle;

  /// No description provided for @registerSubtitle.
  ///
  /// In en, this message translates to:
  /// **'Create your fantasy football account'**
  String get registerSubtitle;

  /// No description provided for @homeWelcome.
  ///
  /// In en, this message translates to:
  /// **'Welcome back!'**
  String get homeWelcome;

  /// No description provided for @homeSubtitle.
  ///
  /// In en, this message translates to:
  /// **'Manage your fantasy team and track live scores'**
  String get homeSubtitle;

  /// No description provided for @liveTitle.
  ///
  /// In en, this message translates to:
  /// **'Live Matches'**
  String get liveTitle;

  /// No description provided for @liveSubtitle.
  ///
  /// In en, this message translates to:
  /// **'Follow live scores and match events'**
  String get liveSubtitle;

  /// No description provided for @teamTitle.
  ///
  /// In en, this message translates to:
  /// **'My Team'**
  String get teamTitle;

  /// No description provided for @teamSubtitle.
  ///
  /// In en, this message translates to:
  /// **'Manage your fantasy squad'**
  String get teamSubtitle;

  /// No description provided for @leaguesTitle.
  ///
  /// In en, this message translates to:
  /// **'Leagues'**
  String get leaguesTitle;

  /// No description provided for @leaguesSubtitle.
  ///
  /// In en, this message translates to:
  /// **'Join or create fantasy leagues'**
  String get leaguesSubtitle;

  /// No description provided for @emailLabel.
  ///
  /// In en, this message translates to:
  /// **'Email'**
  String get emailLabel;

  /// No description provided for @emailHint.
  ///
  /// In en, this message translates to:
  /// **'you@example.com'**
  String get emailHint;

  /// No description provided for @emailRequired.
  ///
  /// In en, this message translates to:
  /// **'Email is required'**
  String get emailRequired;

  /// No description provided for @emailInvalid.
  ///
  /// In en, this message translates to:
  /// **'Enter a valid email address'**
  String get emailInvalid;

  /// No description provided for @passwordLabel.
  ///
  /// In en, this message translates to:
  /// **'Password'**
  String get passwordLabel;

  /// No description provided for @passwordHint.
  ///
  /// In en, this message translates to:
  /// **'Enter your password'**
  String get passwordHint;

  /// No description provided for @passwordRequired.
  ///
  /// In en, this message translates to:
  /// **'Password is required'**
  String get passwordRequired;

  /// No description provided for @passwordMinLength.
  ///
  /// In en, this message translates to:
  /// **'Password must be at least 6 characters'**
  String get passwordMinLength;

  /// No description provided for @confirmPasswordLabel.
  ///
  /// In en, this message translates to:
  /// **'Confirm Password'**
  String get confirmPasswordLabel;

  /// No description provided for @confirmPasswordHint.
  ///
  /// In en, this message translates to:
  /// **'Confirm your password'**
  String get confirmPasswordHint;

  /// No description provided for @confirmPasswordRequired.
  ///
  /// In en, this message translates to:
  /// **'Please confirm your password'**
  String get confirmPasswordRequired;

  /// No description provided for @passwordsDontMatch.
  ///
  /// In en, this message translates to:
  /// **'Passwords don\'t match'**
  String get passwordsDontMatch;

  /// No description provided for @nameLabel.
  ///
  /// In en, this message translates to:
  /// **'Full Name'**
  String get nameLabel;

  /// No description provided for @nameHint.
  ///
  /// In en, this message translates to:
  /// **'Enter your full name'**
  String get nameHint;

  /// No description provided for @nameRequired.
  ///
  /// In en, this message translates to:
  /// **'Name is required'**
  String get nameRequired;

  /// No description provided for @nameMinLength.
  ///
  /// In en, this message translates to:
  /// **'Name must be at least 2 characters'**
  String get nameMinLength;

  /// No description provided for @forgotPassword.
  ///
  /// In en, this message translates to:
  /// **'Forgot Password?'**
  String get forgotPassword;

  /// No description provided for @dontHaveAccount.
  ///
  /// In en, this message translates to:
  /// **'Don\'t have an account? '**
  String get dontHaveAccount;

  /// No description provided for @alreadyHaveAccount.
  ///
  /// In en, this message translates to:
  /// **'Already have an account? '**
  String get alreadyHaveAccount;

  /// No description provided for @login.
  ///
  /// In en, this message translates to:
  /// **'Sign In'**
  String get login;

  /// No description provided for @register.
  ///
  /// In en, this message translates to:
  /// **'Sign Up'**
  String get register;

  /// No description provided for @signOut.
  ///
  /// In en, this message translates to:
  /// **'Sign Out'**
  String get signOut;

  /// No description provided for @comingSoon.
  ///
  /// In en, this message translates to:
  /// **'Coming Soon'**
  String get comingSoon;

  /// No description provided for @noTeamTitle.
  ///
  /// In en, this message translates to:
  /// **'No team yet'**
  String get noTeamTitle;

  /// No description provided for @noTeamSubtitle.
  ///
  /// In en, this message translates to:
  /// **'Create your fantasy team to start playing'**
  String get noTeamSubtitle;

  /// No description provided for @teamNameLabel.
  ///
  /// In en, this message translates to:
  /// **'Team name'**
  String get teamNameLabel;

  /// No description provided for @createTeam.
  ///
  /// In en, this message translates to:
  /// **'Create team'**
  String get createTeam;

  /// No description provided for @mySquad.
  ///
  /// In en, this message translates to:
  /// **'My squad'**
  String get mySquad;

  /// No description provided for @budget.
  ///
  /// In en, this message translates to:
  /// **'Budget'**
  String get budget;

  /// No description provided for @squadValue.
  ///
  /// In en, this message translates to:
  /// **'Squad value'**
  String get squadValue;

  /// No description provided for @points.
  ///
  /// In en, this message translates to:
  /// **'Points'**
  String get points;

  /// No description provided for @pickPlayer.
  ///
  /// In en, this message translates to:
  /// **'Pick player'**
  String get pickPlayer;

  /// No description provided for @searchPlayers.
  ///
  /// In en, this message translates to:
  /// **'Search players'**
  String get searchPlayers;

  /// No description provided for @saveSquad.
  ///
  /// In en, this message translates to:
  /// **'Save squad'**
  String get saveSquad;

  /// No description provided for @squadSaved.
  ///
  /// In en, this message translates to:
  /// **'Squad saved'**
  String get squadSaved;

  /// No description provided for @captain.
  ///
  /// In en, this message translates to:
  /// **'Captain'**
  String get captain;

  /// No description provided for @viceCaptain.
  ///
  /// In en, this message translates to:
  /// **'Vice-captain'**
  String get viceCaptain;

  /// No description provided for @emptySlot.
  ///
  /// In en, this message translates to:
  /// **'Empty'**
  String get emptySlot;

  /// No description provided for @removeFromSquad.
  ///
  /// In en, this message translates to:
  /// **'Remove'**
  String get removeFromSquad;

  /// No description provided for @editSquad.
  ///
  /// In en, this message translates to:
  /// **'Edit squad'**
  String get editSquad;

  /// No description provided for @squadFull.
  ///
  /// In en, this message translates to:
  /// **'Squad is full (15 players)'**
  String get squadFull;

  /// No description provided for @signInToPlay.
  ///
  /// In en, this message translates to:
  /// **'Sign in to manage your team'**
  String get signInToPlay;

  /// No description provided for @loadMore.
  ///
  /// In en, this message translates to:
  /// **'Load more'**
  String get loadMore;

  /// No description provided for @viewPitch.
  ///
  /// In en, this message translates to:
  /// **'Pitch'**
  String get viewPitch;

  /// No description provided for @viewList.
  ///
  /// In en, this message translates to:
  /// **'List'**
  String get viewList;

  /// No description provided for @benchTitle.
  ///
  /// In en, this message translates to:
  /// **'Bench'**
  String get benchTitle;

  /// No description provided for @homeComingSoonDesc.
  ///
  /// In en, this message translates to:
  /// **'Home screen with live matches, deadlines, and news will be available soon.'**
  String get homeComingSoonDesc;

  /// No description provided for @liveComingSoonDesc.
  ///
  /// In en, this message translates to:
  /// **'Live match tracking with real-time updates will be available soon.'**
  String get liveComingSoonDesc;

  /// No description provided for @teamComingSoonDesc.
  ///
  /// In en, this message translates to:
  /// **'Fantasy squad management with pitch view will be available soon.'**
  String get teamComingSoonDesc;

  /// No description provided for @leaguesComingSoonDesc.
  ///
  /// In en, this message translates to:
  /// **'League creation and management will be available soon.'**
  String get leaguesComingSoonDesc;

  /// No description provided for @profileComingSoonDesc.
  ///
  /// In en, this message translates to:
  /// **'Profile settings and preferences will be available soon.'**
  String get profileComingSoonDesc;

  /// No description provided for @navHome.
  ///
  /// In en, this message translates to:
  /// **'Home'**
  String get navHome;

  /// No description provided for @navLive.
  ///
  /// In en, this message translates to:
  /// **'Live'**
  String get navLive;

  /// No description provided for @navTeam.
  ///
  /// In en, this message translates to:
  /// **'Team'**
  String get navTeam;

  /// No description provided for @navLeagues.
  ///
  /// In en, this message translates to:
  /// **'Leagues'**
  String get navLeagues;

  /// No description provided for @navProfile.
  ///
  /// In en, this message translates to:
  /// **'Profile'**
  String get navProfile;

  /// No description provided for @guestUser.
  ///
  /// In en, this message translates to:
  /// **'Guest User'**
  String get guestUser;

  /// No description provided for @loggedIn.
  ///
  /// In en, this message translates to:
  /// **'Logged in'**
  String get loggedIn;

  /// No description provided for @notLoggedIn.
  ///
  /// In en, this message translates to:
  /// **'Not logged in'**
  String get notLoggedIn;

  /// No description provided for @language.
  ///
  /// In en, this message translates to:
  /// **'Language'**
  String get language;

  /// No description provided for @languageDesc.
  ///
  /// In en, this message translates to:
  /// **'Choose your preferred language'**
  String get languageDesc;

  /// No description provided for @theme.
  ///
  /// In en, this message translates to:
  /// **'Theme'**
  String get theme;

  /// No description provided for @themeDesc.
  ///
  /// In en, this message translates to:
  /// **'Choose your preferred theme'**
  String get themeDesc;

  /// No description provided for @notifications.
  ///
  /// In en, this message translates to:
  /// **'Notifications'**
  String get notifications;

  /// No description provided for @notificationsDesc.
  ///
  /// In en, this message translates to:
  /// **'Manage notification preferences'**
  String get notificationsDesc;

  /// No description provided for @retry.
  ///
  /// In en, this message translates to:
  /// **'Retry'**
  String get retry;

  /// No description provided for @errorLoading.
  ///
  /// In en, this message translates to:
  /// **'Couldn\'t load data'**
  String get errorLoading;

  /// No description provided for @emptyState.
  ///
  /// In en, this message translates to:
  /// **'Nothing here yet'**
  String get emptyState;

  /// No description provided for @gameweek.
  ///
  /// In en, this message translates to:
  /// **'Gameweek'**
  String get gameweek;

  /// No description provided for @gameweekNumber.
  ///
  /// In en, this message translates to:
  /// **'Gameweek {number}'**
  String gameweekNumber(String number);

  /// No description provided for @currentGameweek.
  ///
  /// In en, this message translates to:
  /// **'Current Gameweek'**
  String get currentGameweek;

  /// No description provided for @upcomingFixtures.
  ///
  /// In en, this message translates to:
  /// **'Upcoming fixtures'**
  String get upcomingFixtures;

  /// No description provided for @deadline.
  ///
  /// In en, this message translates to:
  /// **'Deadline'**
  String get deadline;

  /// No description provided for @viewAll.
  ///
  /// In en, this message translates to:
  /// **'View all'**
  String get viewAll;

  /// No description provided for @kickoff.
  ///
  /// In en, this message translates to:
  /// **'Kickoff'**
  String get kickoff;

  /// No description provided for @matchEvents.
  ///
  /// In en, this message translates to:
  /// **'Match events'**
  String get matchEvents;

  /// No description provided for @noFixtures.
  ///
  /// In en, this message translates to:
  /// **'No fixtures to show'**
  String get noFixtures;

  /// No description provided for @noEvents.
  ///
  /// In en, this message translates to:
  /// **'No match events yet'**
  String get noEvents;

  /// No description provided for @timelineTitle.
  ///
  /// In en, this message translates to:
  /// **'Key moments'**
  String get timelineTitle;

  /// No description provided for @noKeyEvents.
  ///
  /// In en, this message translates to:
  /// **'No key moments yet'**
  String get noKeyEvents;

  /// No description provided for @topPerformers.
  ///
  /// In en, this message translates to:
  /// **'Top performers'**
  String get topPerformers;

  /// No description provided for @fixturesCount.
  ///
  /// In en, this message translates to:
  /// **'{count, plural, =1{1 fixture} other{{count} fixtures}}'**
  String fixturesCount(int count);

  /// No description provided for @goalsCount.
  ///
  /// In en, this message translates to:
  /// **'{count, plural, =1{1 goal} other{{count} goals}}'**
  String goalsCount(int count);

  /// No description provided for @assistsCount.
  ///
  /// In en, this message translates to:
  /// **'{count, plural, =1{1 assist} other{{count} assists}}'**
  String assistsCount(int count);

  /// No description provided for @savesCount.
  ///
  /// In en, this message translates to:
  /// **'{count, plural, =1{1 save} other{{count} saves}}'**
  String savesCount(int count);

  /// No description provided for @statusAll.
  ///
  /// In en, this message translates to:
  /// **'All'**
  String get statusAll;

  /// No description provided for @statusScheduled.
  ///
  /// In en, this message translates to:
  /// **'Scheduled'**
  String get statusScheduled;

  /// No description provided for @statusLive.
  ///
  /// In en, this message translates to:
  /// **'Live'**
  String get statusLive;

  /// No description provided for @statusFinished.
  ///
  /// In en, this message translates to:
  /// **'Finished'**
  String get statusFinished;

  /// No description provided for @statusPostponed.
  ///
  /// In en, this message translates to:
  /// **'Postponed'**
  String get statusPostponed;

  /// No description provided for @statusCancelled.
  ///
  /// In en, this message translates to:
  /// **'Cancelled'**
  String get statusCancelled;
}

class _AppLocalizationsDelegate
    extends LocalizationsDelegate<AppLocalizations> {
  const _AppLocalizationsDelegate();

  @override
  Future<AppLocalizations> load(Locale locale) {
    return SynchronousFuture<AppLocalizations>(lookupAppLocalizations(locale));
  }

  @override
  bool isSupported(Locale locale) =>
      <String>['ar', 'en', 'fr'].contains(locale.languageCode);

  @override
  bool shouldReload(_AppLocalizationsDelegate old) => false;
}

AppLocalizations lookupAppLocalizations(Locale locale) {
  // Lookup logic when only language code is specified.
  switch (locale.languageCode) {
    case 'ar':
      return AppLocalizationsAr();
    case 'en':
      return AppLocalizationsEn();
    case 'fr':
      return AppLocalizationsFr();
  }

  throw FlutterError(
      'AppLocalizations.delegate failed to load unsupported locale "$locale". This is likely '
      'an issue with the localizations generation tool. Please file an issue '
      'on GitHub with a reproducible sample app and the gen-l10n configuration '
      'that was used.');
}
