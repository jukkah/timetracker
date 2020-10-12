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

  return useCallback((values: any) => {
    const sanitizedValues = preSave(sanitize(values));
    setSaving(true);

    if (id) {
      return firestore.set(`${collectionName}/${id}`, sanitizedValues).finally(() => setSaving(false));
    } else {
      return firestore.add(collectionName, sanitizedValues)
        .finally(() => setSaving(false))
        .then(({ id }) => {
          history.push(`/${collectionName}/${id}`);
        });
    }
  }, [preSave, setSaving, id, collectionName, firestore, history]);
};

export default useSaveCallback;
