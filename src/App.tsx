import React, { useRef, useState } from 'react';
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
import { exportData } from './services/export';
import { importData } from './services/import';
import { db, SCHEMA_VERSION } from './services/db';
import {
  TerritorioRepository,
  SaidaRepository,
  DesignacaoRepository,
  SugestaoRepository
} from './services/repositories';
import { BuildingVillageRepository } from './services/repositories/buildings_villages';
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

const DataManagementControls: React.FC = () => {
  const { dispatch } = useApp();
  const toast = useToast();
  const confirm = useConfirm();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleExport = async () => {
    try {
      await exportData();
      toast.success('Arquivo de exportação gerado');
    } catch (error) {
      console.error('Falha ao exportar dados', error);
      toast.error('Não foi possível exportar os dados');
    }
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleImportFile: React.ChangeEventHandler<HTMLInputElement> = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const data = await importData(file);
      dispatch({ type: 'SET_TERRITORIOS', payload: data.territorios });
      dispatch({ type: 'SET_SAIDAS', payload: data.saidas });
      dispatch({ type: 'SET_DESIGNACOES', payload: data.designacoes });
      dispatch({ type: 'SET_SUGESTOES', payload: data.sugestoes });
      toast.success('Dados importados com sucesso');
    } catch (error) {
      console.error('Falha ao importar dados', error);
      toast.error('Não foi possível importar os dados');
    } finally {
      event.target.value = '';
    }
  };

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
        BuildingVillageRepository.clear(),
        db.streets.clear(),
        db.propertyTypes.clear(),
        db.addresses.clear(),
        db.derivedTerritories.clear(),
        db.derivedTerritoryAddresses.clear(),
        db.metadata.clear()
      ]);
      await db.metadata.put({ key: 'schemaVersion', value: SCHEMA_VERSION });
      dispatch({ type: 'RESET_STATE' });
      toast.success('Dados limpos');
    } catch (error) {
      console.error('Falha ao limpar dados', error);
      toast.error('Não foi possível limpar os dados');
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
        <Button onClick={handleExport} className="mt-4 bg-neutral-100">
          Exportar
        </Button>
        <Button onClick={handleImportClick} className="mt-4 bg-neutral-100">
          Importar
        </Button>
        <Button onClick={handleClick} className="mt-4 bg-red-600 text-white">
          Limpar TODOS os dados
        </Button>
      </div>
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
        <DataManagementControls />
      </Shell>
    </AppProvider>
  );
}
