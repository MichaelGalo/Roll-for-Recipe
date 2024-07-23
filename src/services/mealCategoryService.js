// need getMealCategories service to get all meal categories
export const getMealCategories = async () => {
  return await fetch(`http://localhost:8088/mealTypes`).then((res) =>
    res.json()
  );
};
