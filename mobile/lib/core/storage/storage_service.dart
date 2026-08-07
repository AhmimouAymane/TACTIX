import 'package:flutter_riverpod/flutter_riverpod.dart';
import 'package:hive_flutter/hive_flutter.dart';
import 'package:path_provider/path_provider.dart';

class StorageService {
  static const String _userBoxName = 'user';
  static const String _settingsBoxName = 'settings';
  static const String _cacheBoxName = 'cache';

  late final Box _userBox;
  late final Box _settingsBox;
  late final Box _cacheBox;

  Future<void> init() async {
    final appDocDir = await getApplicationDocumentsDirectory();
    Hive.init(appDocDir.path);

    _userBox = await Hive.openBox(_userBoxName);
    _settingsBox = await Hive.openBox(_settingsBoxName);
    _cacheBox = await Hive.openBox(_cacheBoxName);
  }

  Box get userBox => _userBox;
  Box get settingsBox => _settingsBox;
  Box get cacheBox => _cacheBox;

  Future<void> clearAll() async {
    await _userBox.clear();
    await _settingsBox.clear();
    await _cacheBox.clear();
  }

  Future<void> close() async {
    await _userBox.close();
    await _settingsBox.close();
    await _cacheBox.close();
  }
}

final storageServiceProvider = Provider<StorageService>((ref) {
  return StorageService();
});

final storageInitProvider = FutureProvider<void>((ref) async {
  final storage = ref.watch(storageServiceProvider);
  await storage.init();
});