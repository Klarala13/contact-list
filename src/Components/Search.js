import React from "react";

const Search = ({ searchText, setSearchText }) => {
  return (
    <div className="container search">
      <div id="form">
        <form id="search-form" className="col">
          <input
            type="text"
            placeholder="search"
            //We are retrieving what is typed to set it later as the filter of our search
            value={searchText}
            onChange={e => setSearchText(e.target.value)}
          />
          <button type="button" className="btn-dark search" id="search">
            <i className="fa fa-search" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default Search;
