import React from "react";
import "./Search.css";
import { useSearchParams } from 'react-router-dom';
import { ImCross } from 'react-icons/im';


const Search = () => {

  const [searchParams, setSearchParams] = useSearchParams();


  const handleClearSearch = () => {
    setSearchParams({})
  }


  return (
    <>
      <form className="searchBox">
        <input
          type="text"
          placeholder="Search a Product ..."
          onChange={(e) => setSearchParams({search: e.target.value})}
          value={searchParams.get("search") || ""}
        />
        {
          searchParams.get("search") &&
          <p onClick={handleClearSearch}><ImCross /></p>
        }
      </form>
    </>
  );
};

export default Search;