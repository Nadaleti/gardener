import { createStore, compose } from 'redux';

import sessionReducer from './reducers/session';
import { saveSessionToLocalStorage } from './localstorage';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(sessionReducer, composeEnhancers());
store.subscribe(() => {
  if (store.getState().token) saveSessionToLocalStorage(store.getState())
});

export default store;
