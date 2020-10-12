import { createStore } from 'redux';
import rootReducer from './reducers';
import { composeWithDevTools } from 'redux-devtools-extension';

function configureStore(initialState = {}): any {
  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools()
  );

  return store;
}

export default configureStore;
