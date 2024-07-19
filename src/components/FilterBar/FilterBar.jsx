import "./FilterBar.css";

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
        <option value="0">Filter by Cuisine</option>
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
        placeholder="Search Recipe Names"
        className="recipe-search"
      />
    </div>
  );
};
