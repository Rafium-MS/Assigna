import { FormEvent, useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../hooks/useAuth';
import { Button, Input, Label } from '../ui';
import { useToast } from '../feedback/Toast';
import { authRoutes } from '../../routes';

interface AuthControlsProps {
  className?: string;
}

export const AuthControls = ({ className = '' }: AuthControlsProps) => {
  const { t } = useTranslation();
  const { currentUser, signIn, signOut } = useAuth();
  const toast = useToast();
  const [credentials, setCredentials] = useState({
    identifier: '',
    password: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (currentUser) {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <div className="text-right leading-tight text-xs text-neutral-500 dark:text-neutral-300">
          <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">
            {currentUser.id}
          </p>
          <p className="uppercase tracking-wide">{currentUser.role}</p>
        </div>
        <Button
          type="button"
          onClick={signOut}
          className="bg-red-500 text-white hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {t('auth.signOut')}
        </Button>
      </div>
    );
  }

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedIdentifier = credentials.identifier.trim();
    const trimmedPassword = credentials.password.trim();
    if (!trimmedIdentifier || !trimmedPassword) {
      return;
    }

    setIsSubmitting(true);
    const result = await signIn({
      identifier: trimmedIdentifier,
      password: trimmedPassword,
    });
    setIsSubmitting(false);
    if (!result) {
      toast.error(t('auth.invalidCredentials'));
      return;
    }

    setCredentials({ identifier: '', password: '' });
  };

  const canSubmit =
    credentials.identifier.trim().length > 0 &&
    credentials.password.trim().length > 0 &&
    !isSubmitting;

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex flex-wrap items-end gap-2 ${className}`}
      noValidate
    >
      <div className="flex flex-col">
        <Label htmlFor="auth-id" className="sr-only">
          {t('auth.identifierLabel')}
        </Label>
        <Input
          id="auth-id"
          value={credentials.identifier}
          onChange={(event) =>
            setCredentials((prev) => ({
              ...prev,
              identifier: event.target.value,
            }))
          }
          placeholder={t('auth.identifierPlaceholder')}
          autoComplete="username"
          className="w-32"
        />
      </div>
      <div className="flex flex-col">
        <Label htmlFor="auth-password" className="sr-only">
          {t('auth.passwordLabel')}
        </Label>
        <Input
          id="auth-password"
          type="password"
          value={credentials.password}
          onChange={(event) =>
            setCredentials((prev) => ({
              ...prev,
              password: event.target.value,
            }))
          }
          placeholder={t('auth.passwordPlaceholder')}
          autoComplete="current-password"
          className="w-28"
        />
      </div>
      <div className="flex items-center gap-3">
        <Button
          type="submit"
          className="bg-emerald-500 text-white hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed"
          disabled={!canSubmit}
        >
          {t('auth.signIn')}
        </Button>
        <Link
          to={authRoutes.register}
          className="text-sm text-emerald-600 hover:underline"
        >
          {t('register.cta')}
        </Link>
      </div>
    </form>
  );
};
