import React, { useState, useEffect } from "react";
import { Form } from "react-bootstrap";
import "./IngredientDropdown.css";
import { fetchIngredients } from "../../services/ingredientsService";

export const IngredientDropdown = ({ onSelect, value }) => {
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    fetchIngredients().then((data) => {
      const sortedIngredients = data.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setIngredients(sortedIngredients);
    });
  }, []);

  const handleChange = (event) => {
    onSelect(event.target.value);
  };

  return (
    <Form.Group controlId="ingredientDropdown">
      <Form.Control
        className="ingredients-dropdown"
        as="select"
        value={value}
        onChange={handleChange}
      >
        <option value="">Select an ingredient</option>
        {ingredients.map((ingredient) => (
          <option key={ingredient.id} value={ingredient.id}>
            {ingredient.name}
          </option>
        ))}
      </Form.Control>
    </Form.Group>
  );
};
