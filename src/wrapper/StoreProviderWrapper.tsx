/** @format */

import { Provider } from 'react-redux';
import { PersistGate } from "redux-persist/lib/integration/react";
import LoadingScreen from 'components/LoadingScreen';
import store, { persistor } from 'stores';

interface StoreProviderProps {
  children: React.ReactNode;
}

function StoreProvider(props: StoreProviderProps) {
  return (
    <Provider store={store}>
      <PersistGate loading={<LoadingScreen/>} persistor={persistor}>
        {props.children}
      </PersistGate>
    </Provider>
  );
}

export default StoreProvider;
