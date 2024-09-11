// import { getIngredientsForRecipe } from "./recipeService";

// export const fetchIngredients = async () => {
//   const response = await fetch("http://localhost:8088/ingredients");
//   return response.json();
// };

// export const updateIngredientsForRecipe = async (recipeId, ingredients) => {
//   // Filter out placeholder ingredients
//   const validIngredients = ingredients.filter(
//     (ingredient) => ingredient.ingredientId && ingredient.quantity
//   );

//   // Fetch existing ingredients for the recipe
//   const existingIngredients = await getIngredientsForRecipe(recipeId);

//   // Delete existing ingredients that are not in the updated list
//   const deletePromises = existingIngredients
//     .filter(
//       (existingIngredient) =>
//         !validIngredients.some(
//           (ingredient) => ingredient.id === existingIngredient.id
//         )
//     )
//     .map((ingredient) => {
//       return fetch(
//         `http://localhost:8088/ingredientsForRecipe/${ingredient.id}`,
//         {
//           method: "DELETE",
//         }
//       );
//     });

//   await Promise.all(deletePromises);

//   // Update or add ingredients
//   const updatePromises = validIngredients.map((ingredient) => {
//     const body = JSON.stringify({
//       ingredientId: parseInt(ingredient.ingredientId, 10),
//       recipeId: recipeId,
//       quantity: parseInt(ingredient.quantity, 10) || 0,
//     });

//     if (ingredient.id) {
//       return fetch(
//         `http://localhost:8088/ingredientsForRecipe/${ingredient.id}`,
//         {
//           method: "PUT",
//           headers: {
//             "Content-Type": "application/json",
//           },
//           body: body,
//         }
//       );
//     } else {
//       return fetch(`http://localhost:8088/ingredientsForRecipe`, {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: body,
//       });
//     }
//   });

//   const responses = await Promise.all(updatePromises);
//   return Promise.all(responses.map((response) => response.json()));
// };

// export const fetchGrocerySubtypeNames = async (subtypeIds) => {
//   const subtypePromises = subtypeIds.map((id) =>
//     fetch(`http://localhost:8088/grocerySubtypes/${id}`).then((response) =>
//       response.json()
//     )
//   );
//   const subtypes = await Promise.all(subtypePromises);
//   return subtypes.reduce((acc, subtype) => {
//     acc[subtype.id] = subtype.name;
//     return acc;
//   }, {});
// };


////////////////////////////////////////////
// Firebase version of the above functions
////////////////////////////////////////////

import { ref, get, update, remove, push, query, orderByChild, equalTo } from "firebase/database";
import { database } from "../../firebase"; // import the initialized Firebase database
import { getIngredientsForRecipe } from "./recipeService"; // assuming this is still used

// Fetch Ingredients
export const fetchIngredients = async () => {
  const ingredientsRef = ref(database, "ingredients"); // reference to 'ingredients' collection
  const snapshot = await get(ingredientsRef);

  if (snapshot.exists()) {
    return snapshot.val(); // return ingredients
  } else {
    return []; // return an empty array if no ingredients found
  }
};

// Update Ingredients for Recipe
export const updateIngredientsForRecipe = async (recipeId, ingredients) => {
  const validIngredients = ingredients.filter(
    (ingredient) => ingredient.ingredientId && ingredient.quantity
  );

  const existingIngredients = await getIngredientsForRecipe(recipeId);

  // Delete existing ingredients that are not in the updated list
  const existingIngredientIds = Object.keys(existingIngredients || {});
  const deletePromises = existingIngredientIds
    .filter(
      (id) =>
        !validIngredients.some(
          (ingredient) => ingredient.id === id
        )
    )
    .map((id) =>
      remove(ref(database, `ingredientsForRecipe/${id}`))
    );

  await Promise.all(deletePromises);

  // Update or add ingredients
  const updatePromises = validIngredients.map((ingredient) => {
    const ingredientData = {
      ingredientId: parseInt(ingredient.ingredientId, 10),
      recipeId: recipeId,
      quantity: parseInt(ingredient.quantity, 10) || 0,
    };

    if (ingredient.id) {
      return update(ref(database, `ingredientsForRecipe/${ingredient.id}`), ingredientData);
    } else {
      return push(ref(database, "ingredientsForRecipe"), ingredientData);
    }
  });

  const responses = await Promise.all(updatePromises);
  return responses.map(() => ingredientData); // return updated/added ingredients
};

// Fetch Grocery Subtype Names
export const fetchGrocerySubtypeNames = async (subtypeIds) => {
  const subtypePromises = subtypeIds.map((id) =>
    get(ref(database, `grocerySubtypes/${id}`)).then((snapshot) => {
      if (snapshot.exists()) {
        return snapshot.val();
      } else {
        return null;
      }
    })
  );

  const subtypes = await Promise.all(subtypePromises);
  return subtypes.reduce((acc, subtype) => {
    if (subtype) {
      acc[subtype.id] = subtype.name;
    }
    return acc;
  }, {});
};
