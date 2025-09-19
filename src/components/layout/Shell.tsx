import React, { useLayoutEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Sidebar } from './Sidebar';
import { LanguageSelector } from '../forms/LanguageSelector';
import { AuthControls } from '../auth/AuthControls';

interface ShellProps {
  children: React.ReactNode;
}

export const Shell: React.FC<ShellProps> = ({ children }) => {
  const { t } = useTranslation();
  const [dark, setDark] = useState<boolean>(() => {
    const stored = localStorage.getItem('dark');
    if (stored !== null) return JSON.parse(stored) as boolean;
    return (
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches
    );
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const sidebarId = 'app-primary-navigation';

  useLayoutEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    document.documentElement.classList.add('min-h-full');
    document.body.classList.add('bg-neutral-50', 'dark:bg-neutral-950');
    localStorage.setItem('dark', JSON.stringify(dark));
  }, [dark]);

  return (
    <div className="min-h-screen text-neutral-900 dark:text-neutral-100 flex flex-col md:flex-row">
      <Sidebar
        id={sidebarId}
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
      <div className="flex-1 w-full flex flex-col">
        <header className="sticky top-0 z-10 backdrop-blur bg-white/60 dark:bg-neutral-950/50 border-b">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-3">
              <button
                type="button"
                className="md:hidden inline-flex items-center justify-center rounded-xl border px-3 py-2"
                onClick={() => setSidebarOpen((value) => !value)}
                aria-controls={sidebarId}
                aria-expanded={sidebarOpen}
              >
                <span className="sr-only">
                  {sidebarOpen
                    ? t('sidebar.closeMenu', 'Fechar menu de navegação')
                    : t('sidebar.openMenu', 'Abrir menu de navegação')}
                </span>
                <svg
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  fill="none"
                  aria-hidden="true"
                >
                  <path d="M4 7h16" />
                  <path d="M4 12h16" />
                  <path d="M4 17h16" />
                </svg>
              </button>
              <h1 className="font-bold tracking-tight">Territory Manager</h1>
            </div>
            <div className="flex flex-wrap items-center justify-end gap-2">
              <AuthControls className="flex-shrink-0" />
              <LanguageSelector />
              <button
                onClick={() => setDark((value) => !value)}
                className="rounded-xl px-3 py-2 border"
              >
                {dark
                  ? `☀️ ${t('app.theme.light')}`
                  : `🌙 ${t('app.theme.dark')}`}
              </button>
            </div>
          </div>
        </header>
        <main className="max-w-6xl mx-auto px-4 py-6 grid gap-4 flex-1 w-full">
          {children}
        </main>
        <footer className="py-8 text-center text-xs text-neutral-500">
          Dados salvos localmente (localStorage).
        </footer>
      </div>
    </div>
  );
};
