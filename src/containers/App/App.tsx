import React from 'react';
import { Provider } from 'react-redux';
import { ReactReduxFirebaseProvider } from 'react-redux-firebase';
import { createFirestoreInstance } from 'redux-firestore';
import firebase from 'firebase/app';
import 'firebase/firestore';
import configureStore from 'src/store/createStore';
import { fbConfig, rfConfig } from 'src/config';
import Router from './Router';

// Initialize Firebase instance
firebase.initializeApp(fbConfig || process.env.REACT_APP_FIREBASE_CONFIG);
firebase.firestore().enablePersistence();

// Store Initialization
// ------------------------------------
// eslint-disable-next-line no-underscore-dangle
const initialState = /*window.___INITIAL_STATE__ || */{
  firebase: { authError: null },
};

const store = configureStore(initialState);

function App() {
  return (
    <Provider store={store}>
      <ReactReduxFirebaseProvider
        firebase={firebase}
        config={rfConfig}
        dispatch={store.dispatch}
        createFirestoreInstance={createFirestoreInstance}
      >
        <Router />
      </ReactReduxFirebaseProvider>
    </Provider>
  );
}

export default App;
