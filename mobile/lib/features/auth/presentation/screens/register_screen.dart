import 'package:flutter/material.dart';
import 'package:flutter_riverpod/flutter_riverpod.dart'
    show ConsumerStatefulWidget, ConsumerState, WidgetRef;
import 'package:go_router/go_router.dart';
import 'package:tactix/l10n/app_localizations.dart';
import 'package:tactix/core/core.dart';
import 'package:tactix/shared/widgets/widgets.dart';
import 'package:tactix/features/auth/domain/auth_state.dart';
import '../auth_controller.dart';

class RegisterScreen extends ConsumerStatefulWidget {
  const RegisterScreen({super.key});

  @override
  ConsumerState<RegisterScreen> createState() => _RegisterScreenState();
}

class _RegisterScreenState extends ConsumerState<RegisterScreen> {
  final _formKey = GlobalKey<FormState>();
  final _nameController = TextEditingController();
  final _emailController = TextEditingController();
  final _passwordController = TextEditingController();
  final _confirmPasswordController = TextEditingController();
  bool _obscurePassword = true;
  bool _obscureConfirmPassword = true;

  @override
  void dispose() {
    _nameController.dispose();
    _emailController.dispose();
    _passwordController.dispose();
    _confirmPasswordController.dispose();
    super.dispose();
  }

  Future<void> _submit() async {
    if (!_formKey.currentState!.validate()) return;

    await ref.read(authControllerProvider.notifier).register(
          email: _emailController.text.trim(),
          password: _passwordController.text,
          name: _nameController.text.trim(),
        );

    final state = ref.read(authControllerProvider);
    if (state.maybeWhen(authenticated: (_, __, ___, ____) => true, orElse: () => false) && mounted) {
      context.go(AppRoutes.home);
    }
  }

  @override
  Widget build(BuildContext context) {
    final l10n = AppLocalizations.of(context)!;
    final authState = ref.watch(authControllerProvider);
    final isLoading = authState.maybeWhen(loading: () => true, orElse: () => false);

    ref.listen<AuthState>(authControllerProvider, (previous, next) {
      next.whenOrNull(
        error: (message) => ScaffoldMessenger.of(context).showSnackBar(
          SnackBar(content: Text(message)),
        ),
      );
    });

    return RtlAwareScaffold(
      body: SafeArea(
        child: Center(
          child: SingleChildScrollView(
            padding: const EdgeInsets.all(AppSpacing.lg),
            child: Form(
              key: _formKey,
              child: Column(
                mainAxisAlignment: MainAxisAlignment.center,
                crossAxisAlignment: CrossAxisAlignment.stretch,
                children: [
                  Icon(
                    Icons.sports_soccer,
                    size: 80,
                    color: Theme.of(context).colorScheme.primary,
                  ),
                  const SizedBox(height: AppSpacing.lg),
                  Text(
                    l10n.appName,
                    style: Theme.of(context).textTheme.displaySmall,
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(height: AppSpacing.xs),
                  Text(
                    l10n.registerSubtitle,
                    style: Theme.of(context).textTheme.bodyMedium?.copyWith(
                          color: Theme.of(context).colorScheme.onSurfaceVariant,
                        ),
                    textAlign: TextAlign.center,
                  ),
                  const SizedBox(height: AppSpacing.xxxl),
                  TextFormField(
                    controller: _nameController,
                    textInputAction: TextInputAction.next,
                    decoration: InputDecoration(
                      labelText: l10n.nameLabel,
                      hintText: l10n.nameHint,
                      prefixIcon: const Icon(Icons.person_outline),
                    ),
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return l10n.nameRequired;
                      }
                      if (value.length < 2) {
                        return l10n.nameMinLength;
                      }
                      return null;
                    },
                  ),
                  const SizedBox(height: AppSpacing.lg),
                  TextFormField(
                    controller: _emailController,
                    keyboardType: TextInputType.emailAddress,
                    textInputAction: TextInputAction.next,
                    decoration: InputDecoration(
                      labelText: l10n.emailLabel,
                      hintText: l10n.emailHint,
                      prefixIcon: const Icon(Icons.email_outlined),
                    ),
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return l10n.emailRequired;
                      }
                      if (!RegExp(r'^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$').hasMatch(value)) {
                        return l10n.emailInvalid;
                      }
                      return null;
                    },
                  ),
                  const SizedBox(height: AppSpacing.lg),
                  TextFormField(
                    controller: _passwordController,
                    obscureText: _obscurePassword,
                    textInputAction: TextInputAction.next,
                    decoration: InputDecoration(
                      labelText: l10n.passwordLabel,
                      hintText: l10n.passwordHint,
                      prefixIcon: const Icon(Icons.lock_outline),
                      suffixIcon: IconButton(
                        icon: Icon(
                          _obscurePassword
                              ? Icons.visibility_outlined
                              : Icons.visibility_off_outlined,
                        ),
                        onPressed: () =>
                            setState(() => _obscurePassword = !_obscurePassword),
                      ),
                    ),
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return l10n.passwordRequired;
                      }
                      if (value.length < 6) {
                        return l10n.passwordMinLength;
                      }
                      return null;
                    },
                  ),
                  const SizedBox(height: AppSpacing.lg),
                  TextFormField(
                    controller: _confirmPasswordController,
                    obscureText: _obscureConfirmPassword,
                    textInputAction: TextInputAction.done,
                    decoration: InputDecoration(
                      labelText: l10n.confirmPasswordLabel,
                      hintText: l10n.confirmPasswordHint,
                      prefixIcon: const Icon(Icons.lock_outline),
                      suffixIcon: IconButton(
                        icon: Icon(
                          _obscureConfirmPassword
                              ? Icons.visibility_outlined
                              : Icons.visibility_off_outlined,
                        ),
                        onPressed: () => setState(
                            () => _obscureConfirmPassword = !_obscureConfirmPassword),
                      ),
                    ),
                    validator: (value) {
                      if (value == null || value.isEmpty) {
                        return l10n.confirmPasswordRequired;
                      }
                      if (value != _passwordController.text) {
                        return l10n.passwordsDontMatch;
                      }
                      return null;
                    },
                    onFieldSubmitted: (_) => _submit(),
                  ),
                  const SizedBox(height: AppSpacing.xl),
                  FilledButton(
                    onPressed: isLoading ? null : _submit,
                    child: isLoading
                        ? const SizedBox(
                            height: 20,
                            width: 20,
                            child: CircularProgressIndicator(strokeWidth: 2),
                          )
                        : Text(l10n.register),
                  ),
                  const SizedBox(height: AppSpacing.lg),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      Text(l10n.alreadyHaveAccount),
                      TextButton(
                        onPressed: () => context.go(AppRoutes.login),
                        child: Text(l10n.login),
                      ),
                    ],
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }
}
