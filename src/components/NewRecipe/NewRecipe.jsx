import { useNavigate } from "react-router-dom";
import "./NewRecipe.css";
import { useEffect, useState } from "react";
import { getMealCategories } from "../../services/mealCategoryService";
import { addRecipe } from "../../services/recipeService";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

export const NewRecipe = ({ currentUser }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(0);
  const [authorFavorite, setAuthorFavorite] = useState(false);
  const [time, setTime] = useState("");
  const [servings, setServings] = useState("");
  const navigate = useNavigate();

  // hook to grab all categories for dropdown
  useEffect(() => {
    const fetchCategories = async () => {
      const categoriesData = await getMealCategories();
      setCategories(categoriesData);
    };

    fetchCategories();
  }, []);

  const handleSave = () => {
    // create new recipe object to be able to post
    const newRecipe = {
      title,
      body,
      categoryId: parseInt(selectedCategory),
      userId: currentUser.id,
      authorFavorite,
      favorites: 0,
      time,
      servings,
      date: new Date().toLocaleDateString(),
    };

    // this will need to be updated to send the data to the API
    addRecipe(newRecipe);

    // needs to clear form fields after save
    setTitle("");
    setBody("");
    setSelectedCategory("");
    setAuthorFavorite(false);
    setTime(0);
    setServings(0);

    // redirect to the my-recipes page
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

      <Form.Group className="mb-3">
        <Form.Label>Instructions</Form.Label>
        <Form.Control
          as="textarea"
          placeholder="Instructions"
          value={body}
          onChange={(e) => setBody(e.target.value)}
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

//
//
//
//TODO: form needs to parseint the time and servings
