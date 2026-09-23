// ignore: unused_import
import 'package:intl/intl.dart' as intl;
import 'app_localizations.dart';

// ignore_for_file: type=lint

/// The translations for English (`en`).
class AppLocalizationsEn extends AppLocalizations {
  AppLocalizationsEn([String locale = 'en']) : super(locale);

  @override
  String get appName => 'TACTIX';

  @override
  String get loginSubtitle => 'Sign in to your fantasy football account';

  @override
  String get registerSubtitle => 'Create your fantasy football account';

  @override
  String get homeWelcome => 'Welcome back!';

  @override
  String get homeSubtitle => 'Manage your fantasy team and track live scores';

  @override
  String get liveTitle => 'Live Matches';

  @override
  String get liveSubtitle => 'Follow live scores and match events';

  @override
  String get teamTitle => 'My Team';

  @override
  String get teamSubtitle => 'Manage your fantasy squad';

  @override
  String get leaguesTitle => 'Leagues';

  @override
  String get leaguesSubtitle => 'Join or create fantasy leagues';

  @override
  String get emailLabel => 'Email';

  @override
  String get emailHint => 'you@example.com';

  @override
  String get emailRequired => 'Email is required';

  @override
  String get emailInvalid => 'Enter a valid email address';

  @override
  String get passwordLabel => 'Password';

  @override
  String get passwordHint => 'Enter your password';

  @override
  String get passwordRequired => 'Password is required';

  @override
  String get passwordMinLength => 'Password must be at least 6 characters';

  @override
  String get confirmPasswordLabel => 'Confirm Password';

  @override
  String get confirmPasswordHint => 'Confirm your password';

  @override
  String get confirmPasswordRequired => 'Please confirm your password';

  @override
  String get passwordsDontMatch => 'Passwords don\'t match';

  @override
  String get nameLabel => 'Full Name';

  @override
  String get nameHint => 'Enter your full name';

  @override
  String get nameRequired => 'Name is required';

  @override
  String get nameMinLength => 'Name must be at least 2 characters';

  @override
  String get forgotPassword => 'Forgot Password?';

  @override
  String get dontHaveAccount => 'Don\'t have an account? ';

  @override
  String get alreadyHaveAccount => 'Already have an account? ';

  @override
  String get login => 'Sign In';

  @override
  String get register => 'Sign Up';

  @override
  String get signOut => 'Sign Out';

  @override
  String get comingSoon => 'Coming Soon';

  @override
  String get noTeamTitle => 'No team yet';

  @override
  String get noTeamSubtitle => 'Create your fantasy team to start playing';

  @override
  String get teamNameLabel => 'Team name';

  @override
  String get createTeam => 'Create team';

  @override
  String get mySquad => 'My squad';

  @override
  String get budget => 'Budget';

  @override
  String get squadValue => 'Squad value';

  @override
  String get points => 'Points';

  @override
  String get pickPlayer => 'Pick player';

  @override
  String get searchPlayers => 'Search players';

  @override
  String get saveSquad => 'Save squad';

  @override
  String get squadSaved => 'Squad saved';

  @override
  String get captain => 'Captain';

  @override
  String get viceCaptain => 'Vice-captain';

  @override
  String get emptySlot => 'Empty';

  @override
  String get removeFromSquad => 'Remove';

  @override
  String get editSquad => 'Edit squad';

  @override
  String get squadFull => 'Squad is full (15 players)';

  @override
  String get signInToPlay => 'Sign in to manage your team';

  @override
  String get loadMore => 'Load more';

  @override
  String get viewPitch => 'Pitch';

  @override
  String get viewList => 'List';

  @override
  String get benchTitle => 'Bench';

  @override
  String get homeComingSoonDesc =>
      'Home screen with live matches, deadlines, and news will be available soon.';

  @override
  String get liveComingSoonDesc =>
      'Live match tracking with real-time updates will be available soon.';

  @override
  String get teamComingSoonDesc =>
      'Fantasy squad management with pitch view will be available soon.';

  @override
  String get leaguesComingSoonDesc =>
      'League creation and management will be available soon.';

  @override
  String get profileComingSoonDesc =>
      'Profile settings and preferences will be available soon.';

  @override
  String get navHome => 'Home';

  @override
  String get navLive => 'Live';

  @override
  String get navTeam => 'Team';

  @override
  String get navLeagues => 'Leagues';

  @override
  String get navProfile => 'Profile';

  @override
  String get guestUser => 'Guest User';

  @override
  String get loggedIn => 'Logged in';

  @override
  String get notLoggedIn => 'Not logged in';

  @override
  String get language => 'Language';

  @override
  String get languageDesc => 'Choose your preferred language';

  @override
  String get theme => 'Theme';

  @override
  String get themeDesc => 'Choose your preferred theme';

  @override
  String get notifications => 'Notifications';

  @override
  String get notificationsDesc => 'Manage notification preferences';

  @override
  String get retry => 'Retry';

  @override
  String get errorLoading => 'Couldn\'t load data';

  @override
  String get emptyState => 'Nothing here yet';

  @override
  String get gameweek => 'Gameweek';

  @override
  String gameweekNumber(String number) {
    return 'Gameweek $number';
  }

  @override
  String get currentGameweek => 'Current Gameweek';

  @override
  String get upcomingFixtures => 'Upcoming fixtures';

  @override
  String get deadline => 'Deadline';

  @override
  String get viewAll => 'View all';

  @override
  String get kickoff => 'Kickoff';

  @override
  String get matchEvents => 'Match events';

  @override
  String get noFixtures => 'No fixtures to show';

  @override
  String get noEvents => 'No match events yet';

  @override
  String get timelineTitle => 'Key moments';

  @override
  String get noKeyEvents => 'No key moments yet';

  @override
  String get topPerformers => 'Top performers';

  @override
  String fixturesCount(int count) {
    String _temp0 = intl.Intl.pluralLogic(
      count,
      locale: localeName,
      other: '$count fixtures',
      one: '1 fixture',
    );
    return '$_temp0';
  }

  @override
  String goalsCount(int count) {
    String _temp0 = intl.Intl.pluralLogic(
      count,
      locale: localeName,
      other: '$count goals',
      one: '1 goal',
    );
    return '$_temp0';
  }

  @override
  String assistsCount(int count) {
    String _temp0 = intl.Intl.pluralLogic(
      count,
      locale: localeName,
      other: '$count assists',
      one: '1 assist',
    );
    return '$_temp0';
  }

  @override
  String savesCount(int count) {
    String _temp0 = intl.Intl.pluralLogic(
      count,
      locale: localeName,
      other: '$count saves',
      one: '1 save',
    );
    return '$_temp0';
  }

  @override
  String get statusAll => 'All';

  @override
  String get statusScheduled => 'Scheduled';

  @override
  String get statusLive => 'Live';

  @override
  String get statusFinished => 'Finished';

  @override
  String get statusPostponed => 'Postponed';

  @override
  String get statusCancelled => 'Cancelled';
}
