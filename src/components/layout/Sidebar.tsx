import React from 'react';
import { useTranslation } from 'react-i18next';

/**
 * Props for the Sidebar component.
 */
interface Props {
  /** The ID of the currently selected item. */
  current: string;
  /** Callback function for when an item is selected. */
  onSelect: (id: string) => void;
}

const iconCls = 'w-5 h-5';

/**
 * An icon representing a map.
 * @returns A JSX element representing the map icon.
 */
const MapIcon = () => (
  <svg viewBox="0 0 24 24" className={iconCls} fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 3L3 5v16l6-2 6 2 6-2V3l-6 2-6-2z" />
    <path d="M9 3v16" />
    <path d="M15 5v16" />
  </svg>
);

/**
 * An icon representing an exit.
 * @returns A JSX element representing the exit icon.
 */
const ExitIcon = () => (
  <svg viewBox="0 0 24 24" className={iconCls} fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 12h13" />
    <path d="M12 5l7 7-7 7" />
  </svg>
);

/**
 * An icon representing an assignment.
 * @returns A JSX element representing the assignment icon.
 */
const AssignIcon = () => (
  <svg viewBox="0 0 24 24" className={iconCls} fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="6" y="3" width="12" height="18" rx="2" />
    <path d="M9 3v4h6V3" />
  </svg>
);

/**
 * An icon representing a calendar.
 * @returns A JSX element representing the calendar icon.
 */
const CalendarIcon = () => (
  <svg viewBox="0 0 24 24" className={iconCls} fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4" />
    <path d="M8 2v4" />
    <path d="M3 10h18" />
  </svg>
);

/**
 * An icon representing a suggestion.
 * @returns A JSX element representing the suggestion icon.
 */
const SuggestIcon = () => (
  <svg viewBox="0 0 24 24" className={iconCls} fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M9 18h6" />
    <path d="M10 22h4" />
    <path d="M12 2a6 6 0 00-4 10c0 2-1 3-1 3h10s-1-1-1-3a6 6 0 00-4-10z" />
  </svg>
);

/**
 * An icon representing a building.
 * @returns A JSX element representing the building icon.
 */
const BuildingIcon = () => (
  <svg viewBox="0 0 24 24" className={iconCls} fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M3 21h18" />
    <path d="M6 21V9h6v12" />
    <path d="M12 21V5h6v16" />
    <path d="M9 13h2" />
    <path d="M15 9h2" />
    <path d="M15 13h2" />
  </svg>
);

const items = [
  { id: 'territories', label: 'sidebar.territories', icon: <MapIcon /> },
  { id: 'streets', label: 'sidebar.streets', icon: <MapIcon /> },
  { id: 'buildingsVillages', label: 'sidebar.buildingsVillages', icon: <BuildingIcon /> },
  { id: 'exits', label: 'sidebar.exits', icon: <ExitIcon /> },
  { id: 'assignments', label: 'sidebar.assignments', icon: <AssignIcon /> },
  { id: 'calendar', label: 'sidebar.calendar', icon: <CalendarIcon /> },
  { id: 'suggestions', label: 'sidebar.suggestions', icon: <SuggestIcon /> },
];

/**
 * A component for the main sidebar navigation.
 * @param props The props for the component.
 * @returns A JSX element representing the sidebar.
 */
export const Sidebar: React.FC<Props> = ({ current, onSelect }) => {
  const { t } = useTranslation();
  return (
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
          <span className="hidden md:inline">{t(it.label)}</span>
        </button>
      ))}
    </nav>
  );
};
