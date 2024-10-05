import { Button } from "react-bootstrap";
import { deleteRecipe } from "../../services/recipeService";
import "./DeleteButton.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

export const DeleteButton = ({ currentRecipe, handleRecipeUpdate }) => {
  const navigate = useNavigate();
  const [isDeleting, setIsDeleting] = useState(false);

  const toggleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      setIsDeleting(true);
      try {
        await deleteRecipe(currentRecipe.id);
        handleRecipeUpdate();
        navigate("/my-recipes");
      } catch (error) {
        console.error("Failed to delete recipe:", error);
        alert("Failed to delete recipe. Please try again.");
      } finally {
        setIsDeleting(false);
      }
    }
  };

  return (
    <Button 
      size="sm" 
      className="delete-button" 
      onClick={toggleDelete} 
      disabled={isDeleting}
    >
      {isDeleting ? "Deleting..." : "Delete"}
    </Button>
  );
};