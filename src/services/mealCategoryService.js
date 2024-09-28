export const getMealCategories = async () => {
  return await fetch(`http://localhost:8000/mealTypes`).then((res) =>
    res.json()
  );
};
