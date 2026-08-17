import 'package:dio/dio.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:tactix/core/models/fixture.dart';
import 'package:tactix/core/network/dio_client.dart';

import '../domain/fixtures_state.dart';

class FixturesController extends StateNotifier<FixturesState> {
  FixturesController(this._dioClient) : super(const FixturesInitial());

  final DioClient _dioClient;

  String? _gameweekId;
  String? _status;

  Future<void> load({String? gameweekId, String? status}) async {
    _gameweekId = gameweekId ?? _gameweekId;
    _status = status ?? _status;
    state = const FixturesLoading();

    try {
      final response = await _dioClient.dio.get<dynamic>(
        '/fixtures',
        queryParameters: {
          if (_gameweekId != null) 'gameweekId': _gameweekId,
          if (_status != null) 'status': _status,
        },
      );

      if (response.statusCode == 200 && response.data is List) {
        final fixtures = (response.data as List)
            .whereType<Map<String, dynamic>>()
            .map(Fixture.fromJson)
            .toList();
        state = FixturesData(fixtures);
        return;
      }

      state = FixturesError(
        response.data?['message'] as String? ?? 'Failed to load fixtures',
      );
    } on DioException catch (e) {
      state = FixturesError(
        e.response?.data?['message'] as String? ??
            e.message ??
            'Network error occurred',
      );
    } catch (e) {
      state = FixturesError(e.toString());
    }
  }
}

class FixtureDetailController extends StateNotifier<FixtureDetailState> {
  FixtureDetailController(this._dioClient) : super(const FixtureDetailIdle());

  final DioClient _dioClient;

  Future<void> load(String fixtureId) async {
    state = const FixtureDetailLoading();

    try {
      final response = await _dioClient.dio.get<dynamic>('/fixtures/$fixtureId');

      if (response.statusCode == 200 && response.data is Map<String, dynamic>) {
        state = FixtureDetailData(
          Fixture.fromJson(response.data as Map<String, dynamic>),
        );
        return;
      }

      state = FixtureDetailError(
        response.data?['message'] as String? ?? 'Failed to load fixture',
      );
    } on DioException catch (e) {
      state = FixtureDetailError(
        e.response?.data?['message'] as String? ??
            e.message ??
            'Network error occurred',
      );
    } catch (e) {
      state = FixtureDetailError(e.toString());
    }
  }
}

final fixturesControllerProvider =
    StateNotifierProvider<FixturesController, FixturesState>((ref) {
  final dioClient = ref.watch(dioClientProvider);
  return FixturesController(dioClient);
});

final fixtureDetailControllerProvider =
    StateNotifierProvider<FixtureDetailController, FixtureDetailState>((ref) {
  final dioClient = ref.watch(dioClientProvider);
  return FixtureDetailController(dioClient);
});