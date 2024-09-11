// src/hooks/useFirebase.js
import { ref, set, get, remove, onValue } from 'firebase/database';
import { database } from "../../firebase";

export const useFirebase = () => {
  const addData = (path, data) => {
    return set(ref(database, path), data);
  };

  const getData = (path) => {
    return get(ref(database, path));
  };

  const updateData = (path, data) => {
    return set(ref(database, path), data);
  };

  const deleteData = (path) => {
    return remove(ref(database, path));
  };

  const subscribeToData = (path, callback) => {
    const dataRef = ref(database, path);
    return onValue(dataRef, (snapshot) => {
      callback(snapshot.val());
    });
  };

  return { addData, getData, updateData, deleteData, subscribeToData };
};

// TODO: this is a placeholder for the firebase service, which needs review