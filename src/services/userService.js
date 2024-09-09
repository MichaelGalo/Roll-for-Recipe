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

import { ref, push, get, update, remove, query, orderByChild, equalTo } from "firebase/database";
import { database } from "./firebase"; // import the initialized Firebase database

// Get User by Email
export const getUserByEmail = async (email) => {
  const usersRef = ref(database, "users"); // reference to 'users' collection
  const emailQuery = query(usersRef, orderByChild("email"), equalTo(email));
  const snapshot = await get(emailQuery);

  if (snapshot.exists()) {
    const data = snapshot.val();
    const userId = Object.keys(data)[0]; // get the first user found (assuming unique emails)
    return { id: userId, ...data[userId] }; // return the user with ID
  } else {
    return null; // no user found
  }
};

// Create User
export const createUser = async (user) => {
  const usersRef = ref(database, "users"); // reference to 'users' collection
  const newUserRef = await push(usersRef, user); // push new user to database
  return { id: newUserRef.key, ...user }; // return created user with generated ID
};

// Get User by ID
export const getUserById = async (id) => {
  const userRef = ref(database, `users/${id}`); // reference to specific user by ID
  const snapshot = await get(userRef);

  if (snapshot.exists()) {
    return snapshot.val(); // return user data
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
