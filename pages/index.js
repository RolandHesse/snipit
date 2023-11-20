import SnippetCardList from "@/components/SnippetCardList";
import useSWR from "swr";
import Fuse from "fuse.js";
import { useState } from "react";
import styled from "styled-components";
import { Icon } from "@iconify/react";
import { useRef } from "react";
import { useEffect } from "react";
// import useLocalStorageState from "use-local-storage-state";

const fuseOptions = {
  threshold: 0.3,
  keys: ["name", "code", "description", "links", "tag"],
};
export default function HomePage() {
  const { data, error, isLoading } = useSWR("api/snippets");
  const [results, setResults] = useState([]);
  const fuse = new Fuse(data, fuseOptions);

  function limitLastSearchOptions(maxOptions) {
    var dropdown = document.getElementById("lastSearchDropdown");

    if (dropdown && dropdown.options.length > maxOptions) {
      while (dropdown.options.length > maxOptions) {
        dropdown.remove(dropdown.options.length - 1);
      }
    }
  }
  // function loadLastSearch() {
  //   var lastSearch = localStorage.getItem("lastSearch");
  //   if (lastSearch) {
  //     updateLastSearchDropdown(lastSearch);
  //   }
  // }

  function loadLastSearch() {
    var lastSearchList =
      JSON.parse(localStorage.getItem("lastSearchList")) || [];

    lastSearchList.forEach((searchPattern) => {
      updateLastSearchDropdown(searchPattern);
    });

    limitLastSearchOptions(5);
  }

  useEffect(() => {
    loadLastSearch();
  }, []);

  const inputRef = useRef(null);

  function handleClick() {
    inputRef.current.focus();
  }
  function handleSearch(event) {
    if (!fuse) {
      return;
    }
    const searchPattern = event.target.value;
    const searchResult = fuse.search(searchPattern).slice(0, 10);
    setResults(searchResult.map((result) => result.item));
    saveLastSearch(searchPattern);
    // localStorage.setItem("last search", { searchPattern });
    updateLastSearchDropdown(searchPattern);
    limitLastSearchOptions(5);
  }

  function saveLastSearch(searchPattern) {
    var lastSearchList =
      JSON.parse(localStorage.getItem("lastSearchList")) || [];

    lastSearchList.unshift(searchPattern);

    lastSearchList = lastSearchList.slice(0, 5);

    localStorage.setItem("lastSearchList", JSON.stringify(lastSearchList));
  }

  function updateLastSearchDropdown(searchPattern) {
    var dropdown = document.getElementById("lastSearchDropdown");

    if (dropdown) {
      var option = document.createElement("option");
      option.text = searchPattern;
      if (
        !Array.from(dropdown.options).some((opt) => opt.text === searchPattern)
      ) {
        dropdown.add(option);
      }
    }
  }
  if (error) return <p>failed to load...🥶😵‍💫😨😩😢</p>;
  if (isLoading) return <p>wait....wait...wait... still loading...🤓</p>;

  return (
    <>
      <StyledSearchBarContainer tabIndex={0}>
        <StyledSearchBarForm>
          <label htmlFor="search"></label>
          <StyledSearchBarInput
            ref={inputRef}
            type="text"
            id="search"
            name="search"
            placeholder="Search"
            onChange={handleSearch}
          />
        </StyledSearchBarForm>
        <StyledButton onClick={handleClick}>
          <Icon
            icon="line-md:search"
            height="2rem"
            color="var(--primary-color)"
          />
        </StyledButton>
      </StyledSearchBarContainer>
      <SnippetCardList data={results.length > 0 ? results : data} />
    </>
  );
}

const StyledSearchBarForm = styled.form`
  height: 100%;
  width: 100%;
`;
const StyledSearchBarInput = styled.input`
  outline: none;
  background-color: transparent;
  border: none;
  height: 100%;
  width: 100%;
  padding: 1rem 0.5rem;
  font-size: 1.2rem;
`;

const StyledSearchBarContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 3rem;
  grid-template-rows: 100%;
  justify-items: center;
  align-items: center;

  margin: 1.5rem;

  border-radius: 0.5rem;
  background-color: #c1d2d7;

  &:focus-within {
    outline: 2px solid var(--primary-color);

    transition: outline 0.3s ease;
  }
`;

const StyledButton = styled.button`
  border: none;
  background: transparent;
`;
