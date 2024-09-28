import { getIngredientsForRecipe } from "./recipeService";

export const fetchIngredients = async () => {
  const response = await fetch("http://localhost:8000/ingredients");
  return response.json();
};

export const updateIngredientsForRecipe = async (recipeId, ingredients) => {
  // Filter out placeholder ingredients
  const validIngredients = ingredients.filter(
    (ingredient) => ingredient.ingredientId && ingredient.quantity
  );

  // Fetch existing ingredients for the recipe
  const existingIngredients = await getIngredientsForRecipe(recipeId);

  // Delete existing ingredients that are not in the updated list
  const deletePromises = existingIngredients
    .filter(
      (existingIngredient) =>
        !validIngredients.some(
          (ingredient) => ingredient.id === existingIngredient.id
        )
    )
    .map((ingredient) => {
      return fetch(
        `http://localhost:8000/ingredient_for_recipe/${ingredient.id}`,
        {
          method: "DELETE",
        }
      );
    });

  await Promise.all(deletePromises);

  // Update or add ingredients
  const updatePromises = validIngredients.map((ingredient) => {
    const body = JSON.stringify({
      ingredientId: parseInt(ingredient.ingredientId, 10),
      recipeId: recipeId,
      quantity: parseInt(ingredient.quantity, 10) || 0,
    });

    if (ingredient.id) {
      return fetch(
        `http://localhost:8000/ingredients_for_recipe/${ingredient.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: body,
        }
      );
    } else {
      return fetch(`http://localhost:8000/ingredient_for_recipe`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: body,
      });
    }
  });

  const responses = await Promise.all(updatePromises);
  return Promise.all(responses.map((response) => response.json()));
};

export const fetchGrocerySubtypeNames = async (subtypeIds) => {
  const subtypePromises = subtypeIds.map((id) =>
    fetch(`http://localhost:8000/grocery_subtypes/${id}`).then((response) =>
      response.json()
    )
  );
  const subtypes = await Promise.all(subtypePromises);
  return subtypes.reduce((acc, subtype) => {
    acc[subtype.id] = subtype.name;
    return acc;
  }, {});
};
