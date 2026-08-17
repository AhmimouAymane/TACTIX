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
}
