import { useState } from "react";


function SearchBar(onSearch) {
const [searchTerm, setSearchTerm]=useState[""]

function handleSearch(){
    onSearch={searchTerm}
}

    return (
        <>
        <input
        type="text"
        id="search"
        name="search"
        value={searchTerm}
        placeholder="search for your snippet"
onChange={}
        ></input>
        <button onClick={handleSearch}>Search</button></>
     );
}

export default SearchBar;