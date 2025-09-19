import { FormEvent, useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Button, Card, Input, Label } from '../components/ui';
import { useToast } from '../components/feedback/Toast';
import { useApp } from '../hooks/useApp';
import { generateId } from '../utils/id';
import { hashPassword } from '../utils/password';
import { UserRepository } from '../services/repositories';
import type { User } from '../types/user';
import type { AuthUser } from '../store/appReducer';
import { routeEntries } from '../routes';
import { useAuth } from '../hooks/useAuth';

interface RegisterRedirectState {
  from?: string;
  reason?: 'unauthenticated' | 'unauthorized';
}

interface RegisterFormState {
  name: string;
  email: string;
  password: string;
}

interface RegisterFormErrors {
  name?: string;
  email?: string;
  password?: string;
  general?: string;
}

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const findFirstAccessibleRoute = (role: string | null): string | null => {
  const normalizedRole = role?.trim().toLowerCase() ?? '';
  if (!normalizedRole) {
    return null;
  }

  for (const [, config] of routeEntries) {
    if (
      config.allowedRoles.some(
        (allowed) => allowed.toLowerCase() === normalizedRole,
      )
    ) {
      return config.path;
    }
  }

  return null;
};

const INITIAL_FORM_STATE: RegisterFormState = {
  name: '',
  email: '',
  password: '',
};

const RegisterPage = () => {
  const { t } = useTranslation();
  const { dispatch } = useApp();
  const toast = useToast();
  const { currentUser } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const redirectState =
    (location.state as RegisterRedirectState | undefined) ?? undefined;
  const [form, setForm] = useState<RegisterFormState>(INITIAL_FORM_STATE);
  const [errors, setErrors] = useState<RegisterFormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    const target = findFirstAccessibleRoute(currentUser.role);
    if (target) {
      navigate(target, { replace: true });
    }
  }, [currentUser, navigate]);

  const registrationHint = useMemo(() => {
    if (!redirectState?.from) {
      return null;
    }

    return t('register.redirectMessage', { from: redirectState.from });
  }, [redirectState?.from, t]);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isSubmitting) {
      return;
    }

    setErrors({});

    const trimmedName = form.name.trim();
    const trimmedEmail = form.email.trim();
    const trimmedPassword = form.password.trim();

    const nextErrors: RegisterFormErrors = {};

    if (!trimmedName) {
      nextErrors.name = t('register.errors.nameRequired');
    }

    if (!emailPattern.test(trimmedEmail)) {
      nextErrors.email = t('register.errors.emailInvalid');
    }

    if (trimmedPassword.length < 6) {
      nextErrors.password = t('register.errors.passwordLength', { min: 6 });
    }

    if (Object.keys(nextErrors).length > 0) {
      setErrors(nextErrors);
      return;
    }

    setIsSubmitting(true);

    try {
      const normalizedEmail = trimmedEmail.toLowerCase();
      const existing = await UserRepository.findByEmail(normalizedEmail);
      if (existing) {
        setErrors({ email: t('register.errors.emailTaken') });
        return;
      }

      const passwordHash = await hashPassword(trimmedPassword);
      const now = new Date().toISOString();
      const record: User = {
        id: generateId(),
        name: trimmedName,
        email: normalizedEmail,
        role: 'viewer',
        passwordHash,
        createdAt: now,
        updatedAt: now,
      };

      await UserRepository.add(record);
      dispatch({ type: 'ADD_USER', payload: record });

      const authPayload: AuthUser = {
        id: record.id,
        role: record.role,
        createdAt: now,
        updatedAt: now,
      };

      dispatch({ type: 'SIGN_IN', payload: authPayload });
      toast.success(t('register.success'));
      setErrors({});
      setForm(INITIAL_FORM_STATE);
    } catch (error) {
      console.error('Failed to register user', error);
      setErrors({ general: t('register.errors.generic') });
      toast.error(t('register.errors.generic'));
    } finally {
      setIsSubmitting(false);
    }
  };

  const canSubmit =
    form.name.trim().length > 0 &&
    emailPattern.test(form.email.trim()) &&
    form.password.trim().length >= 6 &&
    !isSubmitting;

  return (
    <section className="mx-auto flex w-full max-w-xl flex-col gap-6 py-10">
      <Card title={t('register.title')}>
        <form className="space-y-4" onSubmit={handleSubmit} noValidate>
          <p className="text-sm text-neutral-600 dark:text-neutral-300">
            {t('register.subtitle')}
          </p>
          {registrationHint ? (
            <p className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900 dark:border-amber-500/40 dark:bg-amber-500/10 dark:text-amber-200">
              {registrationHint}
            </p>
          ) : null}
          <div className="space-y-1">
            <Label htmlFor="register-name">{t('register.fields.name')}</Label>
            <Input
              id="register-name"
              value={form.name}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, name: event.target.value }))
              }
              autoComplete="name"
              required
              disabled={isSubmitting}
            />
            {errors.name ? (
              <p className="text-sm text-red-600">{errors.name}</p>
            ) : null}
          </div>
          <div className="space-y-1">
            <Label htmlFor="register-email">{t('register.fields.email')}</Label>
            <Input
              id="register-email"
              type="email"
              value={form.email}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, email: event.target.value }))
              }
              autoComplete="email"
              inputMode="email"
              required
              disabled={isSubmitting}
            />
            {errors.email ? (
              <p className="text-sm text-red-600">{errors.email}</p>
            ) : null}
          </div>
          <div className="space-y-1">
            <Label htmlFor="register-password">
              {t('register.fields.password')}
            </Label>
            <Input
              id="register-password"
              type="password"
              value={form.password}
              onChange={(event) =>
                setForm((prev) => ({ ...prev, password: event.target.value }))
              }
              autoComplete="new-password"
              minLength={6}
              required
              disabled={isSubmitting}
            />
            {errors.password ? (
              <p className="text-sm text-red-600">{errors.password}</p>
            ) : null}
          </div>
          {errors.general ? (
            <p className="text-sm text-red-600">{errors.general}</p>
          ) : null}
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <Button
              type="submit"
              disabled={!canSubmit}
              className="bg-emerald-500 text-white hover:bg-emerald-600 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {isSubmitting ? t('register.submitting') : t('register.submit')}
            </Button>
            <span className="text-sm text-neutral-600 dark:text-neutral-300">
              {t('register.alreadyHaveAccount')} {t('register.signInHint')}
            </span>
          </div>
        </form>
      </Card>
    </section>
  );
};

export default RegisterPage;
