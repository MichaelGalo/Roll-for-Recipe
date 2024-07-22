import { useNavigate } from "react-router-dom";
import { EditRecipe } from "../EditRecipe/EditRecipe";

export const EditButton = ({ currentRecipe }) => {
  // navigate to EditRecipe component
  const navigate = useNavigate();
  const toggleEdit = () => {
    navigate(`/edit-recipe/${currentRecipe.id}`);
  };

  return (
    <button className="edit-button" onClick={toggleEdit}>
      Edit
    </button>
  );
};
