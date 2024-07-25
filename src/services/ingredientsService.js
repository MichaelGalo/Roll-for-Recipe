export const fetchIngredients = async () => {
  const response = await fetch("http://localhost:8088/ingredients");
  return response.json();
};
