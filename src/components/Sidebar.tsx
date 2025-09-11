import React from 'react';

interface Props {
  current: string;
  onSelect: (id: string) => void;
}

const iconCls = 'w-5 h-5';

const MapIcon = () => (
  <svg viewBox="0 0 24 24" className={iconCls} fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 3L3 5v16l6-2 6 2 6-2V3l-6 2-6-2z" />
    <path d="M9 3v16" />
    <path d="M15 5v16" />
  </svg>
);

const ExitIcon = () => (
  <svg viewBox="0 0 24 24" className={iconCls} fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 12h13" />
    <path d="M12 5l7 7-7 7" />
  </svg>
);

const AssignIcon = () => (
  <svg viewBox="0 0 24 24" className={iconCls} fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="6" y="3" width="12" height="18" rx="2" />
    <path d="M9 3v4h6V3" />
  </svg>
);

const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" className={iconCls} fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4" />
    <path d="M8 2v4" />
    <path d="M3 10h18" />
  </svg>
);

const SuggestIcon = () => (
  <svg viewBox="0 0 24 24" className={iconCls} fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 18h6" />
    <path d="M10 22h4" />
    <path d="M12 2a6 6 0 00-4 10c0 2-1 3-1 3h10s-1-1-1-3a6 6 0 00-4-10z" />
  </svg>
);

const items = [
  { id: 'territories', label: 'Territórios', icon: <MapIcon /> },
  { id: 'exits', label: 'Saídas', icon: <ExitIcon /> },
  { id: 'assignments', label: 'Designações', icon: <AssignIcon /> },
  { id: 'calendar', label: 'Calendário', icon: <CalendarIcon /> },
  { id: 'suggestions', label: 'Sugestões', icon: <SuggestIcon /> },
];

export const Sidebar: React.FC<Props> = ({ current, onSelect }) => (
  <nav className="bg-white dark:bg-neutral-900 border-r p-2 flex md:flex-col gap-2 md:w-48">
    {items.map((it) => (
      <button
        key={it.id}
        onClick={() => onSelect(it.id)}
        className={`flex items-center gap-2 px-3 py-2 rounded transition-colors hover:bg-neutral-100 dark:hover:bg-neutral-800 ${
          current === it.id ? 'bg-neutral-200 dark:bg-neutral-800' : ''
        }`}
      >
        {it.icon}
        <span className="hidden md:inline">{it.label}</span>
      </button>
    ))}
  </nav>
);

