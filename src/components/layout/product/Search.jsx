import React, { useState } from "react";
import "./Search.css";
import { useSearchParams } from 'react-router-dom';
import { ImCross } from 'react-icons/im';


const Search = () => {

  const [searchParams, setSearchParams] = useSearchParams();
  const [searchValue, setsearchValue] = useState("")

  const handleClearSearch = () => {
    setSearchParams({})
    setsearchValue("")
  }
  
  const handleSearch = (e) =>{
    e.preventDefault()
    setSearchParams({search: searchValue})
  }

  return (
    <>
      <form className="searchBox" onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search a Product ..."
          onChange={(e) => setsearchValue(e.target.value)}
          value={ searchValue == null ? searchParams.get("search") : searchValue}
        />
        {
          searchParams.get("search") &&
          <p onClick={handleClearSearch}><ImCross /></p>
        }
        <button type="submit" className="v1button" style={{padding: "10px", marginLeft: "10px", fontSize: "17px"}}>Search</button>
      </form>
    </>
  );
};

export default Search;