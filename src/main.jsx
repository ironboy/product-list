import React from 'react';
import ReactDOM from 'react-dom/client';
import "../scss/style.scss";
import App from './App';

// Check if in prodcution (not dev server running on port 3000)
let inProduction = !location.host.includes(':3000');

// If in production and the browser support service workers
// then register the service-worker
if (inProduction && 'serviceWorker' in navigator) {
  navigator.serviceWorker.register('/serviceWorker.js')
    .then(reg => console.log('service worker registered', reg))
    .catch(err => console.log('service worker not registered', err));
}

ReactDOM.createRoot(document.querySelector('#root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);