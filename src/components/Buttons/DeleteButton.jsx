import { Button } from "react-bootstrap";
import { deleteRecipe } from "../../services/recipeService";
import "./DeleteButton.css";

export const DeleteButton = ({ currentRecipe }) => {
  const toggleDelete = () => {
    deleteRecipe(currentRecipe.id);
  };

  return (
    <Button size="sm" className="delete-button" onClick={toggleDelete}>
      Delete
    </Button>
  );
};
