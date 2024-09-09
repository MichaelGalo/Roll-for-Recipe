// export const getMealCategories = async () => {
//   return await fetch(`http://localhost:8088/mealTypes`).then((res) =>
//     res.json()
//   );
// };

////////////////////////////////////////////
// Firebase version of the above functions
////////////////////////////////////////////

import { ref, get } from "firebase/database";
import { database } from "./firebase"; // import the initialized Firebase database

// Get Meal Categories
export const getMealCategories = async () => {
  const mealCategoriesRef = ref(database, "mealTypes"); // reference to 'mealTypes' collection
  const snapshot = await get(mealCategoriesRef);

  if (snapshot.exists()) {
    return snapshot.val(); // return the meal categories
  } else {
    return null; // no meal categories found
  }
};