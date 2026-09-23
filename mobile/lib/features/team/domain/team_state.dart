import 'package:tactix/core/models/catalog_player.dart';
import 'package:tactix/core/models/fantasy_team.dart';

sealed class TeamState {
  const TeamState();
}

class TeamInitial extends TeamState {
  const TeamInitial();
}

class TeamLoading extends TeamState {
  const TeamLoading();
}

/// Authenticated user without a team yet.
class TeamEmpty extends TeamState {
  const TeamEmpty();
}

/// Not signed in (backend answered 401).
class TeamUnauthenticated extends TeamState {
  const TeamUnauthenticated();
}

class TeamData extends TeamState {
  const TeamData(this.team);

  final FantasyTeam team;
}

class TeamError extends TeamState {
  const TeamError(this.message);

  final String message;
}

sealed class PlayersState {
  const PlayersState();
}

class PlayersInitial extends PlayersState {
  const PlayersInitial();
}

class PlayersLoading extends PlayersState {
  const PlayersLoading();
}

class PlayersData extends PlayersState {
  const PlayersData({
    required this.players,
    required this.total,
    required this.page,
    required this.hasMore,
  });

  final List<CatalogPlayer> players;
  final int total;
  final int page;
  final bool hasMore;
}

class PlayersError extends PlayersState {
  const PlayersError(this.message);

  final String message;
}
