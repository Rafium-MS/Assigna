import React, { useLayoutEffect, useState } from 'react';
import { Sidebar } from './Sidebar';

interface ShellProps {
  children: React.ReactNode;
}

export const Shell: React.FC<ShellProps> = ({ children }) => {
  const [dark, setDark] = useState<boolean>(() => {
    const stored = localStorage.getItem('dark');
    if (stored !== null) return JSON.parse(stored) as boolean;
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useLayoutEffect(() => {
    document.documentElement.classList.toggle('dark', dark);
    document.documentElement.classList.add('min-h-full');
    document.body.classList.add('bg-neutral-50', 'dark:bg-neutral-950');
    localStorage.setItem('dark', JSON.stringify(dark));
  }, [dark]);

  return (
    <div className="min-h-screen text-neutral-900 dark:text-neutral-100 flex">
      <Sidebar />
      <div className="flex-1">
        <header className="sticky top-0 z-10 backdrop-blur bg-white/60 dark:bg-neutral-950/50 border-b">
          <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
            <h1 className="font-bold tracking-tight">Territory Manager</h1>
            <div className="flex items-center gap-2">
              <button onClick={() => setDark((value) => !value)} className="rounded-xl px-3 py-2 border">
                {dark ? '☀️ Claro' : '🌙 Escuro'}
              </button>
            </div>
          </div>
        </header>
        <main className="max-w-6xl mx-auto px-4 py-6 grid gap-4">{children}</main>
        <footer className="py-8 text-center text-xs text-neutral-500">Dados salvos localmente (localStorage).</footer>
      </div>
    </div>
  );
};
