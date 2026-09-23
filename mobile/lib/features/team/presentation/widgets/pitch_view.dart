import 'package:flutter/material.dart';
import 'package:tactix/core/theme/tokens.dart';
import 'package:tactix/features/team/domain/pitch_formation.dart';

/// Vertical fractions for each line (goal at the bottom).
const _lineBias = {'FWD': 0.13, 'MID': 0.37, 'DEF': 0.61, 'GK': 0.86};

/// Height share of one line relative to the pitch card.
const _lineHeightFactor = 0.26;

/// Fantasy pitch: FPL-style green field with photo nodes and name pills.
/// Set [editable] to render tappable "+" placeholders for empty slots.
class PitchView extends StatelessWidget {
  const PitchView({
    super.key,
    required this.formation,
    this.editable = false,
    this.onEmptySlotTap,
    this.onPlayerTap,
    this.showPlaceholders = true,
  });

  final PitchFormation formation;
  final bool editable;
  final void Function(String group, String slot)? onEmptySlotTap;
  final void Function(PitchPlayer player)? onPlayerTap;
  final bool showPlaceholders;

  @override
  Widget build(BuildContext context) {
    final theme = Theme.of(context);

    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Card(
          clipBehavior: Clip.antiAlias,
          margin: EdgeInsets.zero,
          shape: RoundedRectangleBorder(
            borderRadius: BorderRadius.circular(AppRadii.medium),
            side: BorderSide.none,
          ),
          child: CustomPaint(
            painter: const _PitchPainter(),
            child: SizedBox(
              height: 420,
              child: Stack(
                children: [
                  if (formation.starterCount > 0)
                    Positioned(
                      top: AppSpacing.sm,
                      left: AppSpacing.md,
                      child: _FormationChip(label: formation.label),
                    ),
                  for (final line in formation.lines)
                    _PitchLineRow(
                      line: line,
                      bias: _lineBias[line.group] ?? 0.5,
                      editable: editable,
                      showPlaceholders: showPlaceholders,
                      onEmptySlotTap: onEmptySlotTap,
                      onPlayerTap: onPlayerTap,
                    ),
                  if (formation.lines.isEmpty)
                    Center(
                      child: Text(
                        '0/11',
                        style: theme.textTheme.displayMedium?.copyWith(
                          color: Colors.white.withValues(alpha: 0.35),
                        ),
                      ),
                    ),
                ],
              ),
            ),
          ),
        ),
      ],
    );
  }
}

class _FormationChip extends StatelessWidget {
  const _FormationChip({required this.label});

  final String label;

  @override
  Widget build(BuildContext context) {
    return Container(
      padding: const EdgeInsets.symmetric(
        horizontal: AppSpacing.md,
        vertical: AppSpacing.xs,
      ),
      decoration: BoxDecoration(
        color: Colors.white,
        borderRadius: BorderRadius.circular(AppRadii.pill),
        boxShadow: const [
          BoxShadow(color: Colors.black26, blurRadius: 6, offset: Offset(0, 2)),
        ],
      ),
      child: Text(
        label,
        style: const TextStyle(
          fontFamily: AppTypography.displayFontFamily,
          fontSize: 13,
          fontWeight: FontWeight.w700,
          color: Color(0xFF37003C),
          letterSpacing: 1.5,
        ),
      ),
    );
  }
}

class _PitchLineRow extends StatelessWidget {
  const _PitchLineRow({
    required this.line,
    required this.bias,
    required this.editable,
    required this.showPlaceholders,
    required this.onEmptySlotTap,
    required this.onPlayerTap,
  });

  final PitchLine line;
  final double bias;
  final bool editable;
  final bool showPlaceholders;
  final void Function(String group, String slot)? onEmptySlotTap;
  final void Function(PitchPlayer player)? onPlayerTap;

  @override
  Widget build(BuildContext context) {
    final nodes = showPlaceholders
        ? line.nodes
        : line.nodes.where((n) => !n.isEmpty).toList();
    if (nodes.isEmpty) return const SizedBox.shrink();

    // Expanded per node: a full line can never overflow, on any width.
    Widget framed(Widget child) => Expanded(
          child: Center(
            child: ConstrainedBox(
              constraints: const BoxConstraints(maxWidth: 140),
              child: child,
            ),
          ),
        );

    return Positioned.fill(
      child: FractionallySizedBox(
        alignment: Alignment(0, bias * 2 - 1),
        heightFactor: _lineHeightFactor,
        child: Row(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            for (final node in nodes)
              framed(
                node.isEmpty
                    ? _EmptyShirt(
                        slot: node.slot,
                        group: node.group,
                        onTap: editable && onEmptySlotTap != null
                            ? () => onEmptySlotTap!(node.group, node.slot)
                            : null,
                      )
                    : PlayerNode(
                        player: node,
                        onTap: onPlayerTap != null
                            ? () => onPlayerTap!(node)
                            : null,
                      ),
              ),
          ],
        ),
      ),
    );
  }
}

class PlayerNode extends StatelessWidget {
  const PlayerNode({super.key, required this.player, this.onTap});

  final PitchPlayer player;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    final isCaptain = player.isCaptain;
    final isVice = player.isViceCaptain;

    return GestureDetector(
      onTap: onTap,
      behavior: HitTestBehavior.opaque,
      child: SizedBox(
        width: 104,
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Stack(
              clipBehavior: Clip.none,
              children: [
                // Photo with FPL-style white ring.
                Container(
                  padding: const EdgeInsets.all(2.5),
                  decoration: const BoxDecoration(
                    shape: BoxShape.circle,
                    color: Colors.white,
                    boxShadow: [
                      BoxShadow(
                        color: Colors.black38,
                        blurRadius: 6,
                        offset: Offset(0, 2),
                      ),
                    ],
                  ),
                  child: CircleAvatar(
                    radius: 23,
                    backgroundColor: const Color(0xFF4C0D52),
                    foregroundImage:
                        player.photoUrl != null && player.photoUrl!.isNotEmpty
                            ? NetworkImage(player.photoUrl!)
                            : null,
                    child: player.photoUrl != null &&
                            player.photoUrl!.isNotEmpty
                        ? null
                        : Text(
                            player.name.isEmpty
                                ? '?'
                                : player.name.substring(0, 1).toUpperCase(),
                            style: const TextStyle(
                              fontFamily: AppTypography.displayFontFamily,
                              fontSize: 18,
                              fontWeight: FontWeight.w700,
                              color: Colors.white,
                            ),
                          ),
                  ),
                ),
                if (isCaptain || isVice)
                  Positioned(
                    top: -5,
                    right: -5,
                    child: Container(
                      width: 22,
                      height: 22,
                      alignment: Alignment.center,
                      decoration: BoxDecoration(
                        shape: BoxShape.circle,
                        color: isCaptain ? AppColors.primary : AppColors.accentBlue,
                        border: Border.all(color: Colors.white, width: 1.5),
                      ),
                      child: Text(
                        isCaptain ? 'C' : 'V',
                        style: const TextStyle(
                          fontFamily: AppTypography.displayFontFamily,
                          fontSize: 12,
                          fontWeight: FontWeight.w700,
                          color: AppColors.onPrimary,
                          height: 1,
                        ),
                      ),
                    ),
                  ),
              ],
            ),
            const SizedBox(height: 5),
            // FPL signature: white name pill.
            Container(
              constraints: const BoxConstraints(maxWidth: 96),
              padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
              decoration: BoxDecoration(
                color: Colors.white,
                borderRadius: BorderRadius.circular(4),
                boxShadow: const [
                  BoxShadow(
                    color: Colors.black26,
                    blurRadius: 4,
                    offset: Offset(0, 1),
                  ),
                ],
              ),
              child: Text(
                player.label,
                maxLines: 1,
                overflow: TextOverflow.ellipsis,
                textAlign: TextAlign.center,
                style: const TextStyle(
                  fontFamily: AppTypography.displayFontFamily,
                  fontSize: 12,
                  fontWeight: FontWeight.w600,
                  color: Color(0xFF37003C),
                  height: 1.15,
                  letterSpacing: 0.2,
                ),
              ),
            ),
            const SizedBox(height: 3),
            Text(
              player.price.toStringAsFixed(1),
              style: const TextStyle(
                fontFamily: AppTypography.displayFontFamily,
                fontSize: 12,
                fontWeight: FontWeight.w700,
                color: Colors.white,
                shadows: [
                  Shadow(blurRadius: 4, color: Colors.black54),
                ],
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class _EmptyShirt extends StatelessWidget {
  const _EmptyShirt({
    required this.slot,
    required this.group,
    required this.onTap,
  });

  final String slot;
  final String group;
  final VoidCallback? onTap;

  @override
  Widget build(BuildContext context) {
    final tappable = onTap != null;

    return GestureDetector(
      onTap: onTap,
      behavior: HitTestBehavior.opaque,
      child: SizedBox(
        width: 104,
        child: Column(
          mainAxisSize: MainAxisSize.min,
          children: [
            Container(
              width: 52,
              height: 52,
              alignment: Alignment.center,
              decoration: BoxDecoration(
                shape: BoxShape.circle,
                color: Colors.black.withValues(alpha: tappable ? 0.25 : 0.15),
                border: Border.all(
                  color: Colors.white.withValues(alpha: tappable ? 0.85 : 0.4),
                  width: tappable ? 2 : 1.5,
                ),
              ),
              child: Icon(
                Icons.add,
                color: Colors.white.withValues(alpha: tappable ? 1 : 0.45),
                size: tappable ? 26 : 22,
              ),
            ),
            const SizedBox(height: 5),
            Container(
              padding: const EdgeInsets.symmetric(horizontal: 6, vertical: 2),
              decoration: BoxDecoration(
                color: Colors.white.withValues(alpha: tappable ? 0.92 : 0.25),
                borderRadius: BorderRadius.circular(4),
              ),
              child: Text(
                slot,
                style: TextStyle(
                  fontFamily: AppTypography.displayFontFamily,
                  fontSize: 11,
                  fontWeight: FontWeight.w700,
                  color: const Color(0xFF37003C)
                      .withValues(alpha: tappable ? 1 : 0.7),
                  letterSpacing: 0.5,
                ),
              ),
            ),
          ],
        ),
      ),
    );
  }
}

class BenchRow extends StatelessWidget {
  const BenchRow({
    super.key,
    required this.bench,
    this.editable = false,
    this.onEmptySlotTap,
    this.onPlayerTap,
  });

  final List<PitchPlayer> bench;
  final bool editable;
  final void Function(String group, String slot)? onEmptySlotTap;
  final void Function(PitchPlayer player)? onPlayerTap;

  @override
  Widget build(BuildContext context) {
    if (bench.isEmpty) return const SizedBox.shrink();

    return Row(
      children: [
        for (final node in bench)
          Expanded(
            child: Center(
              child: ConstrainedBox(
                constraints: const BoxConstraints(maxWidth: 140),
                child: node.isEmpty
                    ? _EmptyShirt(
                        slot: node.slot,
                        group: node.group,
                        onTap: editable && onEmptySlotTap != null
                            ? () => onEmptySlotTap!(node.group, node.slot)
                            : null,
                      )
                    : PlayerNode(
                        player: node,
                        onTap: onPlayerTap != null
                            ? () => onPlayerTap!(node)
                            : null,
                      ),
              ),
            ),
          ),
      ],
    );
  }
}

class _PitchPainter extends CustomPainter {
  const _PitchPainter();

  static const _grassTop = Color(0xFF12B25A);
  static const _grassBottom = Color(0xFF0A9448);
  static const _linePaintColor = Color(0xCCFFFFFF);

  @override
  void paint(Canvas canvas, Size size) {
    final w = size.width;
    final h = size.height;

    // Grass base with vertical gradient.
    canvas.drawRect(
      Offset.zero & size,
      Paint()
        ..shader = const LinearGradient(
          begin: Alignment.topCenter,
          end: Alignment.bottomCenter,
          colors: [_grassTop, _grassBottom],
        ).createShader(Offset.zero & size),
    );

    // Mowing stripes.
    const bands = 8;
    final bandW = w / bands;
    final stripe = Paint()..color = Colors.white.withValues(alpha: 0.05);
    for (var i = 0; i < bands; i += 2) {
      canvas.drawRect(
        Rect.fromLTWH(i * bandW, 0, bandW, h),
        stripe,
      );
    }

    final line = Paint()
      ..color = _linePaintColor
      ..style = PaintingStyle.stroke
      ..strokeWidth = 2;

    // Outer border.
    canvas.drawRect(
      Rect.fromLTWH(4, 4, w - 8, h - 8),
      line,
    );
    // Halfway line.
    canvas.drawLine(Offset(4, h / 2), Offset(w - 4, h / 2), line);
    // Center circle + spot.
    canvas.drawCircle(Offset(w / 2, h / 2), h * 0.09, line);
    canvas.drawCircle(
      Offset(w / 2, h / 2),
      3,
      Paint()..color = _linePaintColor,
    );
    // Penalty boxes.
    final boxW = w * 0.44;
    final boxH = h * 0.13;
    canvas.drawRect(
      Rect.fromCenter(center: Offset(w / 2, boxH / 2), width: boxW, height: boxH),
      line,
    );
    canvas.drawRect(
      Rect.fromCenter(
        center: Offset(w / 2, h - boxH / 2),
        width: boxW,
        height: boxH,
      ),
      line,
    );
    // Six-yard boxes.
    final sixW = w * 0.2;
    final sixH = h * 0.055;
    canvas.drawRect(
      Rect.fromCenter(center: Offset(w / 2, sixH / 2), width: sixW, height: sixH),
      line,
    );
    canvas.drawRect(
      Rect.fromCenter(
        center: Offset(w / 2, h - sixH / 2),
        width: sixW,
        height: sixH,
      ),
      line,
    );
    // Penalty arcs (top and bottom).
    final arcPaint = Paint()
      ..color = _linePaintColor
      ..style = PaintingStyle.stroke
      ..strokeWidth = 2;
    canvas.drawArc(
      Rect.fromCircle(
        center: Offset(w / 2, boxH),
        radius: h * 0.055,
      ),
      0,
      3.14159,
      false,
      arcPaint,
    );
    canvas.drawArc(
      Rect.fromCircle(
        center: Offset(w / 2, h - boxH),
        radius: h * 0.055,
      ),
      3.14159,
      3.14159,
      false,
      arcPaint,
    );
  }

  @override
  bool shouldRepaint(covariant CustomPainter oldDelegate) => false;
}
