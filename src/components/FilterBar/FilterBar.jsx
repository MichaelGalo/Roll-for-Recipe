import "./FilterBar.css";

export const FilterBar = ({
  categories,
  setFilteredCategories,
  setSearchTerm,
  setPrepTime,
}) => {
  return (
    <div className="filter-bar">
      <select
        id="mealCategory-filter"
        className="mealCategory-filter"
        onChange={(event) =>
          setFilteredCategories(event.target.value)
        }
      >
        <option value="0">Filter by Cuisine</option>
        {categories.map((mealCategory) => (
          <option key={mealCategory.id} value={mealCategory.name}>
            {mealCategory.name}
          </option>
        ))}
      </select>

      <select
        id="prepTime-filter"
        className="mealTime-filter"
        onChange={(event) => setPrepTime(parseInt(event.target.value))}
      >
        <option value="10000">Filter by Prep Time</option>
        <option value="15">15 minutes or less</option>
        <option value="30">30 minutes or less</option>
        <option value="60">1 hour or less</option>
      </select>

      <input
        id="recipe-search"
        onChange={(event) => {
          setSearchTerm(event.target.value);
        }}
        type="text"
        placeholder="Search Recipe Names"
        className="recipe-search"
      />
    </div>
  );
};
