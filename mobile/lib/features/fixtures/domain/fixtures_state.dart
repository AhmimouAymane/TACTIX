import 'package:tactix/core/models/fixture.dart';

sealed class FixturesState {
  const FixturesState();
}

class FixturesInitial extends FixturesState {
  const FixturesInitial();
}

class FixturesLoading extends FixturesState {
  const FixturesLoading();
}

class FixturesData extends FixturesState {
  const FixturesData(this.fixtures);

  final List<Fixture> fixtures;
}

class FixturesError extends FixturesState {
  const FixturesError(this.message);

  final String message;
}

sealed class FixtureDetailState {
  const FixtureDetailState();
}

class FixtureDetailIdle extends FixtureDetailState {
  const FixtureDetailIdle();
}

class FixtureDetailLoading extends FixtureDetailState {
  const FixtureDetailLoading();
}

class FixtureDetailData extends FixtureDetailState {
  const FixtureDetailData(this.fixture);

  final Fixture fixture;
}

class FixtureDetailError extends FixtureDetailState {
  const FixtureDetailError(this.message);

  final String message;
}