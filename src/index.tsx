import { StrictMode, Suspense } from 'react';
import ReactDOM from 'react-dom/client';
import Loading from './components/Loading';
import App from './components/App';

import './components/i18n/i18n';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <StrictMode>
    <Suspense fallback={<Loading />}>
      <App />
    </Suspense>
  </StrictMode>,
);
