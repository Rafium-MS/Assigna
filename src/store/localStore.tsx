import React, { createContext, useContext } from 'react';
import { useToast } from '../components/feedback/Toast';
import type { Assignment } from '../types/assignment';
import type { FieldExit } from '../types/field-exit';
import type { SuggestionRuleConfig } from '../types/suggestion-rule-config';
import type { Territory } from '../types/territory';
import { useLocalStorage } from '../hooks/useLocalStorage';
import { generateId } from '../utils/id';
import { notifyTerritoryReturn } from '../services/notifications';
import type { AuthState } from './appReducer';

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

  const sendReturnNotification = (territoryName: string) => {
    const endpoint = localStorage.getItem('pushEndpoint');
    if (!endpoint) return;

    void notifyTerritoryReturn({ endpoint, territoryName }).catch((error) => {
      console.error('Failed to notify territory return', error);
    });
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
          sendReturnNotification(territory ? territory.name : 'Território');
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

const AUTH_STORAGE_KEY = 'tm.auth';

export const loadPersistedAuthState = (): AuthState => {
  try {
    const raw = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!raw) {
      return { currentUser: null };
    }

    const parsed = JSON.parse(raw) as Partial<AuthState>;
    if (parsed && typeof parsed === 'object' && 'currentUser' in parsed) {
      const { currentUser } = parsed;
      if (!currentUser || typeof currentUser !== 'object') {
        return { currentUser: null };
      }
      if (typeof currentUser.id === 'string' && typeof currentUser.role === 'string') {
        const fallbackTimestamp = new Date().toISOString();
        return {
          currentUser: {
            ...currentUser,
            createdAt: typeof currentUser.createdAt === 'string' ? currentUser.createdAt : fallbackTimestamp,
            updatedAt: typeof currentUser.updatedAt === 'string' ? currentUser.updatedAt : fallbackTimestamp,
          },
        };
      }
    }
  } catch (error) {
    console.error('Failed to load auth state from storage', error);
  }

  try {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  } catch (error) {
    console.error('Failed to remove invalid auth state', error);
  }
  return { currentUser: null };
};

export const persistAuthState = (auth: AuthState) => {
  try {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(auth));
  } catch (error) {
    console.error('Failed to persist auth state', error);
  }
};

export const clearPersistedAuthState = () => {
  try {
    localStorage.removeItem(AUTH_STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear auth state from storage', error);
  }
};
