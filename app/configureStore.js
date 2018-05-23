import { createStore, applyMiddleware, AsyncStorage } from 'redux';
import thunkMiddleware from 'redux-thunk';
import rootReducer from './reducers';
import { persistStore, autoRehydrate } from 'redux-persist';
//import { asyncSessionStorage } from 'redux-persist/storages';
// import localStorage from 'localStorage';
let middleware = [thunkMiddleware];

if (process.env.NODE_ENV !== 'production') {
  let b = require('redux-logger');
  middleware = [...middleware, b()];
}

const createStoreWithMiddleware = applyMiddleware(...middleware)(createStore);

export default function configureStore(initialState) {
  // initialState = undefined;
  const store = createStoreWithMiddleware(
    rootReducer,
    initialState,
    // autoRehydrate(),
    // Required! Enable Redux DevTools with the monitors you chose
  );

  // const store = createStore(
  //   rootReducer,
  //   initialState,
  //   applyMiddleware(...middleware),
  //   autoRehydrate()
  // );

  if (typeof window !== 'undefined') persistStore(store);

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('./reducers', () => {
      const nextRootReducer = require('./reducers').default;
      store.replaceReducer(nextRootReducer);
    });
  }

  return store;
};
