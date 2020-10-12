import { useFirestoreConnect, isLoaded, isEmpty, populate } from "react-redux-firebase";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppState } from "src/store/reducers";

export interface UseDocumentResultSet<T> {
  document?: T;
  id?: string;
  isNew: boolean;
  loading: boolean;
  notFound: boolean;
}

export interface useDocumentOptions {
  collection: string;
  paramName?: string;
  id?: string;
  populates?: { child: string, root: string }[];
}

const useDocument = <T>(params: string | useDocumentOptions): UseDocumentResultSet<T> => {
  const options = typeof params === 'string' ? { collection: params } : params;

  const id = getId(options.paramName ?? 'id', options.id, useParams());
  const isNew = id === 'new';

  useFirestoreConnect(() => {
    if (isNew || ! id) {
      return [];
    }

    return [{
      collection: options.collection,
      doc: id,
      storeAs: `${options.collection}-${id}`,
      populates: options.populates,
    }];
  });

  const document = useSelector((state: AppState) => populate(
    state.firestore,
    `${options.collection}-${id}`,
    options.populates ?? []
  ));
  const loading = !! id && ! isNew && ! isLoaded(document);
  const notFound = !! id && ! isNew && ! loading && isEmpty(document);

  return {
    document: document ?? undefined,
    id: isNew ? undefined : id,
    isNew,
    loading,
    notFound
  };
};

const getId = (name: string, id: string | undefined, params: ReturnType<typeof useParams>): string | undefined => id ?? params[name];

export default useDocument;
