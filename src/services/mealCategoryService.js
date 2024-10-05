import { fetchWithAuth } from "./fetcher";

export const getMealCategories = async () => {
  return await fetchWithAuth(`http://localhost:8000/meal_types`)
    .then(res => res.json());
};