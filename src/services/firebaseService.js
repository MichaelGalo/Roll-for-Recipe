// src/hooks/useFirebase.js
import { ref, set, get, remove, onValue } from 'firebase/database';
import { db } from '../firebase';

export const useFirebase = () => {
  const addData = (path, data) => {
    return set(ref(db, path), data);
  };

  const getData = (path) => {
    return get(ref(db, path));
  };

  const updateData = (path, data) => {
    return set(ref(db, path), data);
  };

  const deleteData = (path) => {
    return remove(ref(db, path));
  };

  const subscribeToData = (path, callback) => {
    const dataRef = ref(db, path);
    return onValue(dataRef, (snapshot) => {
      callback(snapshot.val());
    });
  };

  return { addData, getData, updateData, deleteData, subscribeToData };
};

// TODO: this is a placeholder for the firebase service, which needs review