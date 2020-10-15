import { isEmpty, isLoaded, populate, useFirestoreConnect } from 'react-redux-firebase';
import { useSelector } from 'react-redux';
import { AppState } from 'src/store/reducers';
import { WithID } from 'src/store/types';
import { objectToArray } from 'src/utils/util';

export interface UseCollectionOptions {
  collection: string;
  populates?: { child: string, root: string }[];
  where?: any;
  orderBy?: any;
  limit?: number;
  storeAs?: string;
}

export interface UseCollectionResultSet<T> {
  documents: WithID<T>[];
  isLoading: boolean;
  isEmpty: boolean;
}

const useCollection = <T>(params: string | UseCollectionOptions): UseCollectionResultSet<T> => {
  const options = typeof params === 'string' ? { collection: params } : params;

  useFirestoreConnect(() => [options]);

  const documents = useSelector((state: AppState) => {
    if (options.populates) {
      return objectToArray<T>(populate(state.firestore, options.storeAs ?? options.collection, options.populates));
    } else {
      return objectToArray<T>(state.firestore.data[options.storeAs ?? options.collection]);
    }
  });

  return {
    documents: documents ?? [],
    isLoading: ! isLoaded(documents),
    isEmpty: isEmpty(documents),
  };
};

export default useCollection;
