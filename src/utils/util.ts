import { WithID } from "src/store/types";

export const sanitize = <T>(value: T) => JSON.parse(JSON.stringify(value));

export const objectToArray = <T>(data: { [key: string]: T } | undefined | null): undefined | WithID<T>[] => {
  if (data) {
    return Object.keys(data ?? {}).map(id =>({ id, ...data[id] }));
  }

  if (data === null) {
    return [];
  }

  return undefined;
}
