import { useNavigate, useParams } from "react-router-dom";
import "./EditRecipe.css";
import { useEffect, useState } from "react";
import {
  getIngredientsForRecipe,
  getRecipeById,
  updateRecipe,
} from "../../services/recipeService";
import { Button, InputGroup } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { getMealCategories } from "../../services/mealCategoryService";
import { IngredientDropdown } from "../IngredientDropdown/IngredientDropdown";
import { updateIngredientsForRecipe } from "../../services/ingredientsService";

export const EditRecipe = ({ currentUser }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [mealType, setMealType] = useState("");
  const [categories, setCategories] = useState([]);
  const [authorFavorite, setAuthorFavorite] = useState(false);
  const [favorites, setFavorites] = useState(0);
  const [time, setTime] = useState(0);
  const [servings, setServings] = useState(0);
  const [ingredients, setIngredients] = useState([]);
  const { recipeId } = useParams();
  const [currentRecipe, setCurrentRecipe] = useState({});
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const categoriesData = await getMealCategories();
      setCategories(categoriesData);

      const recipe = await getRecipeById(recipeId);
      setCurrentRecipe(recipe);
      setTitle(recipe.title);
      setBody(recipe.body);
      setMealType(recipe.meal_type);
      setTime(recipe.time);
      setServings(recipe.servings);
      setAuthorFavorite(recipe.author_favorite);
      setFavorites(recipe.favorites);

      const ingredientsData = await getIngredientsForRecipe(recipeId);
      setIngredients(ingredientsData);
    };

    fetchData();
  }, [recipeId]);

  const handleIngredientChange = (index, event) => {
    const newIngredients = [...ingredients];
    newIngredients[index].quantity = event.target.value;
    setIngredients(newIngredients);
  };

  const handleIngredientSelect = (index, ingredientId) => {
    const newIngredients = [...ingredients];
    newIngredients[index].ingredient_Id = ingredientId;
    newIngredients[index].ingredient = { id: ingredientId };
    setIngredients(newIngredients);
  };

  const handleAddIngredient = () => {
    setIngredients([
      ...ingredients,
      { ingredient_Id: null, quantity: "", ingredient: { id: null, name: "" } }
    ]);
  };

  const handleRemoveIngredient = (index) => {
    const values = [...ingredients];
    values.splice(index, 1);
    setIngredients(values);
  };

  const handleSave = async () => {
  try {
    setError(null);
    const formattedBody = body
      .split("\n")
      .map((line) => line.trim())
      .join("\n");

    const mealTypeId = categories.find(category => category.name === mealType)?.id;

    const newRecipe = {
      id: recipeId,
      title: title,
      body: formattedBody,
      mealTypeId: mealTypeId,
      userId: currentUser.id,
      authorFavorite: authorFavorite,
      favorites: authorFavorite
        ? currentRecipe.author_favorite
          ? favorites
          : favorites + 1
        : currentRecipe.author_favorite
        ? favorites - 1
        : favorites,
      time: time,
      servings: servings,
      date: new Date().toISOString().split('T')[0],
    };

    const updatedRecipe = await updateRecipe(newRecipe);

    const ingredientsToUpdate = ingredients.filter(
      ingredient => ingredient.ingredient_Id && ingredient.quantity
    ).map(ingredient => ({
      id: ingredient.id,
      ingredient_Id: ingredient.ingredient_Id,
      quantity: ingredient.quantity,
    }));

    const updatedIngredientsResponse = await updateIngredientsForRecipe(recipeId, ingredientsToUpdate);

    // Fetch updated ingredients
    const updatedIngredients = await getIngredientsForRecipe(recipeId);
    setIngredients(updatedIngredients);

    navigate("/recipe-details/" + recipeId);
  } catch (error) {
    console.error("Error updating recipe:", error);
    setError("Failed to update recipe. Please check the console for more details.");
    // Don't navigate away if there's an error
  }
  };

  return (
    <Form
      className="NewRecipeForm"
      onSubmit={(e) => {
        e.preventDefault();
      }}
    >
      <Form.Label id="new-recipe-title">Edit Recipe</Form.Label>
      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder={currentRecipe.title}
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="ingredients-container">
        <Form.Label>Ingredients</Form.Label>
        {ingredients.map((ingredient, index) => (
          <InputGroup className="mb-3 add-ingredient-container" key={index}>
            <IngredientDropdown
              value={ingredient.ingredient_Id}
              onSelect={(ingredientId) =>
                handleIngredientSelect(index, ingredientId)
              }
            />
            <Form.Control
              className="ingredients-quantity"
              name="quantity"
              placeholder="Quantity"
              value={ingredient.quantity}
              onChange={(event) => handleIngredientChange(index, event)}
            />
            <Button
              className="delete-ingredient-btn"
              variant="outline-secondary"
              onClick={() => handleRemoveIngredient(index)}
            >
              Remove
            </Button>
          </InputGroup>
        ))}

        <Button onClick={handleAddIngredient} className="add-ingredient-btn">
          Add Ingredient
        </Button>
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Instructions</Form.Label>
        <Form.Control
          as="textarea"
          placeholder={currentRecipe.body}
          value={body}
          onChange={(e) => setBody(e.target.value)}
          style={{ whiteSpace: "pre-wrap" }}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Cuisine</Form.Label>
        <Form.Select
          value={mealType}
          onChange={(e) => setMealType(e.target.value)}
        >
          <option value="">Select a Cuisine</option>
          {categories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </Form.Select>
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Time (in minutes)</Form.Label>
        <Form.Control
          type="number"
          placeholder="Time to cook"
          value={time}
          onChange={(e) => setTime(parseInt(e.target.value) || "")}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Servings</Form.Label>
        <Form.Control
          type="number"
          placeholder="Number of servings"
          value={servings}
          onChange={(e) => setServings(parseInt(e.target.value) || "")}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicCheckbox">
        <Form.Check
          type="checkbox"
          label="Mark as a Favorite"
          checked={authorFavorite}
          onChange={(e) => setAuthorFavorite(e.target.checked)}
        />
      </Form.Group>

      <Button variant="secondary" type="submit" onClick={handleSave}>
        Save
      </Button>
    </Form>
  );
};
