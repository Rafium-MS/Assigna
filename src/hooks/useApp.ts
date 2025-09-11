import { useContext } from 'react';
import { AppContext } from '../store/AppProvider';

export const useApp = () => useContext(AppContext);
