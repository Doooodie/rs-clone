import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './components/App';

import './components/i18n';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <React.Suspense fallback='loading'>
      <App />
    </React.Suspense>
  </React.StrictMode>,
);
