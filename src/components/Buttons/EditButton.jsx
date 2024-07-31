import { useNavigate } from "react-router-dom";
import { EditRecipe } from "../EditRecipe/EditRecipe";
import { Button } from "react-bootstrap";
import "./EditButton.css";

export const EditButton = ({ currentRecipe, handleRecipeUpdate }) => {
  // navigate to EditRecipe component
  const navigate = useNavigate();
  const toggleEdit = () => {
    handleRecipeUpdate();
    navigate(`/edit-recipe/${currentRecipe.id}`);
  };

  return (
    <Button size="sm" className="edit-button" onClick={toggleEdit}>
      Edit
    </Button>
  );
};
