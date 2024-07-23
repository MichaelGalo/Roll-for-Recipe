import { useNavigate, useParams } from "react-router-dom";
import "./EditRecipe.css";
import { useEffect, useState } from "react";
import { getRecipeById, updateRecipe } from "../../services/recipeService";
import { Button } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import { getMealCategories } from "../../services/mealCategoryService";

export const EditRecipe = ({ currentUser }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [mealTypeId, setMealTypeId] = useState(0);
  const [categories, setCategories] = useState([]);
  const [authorFavorite, setAuthorFavorite] = useState(false);
  const [favorites, setFavorites] = useState(0);
  const [time, setTime] = useState(0);
  const [servings, setServings] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesData = await getMealCategories();
      setCategories(categoriesData);
    };

    fetchCategories();
  }, []);

  const { recipeId } = useParams();
  const [currentRecipe, setCurrentRecipe] = useState({});
  // Fetch current recipe details based on recipeId from URL params
  useEffect(() => {
    const fetchRecipe = async () => {
      const recipe = await getRecipeById(recipeId);
      setCurrentRecipe(recipe);
      // Set form fields with current recipe details
      setTitle(recipe.title);
      setBody(recipe.body);
      setMealTypeId(recipe.mealTypeId);
      setTime(recipe.time);
      setServings(recipe.servings);
      setAuthorFavorite(recipe.authorFavorite);
      setFavorites(recipe.favorites);
    };
    fetchRecipe();
  }, [recipeId]);

  const handleSave = async () => {
    const formattedBody = body
      .split("\n")
      .map((line) => line.trim())
      .join("\n");

    const newRecipe = {
      id: recipeId,
      title: title,
      body: formattedBody,
      mealTypeId: parseInt(mealTypeId),
      userId: currentUser.id,
      authorFavorite: authorFavorite,
      favorites: authorFavorite
        ? currentRecipe.authorFavorite
          ? favorites
          : favorites + 1 // If adding favorite
        : currentRecipe.authorFavorite
        ? favorites - 1
        : favorites, // If removing favorite
      time: time,
      servings: servings,
      date: new Date().toLocaleDateString(),
    };

    await updateRecipe(newRecipe);
    navigate("/my-recipes");
  };

  return (
    <Form
      className="NewRecipeForm"
      onSubmit={(e) => {
        e.preventDefault();
        handleSave();
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
          value={mealTypeId}
          onChange={(e) => setMealTypeId(e.target.value)}
        >
          <option value="">Select a Cuisine</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
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

      <Button variant="primary" type="submit" onClick={handleSave}>
        Save
      </Button>
    </Form>
  );
};
