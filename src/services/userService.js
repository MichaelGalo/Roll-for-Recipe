// export const getUserByEmail = (email) => {
//   return fetch(`http://localhost:8088/users?email=${email}`).then((res) =>
//     res.json()
//   );
// };

// export const createUser = (user) => {
//   return fetch("http://localhost:8088/users", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(user),
//   }).then((res) => res.json());
// };

// export const getUserById = async (id) => {
//   return await fetch(`http://localhost:8088/users/${id}`).then((res) =>
//     res.json()
//   );
// };

// export const updateUser = async (user) => {
//   return await fetch(`http://localhost:8088/users/${user.id}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(user),
//   }).then((res) => res.json());
// };


////////////////////////////////////////////
// Firebase version of the above functions
////////////////////////////////////////////

import { ref, set, push, get, update, remove, query, orderByChild, equalTo } from "firebase/database";
import { database } from "../../firebase"; // import the initialized Firebase database

// Get User by Email
export const getUserByEmail = async (email) => {
  const userRef = ref(database, 'users');
  const userQuery = query(userRef, orderByChild('email'), equalTo(email));
  const snapshot = await get(userQuery);
  if (snapshot.exists()) {
    return Object.values(snapshot.val()); // Return array of user objects
  } else {
    return [];
  }
};

// Create User
export const createUser = async (user) => {
  const userRef = ref(database, 'users/' + user.email.replace(/\./g, '_')); // Use email as the key, replacing periods
  await set(userRef, user);
  return { id: user.email }; // Assuming email as a unique identifier
};

// Get User by ID
export const getUserById = async (id) => {
  const userRef = ref(database, `users/${id}`); // reference to specific user by ID
  const snapshot = await get(userRef);

  if (snapshot.exists()) {
    const userData = snapshot.val();
    return { ...userData, id }; // return user data with id
  } else {
    return null; // user not found
  }
};

// Update User
export const updateUser = async (user) => {
  const userRef = ref(database, `users/${user.id}`); // reference to specific user by ID
  await update(userRef, user); // update user with new data
  return user; // return the updated user data
};

// Delete User
export const deleteUser = async (id) => {
  const userRef = ref(database, `users/${id}`); // reference to specific user by ID
  await remove(userRef); // delete user from the database
};
