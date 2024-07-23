import { deleteRecipe } from "../../services/recipeService";

export const DeleteButton = ({ currentRecipe }) => {
  const toggleDelete = () => {
    deleteRecipe(currentRecipe.id);
  };

  return (
    <button className="delete-button" onClick={toggleDelete}>
      Delete
    </button>
  );
};
