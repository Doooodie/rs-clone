import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './store';

import NoPage from './pages/NoPage/NoPage';
import Home from './pages/Home/Home';
import Cart from './pages/Cart/Cart';
import Explorer from './pages/Explorer/Explorer';
import Layout from './pages/Layout/Layout';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Layout />}>
              <Route index element={<Home />} />
              <Route path='cart' element={<Cart />} />
              <Route path='*' element={<NoPage />} />
            </Route>
            <Route path='/drive' element={<Explorer />} />
          </Routes>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
