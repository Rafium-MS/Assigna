import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { AppProvider } from './store/AppContext';
import { ToastProvider } from './components/Toast';
import { ConfirmProvider } from './components/ConfirmDialog';

if ('serviceWorker' in navigator) {
  let refreshing = false;
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(reg => {
      reg.onupdatefound = () => {
        const newWorker = reg.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              if (confirm('Nova versão disponível. Atualizar?')) {
                newWorker.postMessage({ type: 'SKIP_WAITING' });
              }
            }
          });
        }
      };
    });
  });
  navigator.serviceWorker.addEventListener('controllerchange', () => {
    if (!refreshing) {
      window.location.reload();
      refreshing = true;
    }
  });
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppProvider>
      <ToastProvider>
        <ConfirmProvider>
          <App />
        </ConfirmProvider>
      </ToastProvider>
    </AppProvider>
  </React.StrictMode>
);

