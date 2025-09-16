import React, { useState } from 'react';
import { SchedulerControls } from './components/calendar/SchedulerControls';
import { useConfirm } from './components/feedback/ConfirmDialog';
import { Button } from './components/ui';
import { Shell } from './components/layout/Shell';
import PrediosVilasPage from './pages/PrediosVilas';
import RuasNumeracoesPage from './pages/RuasNumeracoesPage';
import TerritoriesPage from './pages/TerritoriesPage';
import ExitsPage from './pages/ExitsPage';
import AssignmentsPage from './pages/AssignmentsPage';
import CalendarPage from './pages/CalendarPage';
import SuggestionsPage from './pages/SuggestionsPage';
import { StoreProvider, useStoreContext } from './store/localStore';
import type { TabKey } from './types/navigation';

const AppRoutes: React.FC<{ tab: TabKey }> = ({ tab }) => {
  switch (tab) {
    case 'territories':
      return <TerritoriesPage />;
    case 'streets':
      return <RuasNumeracoesPage />;
    case 'buildingsVillages':
      return <PrediosVilasPage />;
    case 'exits':
      return <ExitsPage />;
    case 'assignments':
      return <AssignmentsPage />;
    case 'calendar':
      return <CalendarPage />;
    case 'suggestions':
      return <SuggestionsPage />;
    default:
      return null;
  }
};

const ClearAllButton: React.FC = () => {
  const { clearAll } = useStoreContext();
  const confirm = useConfirm();

  const handleClick = async () => {
    if (await confirm('Limpar TODOS os dados?')) {
      clearAll();
    }
  };

  return (
    <div className="flex justify-end">
      <Button onClick={handleClick} className="mt-4 bg-red-600 text-white">
        Limpar TODOS os dados
      </Button>
    </div>
  );
};

export default function App() {
  const [tab, setTab] = useState<TabKey>('territories');

  return (
    <StoreProvider>
      <Shell currentTab={tab} onTabChange={setTab}>
        <AppRoutes tab={tab} />
        <SchedulerControls />
        <ClearAllButton />
      </Shell>
    </StoreProvider>
  );
}
