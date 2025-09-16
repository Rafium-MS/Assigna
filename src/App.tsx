import React, { useState } from 'react';
import { SchedulerControls } from './components/calendar/SchedulerControls';
import { useConfirm } from './components/feedback/ConfirmDialog';
import { Button } from './components/ui';
import { Shell } from './components/layout/Shell';
import TerritoriesPage from './pages/TerritoriesPage';
import StreetsPage from './pages/RuasNumeracoesPage';
import BuildingsVillagesPage from './pages/PrediosVilas';
import ExitsPage from './pages/ExitsPage';
import AssignmentsPage from './pages/AssignmentsPage';
import CalendarPage from './pages/CalendarPage';
import SuggestionsPage from './pages/SuggestionsPage';
import { AppProvider } from './store/AppProvider';
import { useApp } from './hooks/useApp';
import { useToast } from './components/feedback/Toast';
import { TerritorioRepository, SaidaRepository, DesignacaoRepository, SugestaoRepository } from './services/repositories';
import type { TabKey } from './types/navigation';

const pagesByTab: Record<TabKey, React.FC> = {
  territories: TerritoriesPage,
  streets: StreetsPage,
  buildingsVillages: BuildingsVillagesPage,
  exits: ExitsPage,
  assignments: AssignmentsPage,
  calendar: CalendarPage,
  suggestions: SuggestionsPage,
};

const AppRoutes: React.FC<{ tab: TabKey }> = ({ tab }) => {
  const PageComponent = pagesByTab[tab];
  return <PageComponent />;
};

const ClearAllButton: React.FC = () => {
  const { dispatch } = useApp();
  const toast = useToast();
  const confirm = useConfirm();

  const handleClick = async () => {
    if (!(await confirm('Limpar TODOS os dados?'))) {
      return;
    }

    try {
      await Promise.all([
        TerritorioRepository.clear(),
        SaidaRepository.clear(),
        DesignacaoRepository.clear(),
        SugestaoRepository.clear(),
      ]);
      dispatch({ type: 'RESET_STATE' });
      toast.success('Dados limpos');
    } catch (error) {
      console.error('Falha ao limpar dados', error);
      toast.error('Não foi possível limpar os dados');
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
    <AppProvider>
      <Shell currentTab={tab} onTabChange={setTab}>
        <AppRoutes tab={tab} />
        <SchedulerControls />
        <ClearAllButton />
      </Shell>
    </AppProvider>
  );
}
