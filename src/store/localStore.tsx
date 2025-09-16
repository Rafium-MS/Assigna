import React, { createContext, useContext } from 'react';
import { useToast } from '../components/feedback/Toast';
import type { Assignment } from '../types/assignment';
import type { FieldExit } from '../types/field-exit';
import type { SuggestionRuleConfig } from '../types/suggestion-rule-config';
import type { Territory } from '../types/territory';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { generateId } from '../utils/id';

export interface StoreContextValue {
  territories: Territory[];
  exits: FieldExit[];
  assignments: Assignment[];
  rules: SuggestionRuleConfig;
  setRules: React.Dispatch<React.SetStateAction<SuggestionRuleConfig>>;
  warningDays: number;
  setWarningDays: React.Dispatch<React.SetStateAction<number>>;
  addTerritory: (territory: Omit<Territory, 'id'>) => void;
  delTerritory: (id: string) => void;
  updateTerritory: (id: string, territory: Omit<Territory, 'id'>) => void;
  addExit: (exit: Omit<FieldExit, 'id'>) => void;
  delExit: (id: string) => void;
  updateExit: (id: string, exit: Omit<FieldExit, 'id'>) => void;
  addAssignment: (assignment: Omit<Assignment, 'id'>) => void;
  delAssignment: (id: string) => void;
  updateAssignment: (id: string, assignment: Omit<Assignment, 'id'>) => void;
  clearAll: () => void;
}

const StoreContext = createContext<StoreContextValue | null>(null);

const useLocalStore = (): StoreContextValue => {
  const toast = useToast();
  const [territories, setTerritories] = useLocalStorage<Territory[]>('tm.territories', []);
  const [exits, setExits] = useLocalStorage<FieldExit[]>('tm.exits', []);
  const [assignments, setAssignments] = useLocalStorage<Assignment[]>('tm.assignments', []);
  const [rules, setRules] = useLocalStorage<SuggestionRuleConfig>('tm.rules', {
    avoidLastAssignments: 5,
    defaultDurationDays: 30,
    avoidMonthsPerExit: 6,
    recentWeight: 1,
    balanceWeight: 1,
  });
  const [warningDays, setWarningDays] = useLocalStorage<number>('tm.warningDays', 2);

  const addTerritory = (territory: Omit<Territory, 'id'>) => {
    setTerritories((prev) => [{ id: generateId(), ...territory }, ...prev]);
    toast.success('Território salvo');
  };

  const delTerritory = (id: string) => {
    setTerritories((prev) => prev.filter((territory) => territory.id !== id));
    setAssignments((prev) => prev.filter((assignment) => assignment.territoryId !== id));
    toast.success('Território removido');
  };

  const updateTerritory = (id: string, territory: Omit<Territory, 'id'>) => {
    setTerritories((prev) => prev.map((item) => (item.id === id ? { ...item, ...territory } : item)));
    toast.success('Território atualizado');
  };

  const addExit = (exit: Omit<FieldExit, 'id'>) => {
    setExits((prev) => [{ id: generateId(), ...exit }, ...prev]);
    toast.success('Saída salva');
  };

  const delExit = (id: string) => {
    setExits((prev) => prev.filter((exit) => exit.id !== id));
    setAssignments((prev) => prev.filter((assignment) => assignment.fieldExitId !== id));
    toast.success('Saída removida');
  };

  const updateExit = (id: string, exit: Omit<FieldExit, 'id'>) => {
    setExits((prev) => prev.map((item) => (item.id === id ? { ...item, ...exit } : item)));
    toast.success('Saída atualizada');
  };

  const notifyReturn = (territoryName: string) => {
    const endpoint = localStorage.getItem('pushEndpoint');
    if (!endpoint) return;

    fetch('/api/notify', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        endpoint,
        title: 'Território devolvido',
        body: `${territoryName} foi devolvido`,
      }),
    }).catch(() => {});
  };

  const addAssignment = (assignment: Omit<Assignment, 'id'>) => {
    setAssignments((prev) => [{ id: generateId(), returned: false, ...assignment }, ...prev]);
    toast.success('Designação salva');
  };

  const delAssignment = (id: string) => {
    setAssignments((prev) => prev.filter((assignment) => assignment.id !== id));
    toast.success('Designação removida');
  };

  const updateAssignment = (id: string, assignment: Omit<Assignment, 'id'>) => {
    setAssignments((prev) =>
      prev.map((item) => {
        if (item.id !== id) return item;
        const updated = { ...item, ...assignment };
        if (!item.returned && updated.returned) {
          const territory = territories.find((territoryItem) => territoryItem.id === item.territoryId);
          notifyReturn(territory ? territory.name : 'Território');
        }
        return updated;
      }),
    );
    toast.success('Designação atualizada');
  };

  const clearAll = () => {
    setTerritories([]);
    setExits([]);
    setAssignments([]);
    toast.success('Dados limpos');
  };

  return {
    territories,
    exits,
    assignments,
    rules,
    setRules,
    warningDays,
    setWarningDays,
    addTerritory,
    delTerritory,
    updateTerritory,
    addExit,
    delExit,
    updateExit,
    addAssignment,
    delAssignment,
    updateAssignment,
    clearAll,
  };
};

export const StoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const store = useLocalStore();
  return <StoreContext.Provider value={store}>{children}</StoreContext.Provider>;
};

export const useStoreContext = (): StoreContextValue => {
  const context = useContext(StoreContext);
  if (!context) {
    throw new Error('StoreContext is missing');
  }
  return context;
};
