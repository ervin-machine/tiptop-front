import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import App from './App';
import history from './utils/history';
import configureStore from './store/configureStore';

const initialState = {};
const store = configureStore(history, initialState); // Correct order of arguments
const MOUNT_NODE = document.getElementById('root');

const root = ReactDOM.createRoot(MOUNT_NODE);

root.render(
  
  <Provider store={store}>
    <ConnectedRouter history={history}> {/* Ensure history is passed here */}
      <App />
    </ConnectedRouter>
  </Provider>
);
