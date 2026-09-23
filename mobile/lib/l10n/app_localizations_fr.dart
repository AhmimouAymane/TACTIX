// ignore: unused_import
import 'package:intl/intl.dart' as intl;
import 'app_localizations.dart';

// ignore_for_file: type=lint

/// The translations for French (`fr`).
class AppLocalizationsFr extends AppLocalizations {
  AppLocalizationsFr([String locale = 'fr']) : super(locale);

  @override
  String get appName => 'TACTIX';

  @override
  String get loginSubtitle => 'Connectez-vous à votre compte football fantasy';

  @override
  String get registerSubtitle => 'Créez votre compte football fantasy';

  @override
  String get homeWelcome => 'Bienvenue !';

  @override
  String get homeSubtitle =>
      'Gérez votre équipe fantasy et suivez les scores en direct';

  @override
  String get liveTitle => 'Matchs en Direct';

  @override
  String get liveSubtitle =>
      'Suivez les scores en direct et les événements des matchs';

  @override
  String get teamTitle => 'Mon Équipe';

  @override
  String get teamSubtitle => 'Gérez votre effectif fantasy';

  @override
  String get leaguesTitle => 'Ligues';

  @override
  String get leaguesSubtitle => 'Rejoignez ou créez des ligues fantasy';

  @override
  String get emailLabel => 'E-mail';

  @override
  String get emailHint => 'vous@exemple.com';

  @override
  String get emailRequired => 'L\'e-mail est requis';

  @override
  String get emailInvalid => 'Entrez une adresse e-mail valide';

  @override
  String get passwordLabel => 'Mot de passe';

  @override
  String get passwordHint => 'Entrez votre mot de passe';

  @override
  String get passwordRequired => 'Le mot de passe est requis';

  @override
  String get passwordMinLength =>
      'Le mot de passe doit contenir au moins 6 caractères';

  @override
  String get confirmPasswordLabel => 'Confirmer le mot de passe';

  @override
  String get confirmPasswordHint => 'Confirmez votre mot de passe';

  @override
  String get confirmPasswordRequired => 'Veuillez confirmer votre mot de passe';

  @override
  String get passwordsDontMatch => 'Les mots de passe ne correspondent pas';

  @override
  String get nameLabel => 'Nom complet';

  @override
  String get nameHint => 'Entrez votre nom complet';

  @override
  String get nameRequired => 'Le nom est requis';

  @override
  String get nameMinLength => 'Le nom doit contenir au moins 2 caractères';

  @override
  String get forgotPassword => 'Mot de passe oublié ?';

  @override
  String get dontHaveAccount => 'Pas encore de compte ? ';

  @override
  String get alreadyHaveAccount => 'Déjà un compte ? ';

  @override
  String get login => 'Se connecter';

  @override
  String get register => 'S\'inscrire';

  @override
  String get signOut => 'Se déconnecter';

  @override
  String get comingSoon => 'Bientôt disponible';

  @override
  String get noTeamTitle => 'Pas encore d\'équipe';

  @override
  String get noTeamSubtitle => 'Créez votre équipe fantasy pour commencer';

  @override
  String get teamNameLabel => 'Nom de l\'équipe';

  @override
  String get createTeam => 'Créer l\'équipe';

  @override
  String get mySquad => 'Mon effectif';

  @override
  String get budget => 'Budget';

  @override
  String get squadValue => 'Valeur de l\'effectif';

  @override
  String get points => 'Points';

  @override
  String get pickPlayer => 'Choisir un joueur';

  @override
  String get searchPlayers => 'Rechercher des joueurs';

  @override
  String get saveSquad => 'Enregistrer';

  @override
  String get squadSaved => 'Effectif enregistré';

  @override
  String get captain => 'Capitaine';

  @override
  String get viceCaptain => 'Vice-capitaine';

  @override
  String get emptySlot => 'Vide';

  @override
  String get removeFromSquad => 'Retirer';

  @override
  String get editSquad => 'Modifier';

  @override
  String get squadFull => 'Effectif complet (15 joueurs)';

  @override
  String get signInToPlay => 'Connectez-vous pour gérer votre équipe';

  @override
  String get loadMore => 'Charger plus';

  @override
  String get viewPitch => 'Terrain';

  @override
  String get viewList => 'Liste';

  @override
  String get benchTitle => 'Banc';

  @override
  String get homeComingSoonDesc =>
      'L\'écran d\'accueil avec les matchs en direct, échéances et actualités sera bientôt disponible.';

  @override
  String get liveComingSoonDesc =>
      'Le suivi des matchs en direct avec mises à jour temps réel sera bientôt disponible.';

  @override
  String get teamComingSoonDesc =>
      'La gestion d\'effectif fantasy avec vue terrain sera bientôt disponible.';

  @override
  String get leaguesComingSoonDesc =>
      'La création et gestion de ligues sera bientôt disponible.';

  @override
  String get profileComingSoonDesc =>
      'Les paramètres de profil et préférences seront bientôt disponibles.';

  @override
  String get navHome => 'Accueil';

  @override
  String get navLive => 'En Direct';

  @override
  String get navTeam => 'Équipe';

  @override
  String get navLeagues => 'Ligues';

  @override
  String get navProfile => 'Profil';

  @override
  String get guestUser => 'Utilisateur invité';

  @override
  String get loggedIn => 'Connecté';

  @override
  String get notLoggedIn => 'Non connecté';

  @override
  String get language => 'Langue';

  @override
  String get languageDesc => 'Choisissez votre langue préférée';

  @override
  String get theme => 'Thème';

  @override
  String get themeDesc => 'Choisissez votre thème préféré';

  @override
  String get notifications => 'Notifications';

  @override
  String get notificationsDesc => 'Gérez vos préférences de notification';

  @override
  String get retry => 'Réessayer';

  @override
  String get errorLoading => 'Impossible de charger les données';

  @override
  String get emptyState => 'Rien pour le moment';

  @override
  String get gameweek => 'Journée';

  @override
  String gameweekNumber(String number) {
    return 'Journée $number';
  }

  @override
  String get currentGameweek => 'Journée en cours';

  @override
  String get upcomingFixtures => 'Matchs à venir';

  @override
  String get deadline => 'Date limite';

  @override
  String get viewAll => 'Tout voir';

  @override
  String get kickoff => 'Coup d\'envoi';

  @override
  String get matchEvents => 'Événements du match';

  @override
  String get noFixtures => 'Aucun match à afficher';

  @override
  String get noEvents => 'Aucun événement pour le moment';

  @override
  String get timelineTitle => 'Moments clés';

  @override
  String get noKeyEvents => 'Aucun moment clé pour le moment';

  @override
  String get topPerformers => 'Meilleurs joueurs';

  @override
  String fixturesCount(int count) {
    String _temp0 = intl.Intl.pluralLogic(
      count,
      locale: localeName,
      other: '$count matchs',
      one: '1 match',
      zero: 'Aucun match',
    );
    return '$_temp0';
  }

  @override
  String goalsCount(int count) {
    String _temp0 = intl.Intl.pluralLogic(
      count,
      locale: localeName,
      other: '$count buts',
      one: '1 but',
      zero: 'Aucun but',
    );
    return '$_temp0';
  }

  @override
  String assistsCount(int count) {
    String _temp0 = intl.Intl.pluralLogic(
      count,
      locale: localeName,
      other: '$count passes décisives',
      one: '1 passe décisive',
      zero: 'Aucune passe décisive',
    );
    return '$_temp0';
  }

  @override
  String savesCount(int count) {
    String _temp0 = intl.Intl.pluralLogic(
      count,
      locale: localeName,
      other: '$count arrêts',
      one: '1 arrêt',
      zero: 'Aucun arrêt',
    );
    return '$_temp0';
  }

  @override
  String get statusAll => 'Toutes';

  @override
  String get statusScheduled => 'Programmée';

  @override
  String get statusLive => 'En direct';

  @override
  String get statusFinished => 'Terminée';

  @override
  String get statusPostponed => 'Reportée';

  @override
  String get statusCancelled => 'Annulée';
}
