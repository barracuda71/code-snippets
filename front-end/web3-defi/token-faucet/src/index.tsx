import React from 'react';
import ReactDOM from 'react-dom';
import { useLocalStore } from 'mobx-react-lite';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {createStore, Store} from "./domain/Store";

const StoreContext = React.createContext<Store | null>(null);

export const DataStoreProvider = ({ children }: any) => {
    const store = useLocalStore(createStore);
    return <StoreContext.Provider value={store}>{children}. </StoreContext.Provider>;
};
export const useDataStore = () => {
    const store = React.useContext(StoreContext);
    if (!store) {
        throw new Error('useStore must be used within a StoreProvider.');
    }
    return store;
};

ReactDOM.render(
  <React.StrictMode>
      <DataStoreProvider>
          <App />
      </DataStoreProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

reportWebVitals();
