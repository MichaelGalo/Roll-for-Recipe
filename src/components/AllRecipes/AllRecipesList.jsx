import { useEffect, useState } from "react";
import {
  getAllRecipes,
  getRecipesByUserId,
} from "../../services/recipeService";
import { getMealCategories } from "../../services/mealCategoryService";
import { AllRecipes } from "../AllRecipes/AllRecipes";
import { Container } from "react-bootstrap";
import "./AllRecipesList.css";
import { FilterBar } from "../FilterBar/FilterBar";

export const AllRecipesList = ({ currentUser }) => {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [prepTime, setPrepTime] = useState(null);

  // Combined hook to fetch both user recipes and all recipes
  // userRecipesData isn't currently used, but could be used later if needed
  useEffect(() => {
    const fetchRecipes = async () => {
      const [userRecipesData, allRecipesData] = await Promise.all([
        getRecipesByUserId(currentUser.id),
        getAllRecipes(),
      ]);

        // Convert the object to an array of recipes
        const recipesArray = Object.entries(allRecipesData).map(([id, recipe]) => ({
          id,
          ...recipe,
        }));

      const sortedAllRecipes = recipesArray.sort((a, b) =>
        a.title.localeCompare(b.title)
      );

      setRecipes(sortedAllRecipes);
      setFilteredRecipes(sortedAllRecipes);
    };

    fetchRecipes();
  }, [currentUser.id]);

  // hook to fetch and set meal categories
  useEffect(() => {
    getMealCategories().then((categories) => {
      const sortedCategories = categories.sort((a, b) =>
        a.name.localeCompare(b.name)
      );
      setCategories(sortedCategories);
    });
  }, []);

  const getMealCategoryName = (categoryId) => {
    const mealCategory = categories.find(
      (mealCategory) => mealCategory.id === categoryId
    );
    return mealCategory ? mealCategory.name : "Unknown Meal Category";
  };

  // Hook to filter recipes based on selected filters
  useEffect(() => {
    let updatedRecipes = [...recipes];

    if (filteredCategories !== 0) {
      updatedRecipes = updatedRecipes.filter(
        (recipe) => recipe.mealTypeId === filteredCategories
      );
    }

    if (searchTerm !== "") {
      updatedRecipes = updatedRecipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    if (prepTime !== null) {
      updatedRecipes = updatedRecipes.filter(
        (recipe) => recipe.time <= prepTime
      );
    }

    setFilteredRecipes(updatedRecipes);
  }, [filteredCategories, searchTerm, prepTime, recipes]);

  return (
    <>
      <Container className="recipe-card-background">
        <h2 className="post-header">All Recipes</h2>
        <div>
          <FilterBar
            categories={categories}
            setFilteredCategories={setFilteredCategories}
            setSearchTerm={setSearchTerm}
            setPrepTime={setPrepTime}
          />
        </div>
        <div>
          <AllRecipes
            recipes={filteredRecipes}
            categories={categories}
            getMealCategoryName={getMealCategoryName}
            currentUser={currentUser}
          />
        </div>
      </Container>
    </>
  );
};
