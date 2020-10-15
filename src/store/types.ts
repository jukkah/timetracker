import { firestore } from "firebase";

export type WithID<T> = T & { id: string };

export interface Record {
  type: "in" | "out";
  timestamp: firestore.Timestamp;
}
