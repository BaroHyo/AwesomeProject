import {
  collection,
  addDoc,
  updateDoc,
  onSnapshot,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
} from 'firebase/firestore';
import { database } from './firebase';

export const onGet = (table: string) => getDocs(collection(database, table));

export const onGetById = (table: string, id: string) =>
  getDoc(doc(database, table, id));

export const onPost = (table: string, body: any) =>
  addDoc(collection(database, table), body);

export const onPut = (table: string, body: any, id: string) =>
  updateDoc(doc(database, table, id), body);

export const onDelete = (table: string, id: string) =>
  deleteDoc(doc(database, table, id));
