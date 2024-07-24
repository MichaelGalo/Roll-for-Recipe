import { Button } from "react-bootstrap";
import { deleteRecipe } from "../../services/recipeService";
import "./DeleteButton.css";
import { useNavigate } from "react-router-dom";

export const DeleteButton = ({ currentRecipe }) => {
  const navigate = useNavigate();
  const toggleDelete = () => {
    deleteRecipe(currentRecipe.id).then(() => {
      navigate(`/my-recipes`);
    });
  };

  return (
    <Button size="sm" className="delete-button" onClick={toggleDelete}>
      Delete
    </Button>
  );
};
