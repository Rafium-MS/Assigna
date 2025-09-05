declare module 'react' {
  const React: any;
  export default React;
  export function useState<T = any>(initial?: T): [T, (v: T) => void];
  export function useEffect(effect: any, deps?: any[]): void;
  export function useMemo<T = any>(factory: () => T, deps: any[]): T;
  export function useRef<T = any>(initial?: T): { current: T };
  export function useCallback<T extends (...args: any) => any>(fn: T, deps: any[]): T;
  export const Fragment: any;
  export function createElement(...args: any[]): any;
}

declare module 'react-dom' {
  const ReactDOM: any;
  export default ReactDOM;
}

declare module 'react-dom/client' {
  export function createRoot(...args: any[]): any;
}

declare module 'react/jsx-runtime' {
  export const jsx: any;
  export const jsxs: any;
  export const Fragment: any;
}

declare module '@fullcalendar/react' {
  const FullCalendar: any;
  export default FullCalendar;
  export interface EventDropArg extends Record<string, any> {}
  export interface EventResizeDoneArg extends Record<string, any> {}
}

declare module '@fullcalendar/daygrid';
declare module '@fullcalendar/interaction';

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}
