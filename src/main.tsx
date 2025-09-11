import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { AppProvider } from './store/AppProvider';
import { ToastProvider } from './components/feedback/Toast';
import { ConfirmProvider } from './components/feedback/ConfirmDialog';
import i18n from './i18n';

if ('serviceWorker' in navigator) {
  let refreshing = false;
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').then(async reg => {
      reg.onupdatefound = () => {
        const newWorker = reg.installing;
        if (newWorker) {
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              if (confirm(i18n.t('app.updateAvailable'))) {
                newWorker.postMessage({ type: 'SKIP_WAITING' });
              }
            }
          });
        }
      };

      if ('Notification' in window) {
        const permission = await Notification.requestPermission();
        if (permission === 'granted') {
          const sub = await reg.pushManager.getSubscription() || await reg.pushManager.subscribe({
            userVisibleOnly: true,
          });
          localStorage.setItem('pushEndpoint', sub.endpoint);
        }
      }
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

