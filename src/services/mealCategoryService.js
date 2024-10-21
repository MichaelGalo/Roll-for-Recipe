import { fetchWithAuth } from "./fetcher";

export const getMealCategories = async () => {
  return await fetchWithAuth(`${baseUrl}/meal_types`)
    .then(res => res.json());
};