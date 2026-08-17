import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:tactix/core/models/gameweek.dart';
import 'package:tactix/core/network/dio_client.dart';

import '../domain/gameweeks_state.dart';

class GameweeksController extends StateNotifier<GameweeksState> {
  GameweeksController(this._dioClient) : super(const GameweeksInitial());

  final DioClient _dioClient;

  /// The active gameweek: OPEN or LIVE, falling back to the first available.
  Gameweek? get current {
    final state = this.state;
    if (state is! GameweeksData) return null;

    for (final gameweek in state.gameweeks) {
      if (gameweek.isCurrent) return gameweek;
    }
    return state.gameweeks.isEmpty ? null : state.gameweeks.first;
  }

  Future<void> load() async {
    state = const GameweeksLoading();

    try {
      final response = await _dioClient.dio.get<dynamic>('/gameweeks');

      if (response.statusCode == 200 && response.data is List) {
        final gameweeks = (response.data as List)
            .whereType<Map<String, dynamic>>()
            .map(Gameweek.fromJson)
            .toList();
        state = GameweeksData(gameweeks);
        return;
      }

      state = GameweeksError(
        response.data?['message'] as String? ?? 'Failed to load gameweeks',
      );
    } on DioException catch (e) {
      state = GameweeksError(
        e.response?.data?['message'] as String? ??
            e.message ??
            'Network error occurred',
      );
    } catch (e) {
      state = GameweeksError(e.toString());
    }
  }
}

final gameweeksControllerProvider =
    StateNotifierProvider<GameweeksController, GameweeksState>((ref) {
  final dioClient = ref.watch(dioClientProvider);
  return GameweeksController(dioClient);
});