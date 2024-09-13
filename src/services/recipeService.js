// export const getAllRecipes = async () => {
//   const response = await fetch("http://localhost:8088/recipes");
//   const recipes = await response.json();
//   return recipes;
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

import { ref, push, get, update, remove, query, orderByChild, equalTo } from "firebase/database";
import { database } from "../../firebase"; // Make sure this path is correct

// Helper function to normalize recipe object
const normalizeRecipe = (key, recipe) => {
  if (!recipe) {
    console.error(`Attempted to normalize undefined recipe with key ${key}`);
    return null;
  }

  if (recipe.id) {
    // Case where 'id' is nested inside the recipe object
    return { ...recipe, id: recipe.id };
  } else {
    // Case where Firebase-generated key is the id
    return { ...recipe, id: key };
  }
};

export const getAllRecipes = async () => {
  const recipesRef = ref(database, "recipes");
  const snapshot = await get(recipesRef);

  if (snapshot.exists()) {
    const recipes = snapshot.val();
    return Object.entries(recipes)
      .map(([key, recipe]) => normalizeRecipe(key, recipe))
      .filter(recipe => recipe !== null);
  } else {
    return [];
  }
};

export const getRecipesByUserId = async (userId) => {

  try {
    const recipesRef = ref(database, "recipes");
    const recipesQuery = query(recipesRef, orderByChild("userId"), equalTo(userId));
    const snapshot = await get(recipesQuery);

    if (snapshot.exists()) {
      const recipes = snapshot.val();
      return Object.entries(recipes).map(([key, recipe]) => normalizeRecipe(key, recipe));
    } else {
      console.log(`No recipes found for user ${userId}`);
      return [];
    }
  } catch (error) {
    console.error("Error in getRecipesByUserId:", error);
    return [];
  }
};

export const getRecipeById = async (id) => {
  const recipeRef = ref(database, `recipes/${id}`);
  const snapshot = await get(recipeRef);

  if (snapshot.exists()) {
    return normalizeRecipe(id, snapshot.val());
  } else {
    return null;
  }
};

export const updateRecipe = async (recipe) => {
  const { id, ...updateData } = recipe;
  const recipeRef = ref(database, `recipes/${id}`);
  await update(recipeRef, updateData);
  return recipe;
};

export const addRecipe = async (recipe) => {
  const recipesRef = ref(database, "recipes");
  const newRecipeRef = await push(recipesRef, recipe);
  return normalizeRecipe(newRecipeRef.key, recipe);
};

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
  return responses.map((response, index) => ({ 
    id: response.key, 
    ...formattedIngredients[index] 
  }));
};

export const getIngredientsForRecipe = async (recipeId) => {
  const ingredientsRef = ref(database, "ingredientsForRecipe");
  const ingredientsQuery = query(ingredientsRef, orderByChild("recipeId"), equalTo(recipeId));
  const snapshot = await get(ingredientsQuery);

  if (snapshot.exists()) {
    return Object.entries(snapshot.val()).map(([key, ingredient]) => ({
      id: ingredient.id || key,
      ...ingredient
    }));
  } else {
    return [];
  }
};

export const deleteRecipe = async (id) => {
  const ingredients = await getIngredientsForRecipe(id);
  const deletePromises = ingredients.map((ingredient) =>
    remove(ref(database, `ingredientsForRecipe/${ingredient.id}`))
  );
  await Promise.all(deletePromises);

  const recipeRef = ref(database, `recipes/${id}`);
  await remove(recipeRef);

  return { id };
};

export const getFavoriteAuthorMealsByUserId = async (userId) => {
  const recipesRef = ref(database, "recipes");
  const recipesQuery = query(recipesRef, orderByChild("userId"), equalTo(userId));
  const snapshot = await get(recipesQuery);

  if (snapshot.exists()) {
    const recipes = snapshot.val();
    return Object.entries(recipes)
      .filter(([_, recipe]) => recipe.authorFavorite)
      .map(([key, recipe]) => normalizeRecipe(key, recipe));
  } else {
    return [];
  }
};

export const getFavoriteNonAuthorMealsByUserId = async (userId) => {
  const likesRef = ref(database, "recipeLikes");
  const likesQuery = query(likesRef, orderByChild("userId"), equalTo(userId));
  const snapshot = await get(likesQuery);

  if (snapshot.exists()) {
    const likes = snapshot.val();
    const recipeIds = Object.values(likes).map(like => like.recipeId);
    
    const recipesPromises = recipeIds.map(recipeId => getRecipeById(recipeId));
    const recipes = await Promise.all(recipesPromises);
    
    return recipes.filter(recipe => recipe !== null);
  } else {
    return [];
  }
};

export const getRecipeLikesByRecipeIdAndUserId = async (recipeId, userId) => {
  const likesRef = ref(database, "recipeLikes");
  const likesQuery = query(likesRef, orderByChild("recipeId"), equalTo(recipeId));
  const snapshot = await get(likesQuery);

  if (snapshot.exists()) {
    const likes = snapshot.val();
    return Object.entries(likes)
      .filter(([_, like]) => like.userId === userId)
      .map(([key, like]) => ({ id: like.id || key, ...like }));
  } else {
    return [];
  }
};

export const likeRecipe = async (recipeId, userId) => {
  const newLike = await push(ref(database, "recipeLikes"), { recipeId, userId });
  
  const recipe = await getRecipeById(recipeId);
  const updatedRecipe = {
    ...recipe,
    favorites: (recipe.favorites || 0) + 1,
  };
  
  await updateRecipe(updatedRecipe);

  return { id: newLike.key, recipeId, userId };
};

export const unlikeRecipe = async (likeId, recipeId) => {
  await remove(ref(database, `recipeLikes/${likeId}`));
  
  const recipe = await getRecipeById(recipeId);
  const updatedRecipe = {
    ...recipe,
    favorites: Math.max((recipe.favorites || 0) - 1, 0),
  };
  
  await updateRecipe(updatedRecipe);

  return updatedRecipe;
};