import { getIngredientsForRecipe } from "./recipeService";

export const fetchIngredients = async () => {
  const response = await fetchWithAuth("http://localhost:8000/ingredients");
  return response.json();
};

export const updateIngredientsForRecipe = async (recipeId, ingredients) => {
  const validIngredients = ingredients.filter(
    (ingredient) => ingredient.ingredientId && ingredient.quantity
  );

  const existingIngredients = await getIngredientsForRecipe(recipeId);

  const deletePromises = existingIngredients
    .filter(
      (existingIngredient) =>
        !validIngredients.some(
          (ingredient) => ingredient.id === existingIngredient.id
        )
    )
    .map((ingredient) => {
      return fetchWithAuth(
        `http://localhost:8000/ingredient_for_recipe/${ingredient.id}`,
        {
          method: "DELETE",
        }
      );
    });

  await Promise.all(deletePromises);

  const updatePromises = validIngredients.map((ingredient) => {
    const body = JSON.stringify({
      ingredientId: parseInt(ingredient.ingredientId, 10),
      recipeId: recipeId,
      quantity: parseInt(ingredient.quantity, 10) || 0,
    });

    if (ingredient.id) {
      return fetchWithAuth(
        `http://localhost:8000/ingredients_for_recipe/${ingredient.id}`,
        {
          method: "PUT",
          body: body,
        }
      );
    } else {
      return fetchWithAuth(`http://localhost:8000/ingredient_for_recipe`, {
        method: "POST",
        body: body,
      });
    }
  });

  const responses = await Promise.all(updatePromises);
  return Promise.all(responses.map((response) => response.json()));
};

export const fetchGrocerySubtypeNames = async (subtypeIds) => {
  const subtypePromises = subtypeIds.map((id) =>
    fetchWithAuth(`http://localhost:8000/grocery_subtypes/${id}`).then((response) =>
      response.json()
    )
  );
  const subtypes = await Promise.all(subtypePromises);
  return subtypes.reduce((acc, subtype) => {
    acc[subtype.id] = subtype.name;
    return acc;
  }, {});
};