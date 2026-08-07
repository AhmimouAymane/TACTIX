import 'package:flutter_test/flutter_test.dart';
import 'package:tactix/core/routes/route_names.dart';

void main() {
  group('AppRoutes', () {
    test('root route is /', () {
      expect(AppRoutes.root, equals('/'));
    });

    test('home route is /home', () {
      expect(AppRoutes.home, equals('/home'));
    });

    test('live route is /live', () {
      expect(AppRoutes.live, equals('/live'));
    });

    test('team route is /team', () {
      expect(AppRoutes.team, equals('/team'));
    });

    test('leagues route is /leagues', () {
      expect(AppRoutes.leagues, equals('/leagues'));
    });

    test('profile route is /profile', () {
      expect(AppRoutes.profile, equals('/profile'));
    });

    test('login route is /auth/login', () {
      expect(AppRoutes.login, equals('/auth/login'));
    });

    test('register route is /auth/register', () {
      expect(AppRoutes.register, equals('/auth/register'));
    });
  });

  group('RouteNames', () {
    test('home name is home', () {
      expect(RouteNames.home, equals('home'));
    });

    test('live name is live', () {
      expect(RouteNames.live, equals('live'));
    });

    test('team name is team', () {
      expect(RouteNames.team, equals('team'));
    });

    test('leagues name is leagues', () {
      expect(RouteNames.leagues, equals('leagues'));
    });

    test('profile name is profile', () {
      expect(RouteNames.profile, equals('profile'));
    });

    test('login name is login', () {
      expect(RouteNames.login, equals('login'));
    });

    test('register name is register', () {
      expect(RouteNames.register, equals('register'));
    });
  });
}