// export const getAllRecipes = async () => {
//   const response = await fetch("http://localhost:8088/recipes");
//   const recipes = await response.json();
//   return recipes;
// };

// export const getRecipesByUserId = async (userId) => {
//   return await fetch(
//     `http://localhost:8088/recipes?userId=${userId}&_expand=user&_expand=mealType`
//   ).then((res) => res.json());
// };

// export const getRecipeById = async (id) => {
//   return await fetch(
//     `http://localhost:8088/recipes/${id}?_expand=user&_expand=mealType`
//   ).then((res) => res.json());
// };

// export const updateRecipe = async (recipe) => {
//   return await fetch(`http://localhost:8088/recipes/${recipe.id}`, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(recipe),
//   }).then((res) => res.json());
// };

// export const addRecipe = async (recipe) => {
//   const response = await fetch("http://localhost:8088/recipes", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(recipe),
//   });
//   const data = await response.json();
//   return data.id;
// };

// export const addIngredients = async (recipeId, ingredients) => {
//   const formattedIngredients = ingredients
//     .filter((ingredient) => ingredient.ingredientId && ingredient.quantity)
//     .map((ingredient) => ({
//       ingredientId: parseInt(ingredient.ingredientId),
//       recipeId: recipeId,
//       quantity: parseInt(ingredient.quantity, 10) || 0,
//     }));

//   const promises = formattedIngredients.map((ingredient) =>
//     fetch(`http://localhost:8088/ingredientsForRecipe`, {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(ingredient),
//     })
//   );

//   const responses = await Promise.all(promises);
//   return Promise.all(responses.map((response) => response.json()));
// };

// export const getIngredientsForRecipe = async (recipeId) => {
//   const response = await fetch(
//     `http://localhost:8088/ingredientsForRecipe?recipeId=${recipeId}&_expand=ingredient`
//   );
//   return response.json();
// };

// export const deleteRecipe = async (id) => {
//   const ingredients = await getIngredientsForRecipe(id);
//   const deletePromises = ingredients.map((ingredient) =>
//     fetch(`http://localhost:8088/ingredientsForRecipe/${ingredient.id}`, {
//       method: "DELETE",
//     })
//   );
//   // Wait for all ingredient deletions to complete
//   await Promise.all(deletePromises);

//   const recipeResponse = await fetch(`http://localhost:8088/recipes/${id}`, {
//     method: "DELETE",
//   });

//   return recipeResponse.json();
// };

// //TODO: consider removing due to DRY violation
// export const getRecipeByUserId = async (userId) => {
//   return await fetch(
//     `http://localhost:8088/recipes?userId=${userId}&_expand=user&_expand=mealTypes`
//   ).then((res) => res.json());
// };

// export const getFavoriteAuthorMealsByUserId = async (userId) => {
//   return await fetch(
//     `http://localhost:8088/recipes?userId=${userId}&authorFavorite=true&_expand=user&_expand=mealType`
//   ).then((res) => res.json());
// };

// export const getFavoriteNonAuthorMealsByUserId = async (userId) => {
//   return await fetch(
//     `http://localhost:8088/recipeLikes?userId=${userId}&_expand=recipe`
//   ).then((res) => res.json());
// };

// export const getRecipeLikesByRecipeIdAndUserId = async (recipeId, userId) => {
//   return await fetch(
//     `http://localhost:8088/recipeLikes?recipeId=${recipeId}&userId=${userId}`
//   ).then((res) => res.json());
// };

// export const likeRecipe = async (recipeId, userId) => {
//   // First, create the like
//   const newLike = await fetch(`http://localhost:8088/recipeLikes`, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ recipeId, userId }),
//   }).then((res) => res.json());
//   // Then, get the current recipe
//   const recipe = await getRecipeById(recipeId);
//   // Update the recipe's favorites count
//   const updatedRecipe = {
//     ...recipe,
//     favorites: (recipe.favorites || 0) + 1,
//   };
//   // Save the updated recipe
//   await updateRecipe(updatedRecipe);

//   return newLike;
// };

// export const unlikeRecipe = async (likeId, recipeId) => {
//   // First, delete the like
//   await fetch(`http://localhost:8088/recipeLikes/${likeId}`, {
//     method: "DELETE",
//   });
//   // Then, get the current recipe
//   const recipe = await getRecipeById(recipeId);
//   // Update the recipe's favorites count
//   const updatedRecipe = {
//     ...recipe,
//     favorites: Math.max((recipe.favorites || 0) - 1, 0), // Ensure it doesn't go below 0
//   };
//   // Save the updated recipe
//   const result = await updateRecipe(updatedRecipe);

//   return updatedRecipe;
// };


////////////////////////////////////////////
// Firebase version of the above functions
////////////////////////////////////////////

import { ref, push, get, update, remove, query, orderByChild, equalTo, child } from "firebase/database";
import { database } from "../../firebase"; // import the initialized Firebase database

// Get All Recipes
export const getAllRecipes = async () => {
  const recipesRef = ref(database, "recipes"); // reference to 'recipes' collection
  const snapshot = await get(recipesRef);

  if (snapshot.exists()) {
    return snapshot.val(); // return all recipes
  } else {
    return []; // return an empty array if no recipes found
  }
};

// Get Recipes by User ID
export const getRecipesByUserId = async (userId) => {
  const recipesRef = ref(database, "recipes");
  const recipesQuery = query(recipesRef, orderByChild("userId"), equalTo(userId));
  const snapshot = await get(recipesQuery);

  if (snapshot.exists()) {
    return snapshot.val(); // return recipes for the user
  } else {
    return []; // return an empty array if no recipes found
  }
};

// Get Recipe by ID
export const getRecipeById = async (id) => {
  const recipeRef = ref(database, `recipes/${id}`); // reference to specific recipe by ID
  const snapshot = await get(recipeRef);

  if (snapshot.exists()) {
    return snapshot.val(); // return recipe data
  } else {
    return null; // recipe not found
  }
};

// Update Recipe
export const updateRecipe = async (recipe) => {
  const recipeRef = ref(database, `recipes/${recipe.id}`); // reference to specific recipe by ID
  await update(recipeRef, recipe); // update recipe data
  return recipe; // return updated recipe data
};

// Add Recipe
export const addRecipe = async (recipe) => {
  const recipesRef = ref(database, "recipes"); // reference to 'recipes' collection
  const newRecipeRef = await push(recipesRef, recipe); // push new recipe to database
  return { id: newRecipeRef.key, ...recipe }; // return created recipe with generated ID
};

// Add Ingredients
export const addIngredients = async (recipeId, ingredients) => {
  const ingredientsRef = ref(database, "ingredientsForRecipe");
  
  const formattedIngredients = ingredients
    .filter((ingredient) => ingredient.ingredientId && ingredient.quantity)
    .map((ingredient) => ({
      ingredientId: parseInt(ingredient.ingredientId),
      recipeId: recipeId,
      quantity: parseInt(ingredient.quantity, 10) || 0,
    }));

  const promises = formattedIngredients.map((ingredient) =>
    push(ingredientsRef, ingredient)
  );

  const responses = await Promise.all(promises);
  return responses.map((response) => ({ id: response.key, ...ingredient })); // return list of added ingredients
};

// Get Ingredients for Recipe
export const getIngredientsForRecipe = async (recipeId) => {
  const ingredientsRef = ref(database, "ingredientsForRecipe");
  const ingredientsQuery = query(ingredientsRef, orderByChild("recipeId"), equalTo(recipeId));
  const snapshot = await get(ingredientsQuery);

  if (snapshot.exists()) {
    return snapshot.val(); // return ingredients for the recipe
  } else {
    return []; // return an empty array if no ingredients found
  }
};

// Delete Recipe
export const deleteRecipe = async (id) => {
  const ingredients = await getIngredientsForRecipe(id);
  const deletePromises = Object.keys(ingredients).map((ingredientId) =>
    remove(ref(database, `ingredientsForRecipe/${ingredientId}`))
  );
  // Wait for all ingredient deletions to complete
  await Promise.all(deletePromises);

  const recipeRef = ref(database, `recipes/${id}`);
  await remove(recipeRef); // delete recipe from the database

  return { id }; // return the deleted recipe ID
};

// Get Favorite Author Meals by User ID
export const getFavoriteAuthorMealsByUserId = async (userId) => {
  const recipesRef = ref(database, "recipes");
  const recipesQuery = query(recipesRef, orderByChild("userId"), equalTo(userId));
  const snapshot = await get(recipesQuery);

  if (snapshot.exists()) {
    const recipes = snapshot.val();
    return Object.values(recipes).filter(recipe => recipe.authorFavorite); // return favorite author meals
  } else {
    return []; // return an empty array if no favorite meals found
  }
};

// Get Favorite Non-Author Meals by User ID
export const getFavoriteNonAuthorMealsByUserId = async (userId) => {
  const likesRef = ref(database, "recipeLikes");
  const likesQuery = query(likesRef, orderByChild("userId"), equalTo(userId));
  const snapshot = await get(likesQuery);

  if (snapshot.exists()) {
    const likes = snapshot.val();
    const recipeIds = Object.values(likes).map(like => like.recipeId);
    const recipesRef = ref(database, "recipes");
    const recipesQuery = query(recipesRef, orderByChild("id"), equalTo(recipeIds));
    const recipesSnapshot = await get(recipesQuery);

    if (recipesSnapshot.exists()) {
      return recipesSnapshot.val(); // return favorite non-author meals
    } else {
      return []; // return an empty array if no favorite meals found
    }
  } else {
    return []; // return an empty array if no likes found
  }
};

// Get Recipe Likes by Recipe ID and User ID
export const getRecipeLikesByRecipeIdAndUserId = async (recipeId, userId) => {
  const likesRef = ref(database, "recipeLikes");
  const likesQuery = query(likesRef, orderByChild("recipeId"), equalTo(recipeId));
  const snapshot = await get(likesQuery);

  if (snapshot.exists()) {
    const likes = snapshot.val();
    return Object.values(likes).filter(like => like.userId === userId); // return likes for the recipe and user
  } else {
    return []; // return an empty array if no likes found
  }
};

// Like Recipe
export const likeRecipe = async (recipeId, userId) => {
  const newLike = await push(ref(database, "recipeLikes"), { recipeId, userId });
  
  // Get the current recipe and update the favorites count
  const recipe = await getRecipeById(recipeId);
  const updatedRecipe = {
    ...recipe,
    favorites: (recipe.favorites || 0) + 1,
  };
  
  // Save the updated recipe
  await updateRecipe(updatedRecipe);

  return { id: newLike.key, recipeId, userId }; // return the new like object
};

// Unlike Recipe
export const unlikeRecipe = async (likeId, recipeId) => {
  // Delete the like
  await remove(ref(database, `recipeLikes/${likeId}`));
  
  // Get the current recipe and update the favorites count
  const recipe = await getRecipeById(recipeId);
  const updatedRecipe = {
    ...recipe,
    favorites: Math.max((recipe.favorites || 0) - 1, 0), // Ensure it doesn't go below 0
  };
  
  // Save the updated recipe
  await updateRecipe(updatedRecipe);

  return updatedRecipe; // return the updated recipe
};
