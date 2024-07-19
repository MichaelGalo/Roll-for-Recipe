import { useEffect, useState } from "react";
import {
  getAllRecipes,
  getRecipesByUserId,
} from "../../services/recipeService";
import { getMealCategories } from "../../services/mealCategoryService";
import { AllRecipes } from "../AllRecipes/AllRecipes";
import { FilterBar } from "../FilterBar/FilterBar";
import { Container } from "react-bootstrap";
import "./AllRecipesList.css";

export const AllRecipesList = ({ currentUser }) => {
  const [recipes, setRecipes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [filteredRecipes, setFilteredRecipes] = useState([]);
  const [filteredCategories, setFilteredCategories] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  // hook to set recipes initially ONLY for currentUser
  useEffect(() => {
    getRecipesByUserId(currentUser.id).then((recipes) => {
      setRecipes(recipes);
      setFilteredRecipes(recipes);
    });
  }, []);

  //TODO: open this when social stretch goal begins
  //
  // hook to set recipes initially for all authors
  // useEffect(() => {
  //   getAllRecipes().then((recipes) => {
  //     setRecipes(recipes);
  //     setFilteredRecipes(recipes);
  //   });
  // }, []);

  // hook to set meal categories initially
  useEffect(() => {
    getMealCategories().then((categories) => {
      setCategories(categories);
    });
  }, []);

  // hook to set meal category
  useEffect(() => {
    if (filteredCategories === 0) {
      setFilteredRecipes(recipes);
    } else {
      const filtered = recipes.filter(
        (recipe) => recipe.categoryId === filteredCategories
      );
      setFilteredRecipes(filtered);
    }
  }, [filteredCategories, recipes]);

  // hook to watch for search term changes
  useEffect(() => {
    if (searchTerm === "") {
      setFilteredRecipes(recipes);
    } else {
      const matchedTerms = recipes.filter((recipe) =>
        recipe.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredRecipes(matchedTerms);
    }
  }, [searchTerm, recipes]);

  const getMealCategoryName = (categoryId) => {
    const mealCategory = categories.find(
      (mealCategory) => mealCategory.id === categoryId
    );
    return mealCategory ? mealCategory.name : "Unknown Meal Category";
  };

  return (
    <>
      <Container className="recipe-card-background">
        <h2 className="post-header">All Recipes</h2>
        <div>
          <FilterBar
            categories={categories}
            setFilteredCategories={setFilteredCategories}
            setSearchTerm={setSearchTerm}
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
