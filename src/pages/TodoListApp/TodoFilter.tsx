import React from "react";
import { useDispatch } from "react-redux";
import { setCategoryFilter } from "../../services/todoCRUD";

const CategoryFilter: React.FC = () => {
  const dispatch = useDispatch();

  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setCategoryFilter(e.target.value));
  };

  return (
    <div>
      <select onChange={handleFilterChange}>
        <option value='All'>All</option>
        <option value='Complete'>Complete</option>
        <option value='Not Complete'>Not Complete</option>
      </select>
    </div>
  );
};

export default CategoryFilter;
