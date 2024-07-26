import { useNavigate } from "react-router-dom";
import "./NewRecipe.css";
import { useEffect, useState } from "react";
import { getMealCategories } from "../../services/mealCategoryService";
import { addIngredients, addRecipe } from "../../services/recipeService";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { InputGroup } from "react-bootstrap";
import { IngredientDropdown } from "../IngredientDropdown/IngredientDropdown";

export const NewRecipe = ({ currentUser }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [authorFavorite, setAuthorFavorite] = useState(false);
  const [time, setTime] = useState("");
  const [servings, setServings] = useState("");
  const [ingredients, setIngredients] = useState([
    { ingredientId: "", quantity: "" },
  ]);
  const navigate = useNavigate();

  // hook to grab all categories for dropdown
  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesData = await getMealCategories();
      setCategories(categoriesData);
    };

    fetchCategories();
  }, []);

  //specifically targets the values of the ingredient name and quantities
  const handleIngredientChange = (index, event) => {
    const newIngredients = [...ingredients];
    newIngredients[index][event.target.name] = event.target.value;
    setIngredients(newIngredients);
  };

  const handleIngredientSelect = (index, ingredientId) => {
    const newIngredients = [...ingredients];
    newIngredients[index].ingredientId = ingredientId;
    setIngredients(newIngredients);
  };

  // when invoked, the adds the current state of the handledIngredientChange to the ingredients array and also creates a new object to interact with
  const handleAddIngredient = () => {
    setIngredients([...ingredients, { ingredientId: "", quantity: "" }]);
  };

  // this targets the specific ingredient index and removes the 1 item there.
  const handleRemoveIngredient = (index) => {
    const values = [...ingredients];
    values.splice(index, 1);
    setIngredients(values);
  };

  const handleSave = async () => {
    if (
      !title.trim() ||
      !body.trim() ||
      selectedCategory === 0 ||
      !time ||
      !servings
    ) {
      alert(
        "Please fill in all required fields including title, body, category, time, and servings."
      );
      return; // Stop the function from proceeding further
    }

    const formattedBody = body
      .split("\n") // preserves the line break each time someone hits enter
      .map((line) => line.trim()) // removes any extra white space
      .join("\n"); // joins the lines back together with a line break

    const newRecipe = {
      title,
      body: formattedBody,
      mealTypeId: parseInt(selectedCategory),
      userId: currentUser.id,
      authorFavorite,
      favorites: (authorFavorite && 1) || 0,
      time,
      servings,
      date: new Date().toLocaleDateString(),
    };

    const recipeId = await addRecipe(newRecipe);
    await addIngredients(recipeId, ingredients);

    setTitle("");
    setBody("");
    setSelectedCategory("");
    setAuthorFavorite(false);
    setTime("");
    setServings("");
    setIngredients([{ ingredientId: "", quantity: "" }]);

    navigate("/my-recipes");
  };

  return (
    <Form className="NewRecipeForm" onSubmit={(e) => e.preventDefault()}>
      <Form.Label id="new-recipe-title">New Recipe</Form.Label>
      <Form.Group className="mb-3">
        <Form.Label>Title</Form.Label>
        <Form.Control
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </Form.Group>
      <Form.Group className="ingredients-container">
        <Form.Label>Ingredients</Form.Label>
        {ingredients.map((ingredient, index) => (
          <InputGroup className="mb-3 add-ingredient-container" key={index}>
            <IngredientDropdown
              value={ingredient.ingredientId}
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
          placeholder="Instructions"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          style={{ whiteSpace: "pre-wrap" }}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Cuisine</Form.Label>
        <Form.Select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
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
