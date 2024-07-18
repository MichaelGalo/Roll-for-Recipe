export const FilterBar = ({
  categories,
  setFilteredCategories,
  setSearchTerm,
}) => {
  return (
    <div className="filter-bar">
      <select
        className="mealCategory-filter"
        onChange={(event) =>
          setFilteredCategories(parseInt(event.target.value))
        }
      >
        <option value="0">Select to Filter</option>
        {categories.map((mealCategory) => (
          <option key={mealCategory.id} value={mealCategory.id}>
            {mealCategory.name}
          </option>
        ))}
      </select>

      <input
        onChange={(event) => {
          setSearchTerm(event.target.value);
        }}
        type="text"
        placeholder="Search Recipes"
        className="recipe-search"
      />
    </div>
  );
};
