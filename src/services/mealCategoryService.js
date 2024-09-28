export const getMealCategories = async () => {
  return await fetch(`http://localhost:8000/meal_types`).then((res) =>
    res.json()
  );
};
