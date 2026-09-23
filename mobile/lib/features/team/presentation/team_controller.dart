import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:tactix/core/models/catalog_player.dart';
import 'package:tactix/core/models/fantasy_team.dart';
import 'package:tactix/core/network/dio_client.dart';

import '../domain/team_state.dart';

class TeamController extends StateNotifier<TeamState> {
  TeamController(this._dioClient) : super(const TeamInitial());

  final DioClient _dioClient;

  Future<void> loadMyTeam() async {
    state = const TeamLoading();
    try {
      final response = await _dioClient.dio.get<dynamic>('/teams/my');
      if (response.statusCode == 200 &&
          response.data is Map<String, dynamic>) {
        state = TeamData(
          FantasyTeam.fromJson(response.data as Map<String, dynamic>),
        );
        return;
      }
      // NOTE: Dio validateStatus passes 4xx as normal responses.
      state = _stateForStatus(response.statusCode, response.data);
    } on DioException catch (e) {
      state = TeamError(
        e.message ?? 'Network error occurred',
      );
    } catch (e) {
      state = TeamError(e.toString());
    }
  }

  Future<bool> createTeam(String name) async {
    state = const TeamLoading();
    try {
      final response = await _dioClient.dio.post<dynamic>(
        '/teams',
        data: {'name': name.trim()},
      );
      if ((response.statusCode == 200 || response.statusCode == 201) &&
          response.data is Map<String, dynamic>) {
        state = TeamData(
          FantasyTeam.fromJson(response.data as Map<String, dynamic>),
        );
        return true;
      }
      state = _stateForStatus(response.statusCode, response.data);
      return false;
    } on DioException catch (e) {
      state = TeamError(e.message ?? 'Network error occurred');
      return false;
    } catch (e) {
      state = TeamError(e.toString());
      return false;
    }
  }

  /// Persists squad slots. Returns true on success and refreshes the team.
  Future<bool> saveSquad(List<Map<String, dynamic>> slots) async {
    try {
      final response = await _dioClient.dio.put<dynamic>(
        '/teams/my/squad',
        data: {'slots': slots},
      );
      if (response.statusCode == 200 &&
          response.data is Map<String, dynamic>) {
        state = TeamData(
          FantasyTeam.fromJson(response.data as Map<String, dynamic>),
        );
        return true;
      }
      return false;
    } on DioException {
      return false;
    } catch (_) {
      return false;
    }
  }

  TeamState _stateForStatus(int? statusCode, dynamic data) {
    if (statusCode == 401) return const TeamUnauthenticated();
    if (statusCode == 404) return const TeamEmpty();
    return TeamError(_messageOf(data) ?? 'Request failed');
  }

  String? _messageOf(dynamic data) {
    if (data is! Map<String, dynamic>) return null;
    if (data['message'] is String) return data['message'] as String;
    final error = data['error'];
    if (error is Map<String, dynamic> && error['message'] is String) {
      return error['message'] as String;
    }
    return null;
  }
}

class PlayersController extends StateNotifier<PlayersState> {
  PlayersController(this._dioClient) : super(const PlayersInitial());

  final DioClient _dioClient;

  String? _search;
  String? _position;
  String? _clubId;

  Future<void> load({
    String? search,
    String? position,
    String? clubId,
    bool append = false,
  }) async {
    if (!append) {
      _search = search;
      _position = position;
      _clubId = clubId;
      state = const PlayersLoading();
    }

    final current = state;
    final page = append && current is PlayersData ? current.page + 1 : 1;

    try {
      final response = await _dioClient.dio.get<dynamic>(
        '/players',
        queryParameters: {
          'page': page,
          'limit': 50,
          if ((_search ?? '').isNotEmpty) 'search': _search,
          if ((_position ?? '').isNotEmpty) 'position': _position,
          if ((_clubId ?? '').isNotEmpty) 'clubId': _clubId,
        },
      );

      if (response.statusCode == 200 && response.data is Map<String, dynamic>) {
        final body = response.data as Map<String, dynamic>;
        final items = body['items'];
        final players = items is List
            ? items
                .whereType<Map<String, dynamic>>()
                .map(CatalogPlayer.fromJson)
                .toList()
            : <CatalogPlayer>[];
        final total = (body['total'] as num?)?.toInt() ?? players.length;
        final previous =
            append && current is PlayersData ? current.players : <CatalogPlayer>[];
        state = PlayersData(
          players: [...previous, ...players],
          total: total,
          page: page,
          hasMore: total > page * 50,
        );
        return;
      }
      state = const PlayersError('Failed to load players');
    } on DioException catch (e) {
      if (!append) {
        state = PlayersError(e.message ?? 'Network error occurred');
      }
    } catch (e) {
      if (!append) state = PlayersError(e.toString());
    }
  }
}

final teamControllerProvider =
    StateNotifierProvider<TeamController, TeamState>((ref) {
  final dioClient = ref.watch(dioClientProvider);
  return TeamController(dioClient);
});

final playersControllerProvider =
    StateNotifierProvider<PlayersController, PlayersState>((ref) {
  final dioClient = ref.watch(dioClientProvider);
  return PlayersController(dioClient);
});
