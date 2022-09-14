/** @format */

import * as React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { Provider } from "react-redux";
import store, { persistor } from "./stores";
import { PersistGate } from "redux-persist/lib/integration/react";

const App = () => (
  <Provider store={store}>
    <PersistGate loading={<div>loading</div>} persistor={persistor}>
      <Router>
        <Routes>
          <Route path='/' element={<Dashboard />} />
        </Routes>
      </Router>
    </PersistGate>
  </Provider>
);

export default App;
