import { useContext } from 'react';
import { AppContext } from '../store/AppProvider';
import { selectTerritorios } from '../store/selectors';
import type { Territorio } from '../types/territorio';

export const useTerritorios = () => {
  const { state, dispatch } = useContext(AppContext);
  return {
    territorios: selectTerritorios(state),
    addTerritorio: (t: Territorio) => dispatch({ type: 'ADD_TERRITORIO', payload: t }),
  } as const;
};
