import './index.css';
import React from 'react';
import App from './App';
import ReactDOM from 'react-dom/client';
import 'bootstrap/dist/css/bootstrap.min.css';

// In local dev, a previously-installed service worker can intercept API calls
// and return "from service worker" responses. Ensure dev always runs SW-free.
if (process.env.NODE_ENV !== 'production' && 'serviceWorker' in navigator) {
  navigator.serviceWorker
    .getRegistrations()
    .then((registrations) => Promise.all(registrations.map((r) => r.unregister())))
    .then(() => {
      if ('caches' in window) {
        return caches.keys().then((keys) => Promise.all(keys.map((k) => caches.delete(k))));
      }
      return undefined;
    })
    .catch(() => {
      // Best-effort: don't block app render in dev.
    });
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);