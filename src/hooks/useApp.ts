import { useContext } from 'react';
import { AppContext } from '../store/AppProvider';

/**
 * Custom hook for accessing the application context.
 * This hook provides access to the application's state and dispatch function.
 * @returns The application context, which includes the state and dispatch function.
 */
export const useApp = () => useContext(AppContext);
