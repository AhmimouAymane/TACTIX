import 'package:tactix/core/models/gameweek.dart';

sealed class GameweeksState {
  const GameweeksState();
}

class GameweeksInitial extends GameweeksState {
  const GameweeksInitial();
}

class GameweeksLoading extends GameweeksState {
  const GameweeksLoading();
}

class GameweeksData extends GameweeksState {
  const GameweeksData(this.gameweeks);

  final List<Gameweek> gameweeks;
}

class GameweeksError extends GameweeksState {
  const GameweeksError(this.message);

  final String message;
}