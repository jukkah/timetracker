import { useCallback } from "react";
import { sanitize } from "src/utils/util";
import { useFirestore } from "react-redux-firebase";
import { useHistory } from "react-router-dom";

type useSaveCallbackHookType = (
  setSaving: (saving: boolean) => void,
  collectionName: string,
  id?: string,
  options?: {
    preSave?: (values: any) => any;
    postSave?: () => void;
  }
) => ReturnType<typeof useCallback>;

const useSaveCallback: useSaveCallbackHookType = (
  setSaving,
  collectionName,
  id,
  options,
) => {
  const firestore = useFirestore();
  const history = useHistory();
  const preSave = options?.preSave ?? (values => values);
  const postSave = options?.postSave ?? (() => {});

  return useCallback((values: any) => {
    const sanitizedValues = preSave(sanitize(values));
    setSaving(true);

    const collection = firestore.collection(collectionName);
    const doc = id ? collection.doc(id) : collection.doc();
    const promise = doc.set(sanitizedValues);

    setSaving(false);

    if (! id) {
      history.push(`/${collectionName}/${id}`);
    }

    postSave();

    return promise;
  }, [preSave, postSave, setSaving, id, collectionName, firestore, history]);
};

export default useSaveCallback;
