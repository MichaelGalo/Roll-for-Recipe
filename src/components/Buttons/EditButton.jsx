import { useNavigate } from "react-router-dom";
import { EditRecipe } from "../EditRecipe/EditRecipe";
import { Button } from "react-bootstrap";
import "./EditButton.css";

export const EditButton = ({ currentRecipe, handleRecipeUpdate }) => {
  const navigate = useNavigate();
  const toggleEdit = () => {
    navigate(`/edit-recipe/${currentRecipe.id}`);
    handleRecipeUpdate();
  };

  return (
    <Button size="sm" className="edit-button" onClick={toggleEdit}>
      Edit
    </Button>
  );
};
