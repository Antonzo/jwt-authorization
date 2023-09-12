import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import Store from './store';

interface IStore {
    store: Store;
}

const store = new Store();

export const StoreContext = React.createContext<IStore>({store});

const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement!);

root.render(
    <StoreContext.Provider value={{store}}>
        <App />,
    </StoreContext.Provider>
);