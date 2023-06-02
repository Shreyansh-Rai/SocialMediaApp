import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import authReducer from "./state";
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from "react-redux";
import {persistStore,persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER} from "redux-persist";
import storage from "redux-persist/lib/storage";
import { PersistGate } from 'redux-persist/integration/react';
//To store everything in the user's cache.

// Why Redux to manage the state in this application ?
// By using Redux, you can simplify the management of application state, improve predictability, 
// and facilitate state sharing between components. It helps in separating concerns and makes it easier 
// to reason about how data flows through the application. Redux is particularly beneficial for applications 
// with complex data dependencies, large-scale state management, and the need for time-travel debugging or 
// state persistence.
// The store is an object that holds the application state. It is created using the Redux createStore() 
// function and manages the state tree of the application. The store provides methods to access, update, 
// and subscribe to changes in the state.
// Reducers are pure functions that specify how the application state should change in response to an action. 
// They take the current state and an action as input and return a new state object. Reducers should not modify
//  the existing state but instead produce a new state based on the action.


//Copy code from : https://redux-toolkit.js.org/tutorials/quick-start and https://blog.reactnativecoach.com/the-definitive-guide-to-redux-persist-84738167975
const persistConfig = { key: "root", storage, version: 1 };
const persistedReducer = persistReducer(persistConfig, authReducer);
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistStore(store)}>
        <App />
      </PersistGate>
    </Provider>
  </React.StrictMode>
);

