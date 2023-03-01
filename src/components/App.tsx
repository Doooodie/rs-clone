import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './store';

import Layout from './pages/Layout/Layout';
import NoPage from './pages/NoPage/NoPage';
import Home from './pages/Home/Home';
import Drive from './pages/Drive/Drive';
import PrivateRoutes from './utils/PrivateRoutes';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={<Home />} />
              <Route element={<PrivateRoutes />}>
                <Route path='/drive' element={<Drive />} />
              </Route>
              <Route path='*' element={<NoPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
