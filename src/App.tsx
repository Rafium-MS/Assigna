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
import { AppProvider } from './store/AppProvider';
import { useApp } from './hooks/useApp';
import { useToast } from './components/feedback/Toast';
import { TerritorioRepository, SaidaRepository, DesignacaoRepository, SugestaoRepository } from './services/repositories';
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
