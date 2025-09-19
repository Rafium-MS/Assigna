import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import type { TabKey } from '../../types/navigation';
import { routePaths, routes } from '../../routes';
import { useAuth } from '../../hooks/useAuth';
import { ADMIN_MASTER_ROLE } from '../../constants/roles';

const iconCls = 'w-5 h-5';

const MapIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className={iconCls}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M9 3L3 5v16l6-2 6 2 6-2V3l-6 2-6-2z" />
    <path d="M9 3v16" />
    <path d="M15 5v16" />
  </svg>
);

const ExitIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className={iconCls}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M3 12h13" />
    <path d="M12 5l7 7-7 7" />
  </svg>
);

const AssignIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className={iconCls}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="6" y="3" width="12" height="18" rx="2" />
    <path d="M9 3v4h6V3" />
  </svg>
);

const TodayIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className={iconCls}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2" />
    <path d="M12 20v2" />
    <path d="M4.93 4.93l1.41 1.41" />
    <path d="M17.66 17.66l1.41 1.41" />
    <path d="M2 12h2" />
    <path d="M20 12h2" />
    <path d="M6.34 17.66l-1.41 1.41" />
    <path d="M19.07 4.93l-1.41 1.41" />
  </svg>
);

const CalendarIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className={iconCls}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" />
    <path d="M16 2v4" />
    <path d="M8 2v4" />
    <path d="M3 10h18" />
  </svg>
);

const SuggestIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className={iconCls}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M9 18h6" />
    <path d="M10 22h4" />
    <path d="M12 2a6 6 0 00-4 10c0 2-1 3-1 3h10s-1-1-1-3a6 6 0 00-4-10z" />
  </svg>
);

const UsersIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className={iconCls}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M16 21v-2a4 4 0 00-4-4H6a4 4 0 00-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 00-3-3.87" />
    <path d="M16 3.13a4 4 0 010 7.75" />
  </svg>
);

const BuildingIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className={iconCls}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M3 21h18" />
    <path d="M6 21V9h6v12" />
    <path d="M12 21V5h6v16" />
    <path d="M9 13h2" />
    <path d="M15 9h2" />
    <path d="M15 13h2" />
  </svg>
);

const LetterIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className={iconCls}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="M3 7l9 6 9-6" />
  </svg>
);

const HomeOffIcon = () => (
  <svg
    viewBox="0 0 24 24"
    className={iconCls}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M3 9l9-6 9 6" />
    <path d="M4 10v10a1 1 0 001 1h6" />
    <path d="M20 14l-6 6" />
    <path d="M14 14l6 6" />
  </svg>
);

const items: Array<{ id: TabKey; label: string; icon: React.ReactNode }> = [
  { id: 'territories', label: 'sidebar.territories', icon: <MapIcon /> },
  { id: 'streets', label: 'sidebar.streets', icon: <MapIcon /> },
  {
    id: 'buildingsVillages',
    label: 'sidebar.buildingsVillages',
    icon: <BuildingIcon />,
  },
  { id: 'letters', label: 'sidebar.letters', icon: <LetterIcon /> },
  { id: 'exits', label: 'sidebar.exits', icon: <ExitIcon /> },
  { id: 'assignments', label: 'sidebar.assignments', icon: <AssignIcon /> },
  { id: 'users', label: 'sidebar.users', icon: <UsersIcon /> },
  {
    id: 'todayAssignments',
    label: 'sidebar.todayAssignments',
    icon: <TodayIcon />,
  },
  { id: 'calendar', label: 'sidebar.calendar', icon: <CalendarIcon /> },
  { id: 'notAtHome', label: 'sidebar.notAtHome', icon: <HomeOffIcon /> },
  { id: 'suggestions', label: 'sidebar.suggestions', icon: <SuggestIcon /> },
];

const ADMIN_MASTER_ROLE_NORMALIZED = ADMIN_MASTER_ROLE.toLowerCase();

interface SidebarProps {
  id?: string;
  open: boolean;
  onClose: () => void;
}

const useIsMdUp = () => {
  const getMatches = () =>
    typeof window !== 'undefined' && typeof window.matchMedia === 'function'
      ? window.matchMedia('(min-width: 768px)').matches
      : false;

  const [matches, setMatches] = useState<boolean>(getMatches);

  useEffect(() => {
    if (
      typeof window === 'undefined' ||
      typeof window.matchMedia !== 'function'
    ) {
      return;
    }

    const mediaQuery = window.matchMedia('(min-width: 768px)');
    const updateMatches = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    setMatches(mediaQuery.matches);

    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', updateMatches);
      return () => mediaQuery.removeEventListener('change', updateMatches);
    }

    mediaQuery.addListener(updateMatches);
    return () => mediaQuery.removeListener(updateMatches);
  }, []);

  return matches;
};

export const Sidebar: React.FC<SidebarProps> = ({ id, open, onClose }) => {
  const { t } = useTranslation();
  const { currentUser } = useAuth();
  const normalizedRole = currentUser?.role?.toLowerCase() ?? null;
  const isAdminMaster = normalizedRole === ADMIN_MASTER_ROLE_NORMALIZED;
  const isMdUp = useIsMdUp();
  const isVisible = isMdUp || open;
  const navId = id ?? 'app-sidebar';

  const visibleItems = normalizedRole
    ? items.filter(
        (it) =>
          isAdminMaster ||
          routes[it.id].allowedRoles.some(
            (role) => role.toLowerCase() === normalizedRole,
          ),
      )
    : [];

  useEffect(() => {
    if (!open || isMdUp) {
      return;
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, onClose, isMdUp]);

  return (
    <>
      {!isMdUp && (
        <div
          className={`fixed inset-0 z-40 bg-black/40 transition-opacity md:hidden ${
            open
              ? 'opacity-100 pointer-events-auto'
              : 'opacity-0 pointer-events-none'
          }`}
          aria-hidden="true"
          onClick={onClose}
        />
      )}
      <nav
        id={navId}
        aria-label={t('app.navigation', 'Navegação principal')}
        aria-hidden={!isVisible}
        className={`bg-white dark:bg-neutral-900 border-r border-neutral-200 dark:border-neutral-800 p-4 md:p-2 flex flex-col gap-2 w-64 md:w-48 h-full md:h-auto fixed inset-y-0 left-0 z-50 transform transition-transform duration-200 ease-in-out md:static md:translate-x-0 md:shadow-none ${
          isVisible
            ? 'translate-x-0 shadow-lg md:shadow-none pointer-events-auto'
            : '-translate-x-full pointer-events-none'
        }`}
      >
        <div className="flex justify-end md:hidden">
          <button
            type="button"
            onClick={onClose}
            className="inline-flex items-center gap-2 rounded-xl border px-3 py-2"
          >
            <span className="sr-only">
              {t('sidebar.closeMenu', 'Fechar menu de navegação')}
            </span>
            <svg
              className="h-5 w-5"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
              fill="none"
              aria-hidden="true"
            >
              <path d="M6 6l12 12" />
              <path d="M18 6L6 18" />
            </svg>
          </button>
        </div>
        {visibleItems.map((it) => (
          <NavLink
            key={it.id}
            to={routePaths[it.id]}
            end={routePaths[it.id] === '/'}
            aria-label={t(it.label)}
            tabIndex={isVisible ? 0 : -1}
            onClick={() => {
              if (!isMdUp) {
                onClose();
              }
            }}
            className={({ isActive }) =>
              `flex items-center gap-2 px-3 py-2 rounded transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 ${
                isActive ? 'bg-neutral-200 dark:bg-neutral-800' : ''
              }`
            }
          >
            {it.icon}
            <span className="sr-only md:not-sr-only md:inline">
              {t(it.label)}
            </span>
          </NavLink>
        ))}
      </nav>
    </>
  );
};
