import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface UnauthorizedState {
  from?: string;
  reason?: 'unauthenticated' | 'unauthorized';
}

const UnauthorizedPage = () => {
  const location = useLocation();
  const { currentUser } = useAuth();
  const state = (location.state as UnauthorizedState | null) ?? undefined;

  const inferredReason: 'unauthenticated' | 'unauthorized' =
    state?.reason ?? (currentUser ? 'unauthorized' : 'unauthenticated');

  const messages = {
    unauthenticated: {
      title: 'Faça login para continuar',
      description:
        'Entre com uma conta autorizada usando os controles no topo da página.',
    },
    unauthorized: {
      title: 'Acesso não permitido',
      description:
        'Sua conta atual não possui permissão para acessar esta seção.',
    },
  } as const;

  return (
    <section className="flex flex-col items-center justify-center gap-4 py-24 text-center">
      <div className="max-w-lg space-y-3">
        <h2 className="text-2xl font-semibold">
          {messages[inferredReason].title}
        </h2>
        <p className="text-neutral-600 dark:text-neutral-300">
          {messages[inferredReason].description}
        </p>
        {state?.from ? (
          <p className="text-sm text-neutral-500">
            Rota solicitada: {state.from}
          </p>
        ) : null}
        {currentUser ? (
          <p className="text-xs uppercase tracking-wide text-neutral-500">
            Usuário atual: {currentUser.id} · {currentUser.role}
          </p>
        ) : null}
      </div>
      <Link
        to="/"
        className="rounded-xl px-3 py-2 border bg-neutral-100 text-neutral-900 hover:bg-neutral-200 border-neutral-200 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700 dark:border-neutral-700 transition"
      >
        Voltar para o início
      </Link>
    </section>
  );
};

export default UnauthorizedPage;
