import { FormEvent, useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Button, Input, Label } from '../ui';

interface AuthControlsProps {
  className?: string;
}

export const AuthControls = ({ className = '' }: AuthControlsProps) => {
  const { currentUser, signIn, signOut } = useAuth();
  const [credentials, setCredentials] = useState({ id: '', role: '' });

  if (currentUser) {
    return (
      <div className={`flex items-center gap-3 ${className}`}>
        <div className="text-right leading-tight text-xs text-neutral-500 dark:text-neutral-300">
          <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100">{currentUser.id}</p>
          <p className="uppercase tracking-wide">{currentUser.role}</p>
        </div>
        <Button
          type="button"
          onClick={signOut}
          className="bg-red-500 text-white hover:bg-red-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Sair
        </Button>
      </div>
    );
  }

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedId = credentials.id.trim();
    const trimmedRole = credentials.role.trim();
    if (!trimmedId || !trimmedRole) {
      return;
    }

    signIn({ id: trimmedId, role: trimmedRole });
    setCredentials({ id: '', role: '' });
  };

  const canSubmit = credentials.id.trim().length > 0 && credentials.role.trim().length > 0;

  return (
    <form
      onSubmit={handleSubmit}
      className={`flex flex-wrap items-end gap-2 ${className}`}
      noValidate
    >
      <div className="flex flex-col">
        <Label htmlFor="auth-id" className="sr-only">
          Identificação
        </Label>
        <Input
          id="auth-id"
          value={credentials.id}
          onChange={(event) => setCredentials((prev) => ({ ...prev, id: event.target.value }))}
          placeholder="Usuário"
          autoComplete="username"
          className="w-32"
        />
      </div>
      <div className="flex flex-col">
        <Label htmlFor="auth-role" className="sr-only">
          Função
        </Label>
        <Input
          id="auth-role"
          value={credentials.role}
          onChange={(event) => setCredentials((prev) => ({ ...prev, role: event.target.value }))}
          placeholder="Função"
          autoComplete="organization-title"
          className="w-28"
        />
      </div>
      <Button
        type="submit"
        className="bg-emerald-500 text-white hover:bg-emerald-600 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={!canSubmit}
      >
        Entrar
      </Button>
    </form>
  );
};
