export const EditButton = ({ currentRecipe }) => {
  const toggleEdit = () => {
    // editRecipe(currentRecipe.id);
    console.log("Edit Button Working");
  };

  return (
    <button className="edit-button" onClick={toggleEdit}>
      Edit
    </button>
  );
};
