import { useRef } from 'react';
import type { ComponentType } from 'react';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { SchedulerControls } from './components/calendar/SchedulerControls';
import { useConfirm } from './components/feedback/ConfirmDialog';
import { Button } from './components/ui';
import { Shell } from './components/layout/Shell';
import TerritoriesPage from './pages/TerritoriesPage';
import StreetsPage from './pages/RuasNumeracoesPage';
import BuildingsVillagesPage from './pages/PrediosVilas';
import CartasPage from './pages/CartasPage';
import ExitsPage from './pages/ExitsPage';
import AssignmentsPage from './pages/AssignmentsPage';
import CalendarPage from './pages/CalendarPage';
import SuggestionsPage from './pages/SuggestionsPage';
import NaoEmCasaPage from './pages/NaoEmCasaPage';
import UsersPage from './pages/UsersPage';
import TodayAssignmentsPage from './pages/TodayAssignmentsPage';
import RegisterPage from './pages/RegisterPage';
import CampaignPage from './pages/CampaignPage';
import { AppProvider } from './store/AppProvider';
import { useApp } from './hooks/useApp';
import { useAuth } from './hooks/useAuth';
import { useToast } from './components/feedback/Toast';
import { exportData } from './services/export';
import { importData } from './services/import';
import {
  db,
  SCHEMA_VERSION,
  ensureDefaultPropertyTypesSeeded,
} from './services/db';
import {
  TerritorioRepository,
  SaidaRepository,
  DesignacaoRepository,
  SugestaoRepository,
  NaoEmCasaRepository,
  UserRepository,
} from './services/repositories';
import { BuildingVillageRepository } from './services/repositories/buildings_villages';
import type { TabKey } from './types/navigation';
import { authRoutes, routeEntries } from './routes';
import UnauthorizedPage from './pages/UnauthorizedPage';
import { ADMIN_MASTER_ROLE } from './constants/roles';

const UNAUTHORIZED_ROUTE = '/unauthorized';
const REGISTER_ROUTE = authRoutes.register;
const ADMIN_MASTER_ROLE_NORMALIZED = ADMIN_MASTER_ROLE.toLowerCase();

const pagesByTab: Record<TabKey, ComponentType> = {
  territories: TerritoriesPage,
  streets: StreetsPage,
  buildingsVillages: BuildingsVillagesPage,
  letters: CartasPage,
  exits: ExitsPage,
  assignments: AssignmentsPage,
  users: UsersPage,
  todayAssignments: TodayAssignmentsPage,
  calendar: CalendarPage,
  suggestions: SuggestionsPage,
  notAtHome: NaoEmCasaPage,
  campaign: CampaignPage,
};

interface GuardedRouteProps {
  component: ComponentType;
  allowedRoles: ReadonlyArray<string>;
  currentRole: string | null;
  path: string;
}

export const RouteGuard = ({
  component: Component,
  allowedRoles,
  currentRole,
  path,
}: GuardedRouteProps): JSX.Element => {
  const normalizedRole = currentRole?.toLowerCase() ?? null;
  const canAccess =
    normalizedRole !== null &&
    allowedRoles.some((role) => role.toLowerCase() === normalizedRole);

  if (normalizedRole === null) {
    return (
      <Navigate
        to={REGISTER_ROUTE}
        replace
        state={{ from: path, reason: 'unauthenticated' }}
      />
    );
  }

  if (!canAccess) {
    return (
      <Navigate
        to={UNAUTHORIZED_ROUTE}
        replace
        state={{ from: path, reason: 'unauthorized' }}
      />
    );
  }

  return <Component />;
};

const DataManagementControls: React.FC = () => {
  const { dispatch } = useApp();
  const toast = useToast();
  const confirm = useConfirm();
  const { t } = useTranslation();
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { currentUser } = useAuth();

  const handleExport = async () => {
    try {
      if (!currentUser?.id) {
        toast.error(t('app.exportError'));
        console.error('Exportação falhou: nenhum publicador autenticado.');
        return;
      }

      await exportData(currentUser.id);
      toast.success(t('app.exportSuccess'));
    } catch (error) {
      console.error(t('app.exportError'), error);
      toast.error(t('app.exportError'));
    }
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleImportFile: React.ChangeEventHandler<HTMLInputElement> = async (
    event,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const data = await importData(file);
      dispatch({ type: 'SET_TERRITORIOS', payload: data.territorios });
      dispatch({ type: 'SET_SAIDAS', payload: data.saidas });
      dispatch({ type: 'SET_DESIGNACOES', payload: data.designacoes });
      dispatch({ type: 'SET_SUGESTOES', payload: data.sugestoes });
      dispatch({ type: 'SET_NAO_EM_CASA', payload: data.naoEmCasa });
      dispatch({ type: 'SET_USERS', payload: data.users });
      toast.success(t('app.importSuccess'));
    } catch (error) {
      console.error(t('app.importError'), error);
      toast.error(t('app.importError'));
    } finally {
      event.target.value = '';
    }
  };

  const handleClick = async () => {
    if (!(await confirm(t('app.clearConfirm')))) {
      return;
    }

    try {
      await Promise.all([
        TerritorioRepository.clear(),
        SaidaRepository.clear(),
        DesignacaoRepository.clear(),
        SugestaoRepository.clear(),
        NaoEmCasaRepository.clear(),
        UserRepository.clear(),
        BuildingVillageRepository.clear(),
        db.streets.clear(),
        db.propertyTypes.clear(),
        db.addresses.clear(),
        db.derivedTerritories.clear(),
        db.derivedTerritoryAddresses.clear(),
        db.naoEmCasa.clear(),
        db.metadata.clear(),
      ]);
      await ensureDefaultPropertyTypesSeeded();
      await db.metadata.put({ key: 'schemaVersion', value: SCHEMA_VERSION });
      dispatch({ type: 'RESET_STATE' });
      toast.success(t('app.clearSuccess'));
    } catch (error) {
      console.error(t('app.clearError'), error);
      toast.error(t('app.clearError'));
    }
  };

  return (
    <div className="flex flex-col items-end gap-2">
      <input
        ref={fileInputRef}
        type="file"
        accept="application/json,application/*+json"
        onChange={handleImportFile}
        className="hidden"
      />
      <div className="flex flex-wrap justify-end gap-2">
        <Button
          onClick={handleExport}
          className="mt-4 bg-neutral-100 text-neutral-900 hover:bg-neutral-200 border-neutral-200 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700 dark:border-neutral-700"
        >
          Exportar
        </Button>
        <Button
          onClick={handleImportClick}
          className="mt-4 bg-neutral-100 text-neutral-900 hover:bg-neutral-200 border-neutral-200 dark:bg-neutral-800 dark:text-neutral-100 dark:hover:bg-neutral-700 dark:border-neutral-700"
        >
          Importar
        </Button>
        <Button onClick={handleClick} className="mt-4 bg-red-600 text-white">
          Limpar TODOS os dados
        </Button>
      </div>
    </div>
  );
};

export const AppContent = () => {
  const { currentUser } = useAuth();
  const currentRole = currentUser?.role ?? null;
  const normalizedRole = currentRole?.toLowerCase() ?? null;
  const canManageScheduler = normalizedRole === ADMIN_MASTER_ROLE_NORMALIZED;
  const canManageData = normalizedRole === ADMIN_MASTER_ROLE_NORMALIZED;

  return (
    <Shell>
      <Routes>
        <Route path={REGISTER_ROUTE} element={<RegisterPage />} />
        {routeEntries.map(([key, config]) => {
          const PageComponent = pagesByTab[key];
          return (
            <Route
              key={key}
              path={config.path}
              element={
                <RouteGuard
                  component={PageComponent}
                  allowedRoles={config.allowedRoles}
                  currentRole={currentRole}
                  path={config.path}
                />
              }
            />
          );
        })}
        <Route path={UNAUTHORIZED_ROUTE} element={<UnauthorizedPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
      {canManageScheduler && <SchedulerControls />}
      {canManageData && <DataManagementControls />}
    </Shell>
  );
};

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <AppContent />
      </BrowserRouter>
    </AppProvider>
  );
}
