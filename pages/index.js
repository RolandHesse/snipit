import { StyledPage } from "@/components/Layout";
import SnippetCardList from "@/components/SnippetCardList";
import Fuse from "fuse.js";
import { useState } from "react";
import styled from "styled-components";
import { Icon } from "@iconify/react";
import { useRef } from "react";
import useLocalStorageState from "use-local-storage-state";
import useSWR from "swr";
import StyledToaster from "@/components/StyledToaster";

const fuseOptions = {
  threshold: 0.5,
  keys: ["name", "code", "description", "links", "tag"],
};

export default function HomePage({ onToggleFavorite, favorites }) {
  // define state variable which stores search results
  const [results, setResults] = useState([]);
  // define state variable which stores current search term
  const [searchTerm, setSearchTerm] = useState("");
  // define state variable which stores last five search terms; gets updated when updateLastSearches is called
  const [lastSearches, setLastSearches] = useLocalStorageState("lastSearches", {
    defaultValue: [],
  });
  // boolean state variable which is set to true as soon as the user starts typing into the search bar
  const [isSearching, setIsSearching] = useState(false);
  const [isDropdown, setIsDropdown] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(-1);

  const { data } = useSWR("/api/snippets");

  const fuse = new Fuse(data, fuseOptions);
  const inputRef = useRef(null);

  // set the focus on StyledSearchBarInput when user clicks the Search-Icon
  function handleClick() {
    inputRef.current.focus();
  }

  function updateLastSearches(newTerm) {
    if (newTerm.trim() !== "") {
      setLastSearches((prevSearches) =>
        [newTerm, ...prevSearches.filter((term) => term !== newTerm)].slice(
          0,
          5
        )
      );
    }
  }

  function navigateSearchHistory(direction) {
    if (direction === "up" && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
    if (direction === "down" && currentIndex < lastSearches.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  }

  function handleKeyDown(event) {
    if (event.key === "ArrowUp") {
      navigateSearchHistory("up");
    }
    if (event.key === "ArrowDown") {
      navigateSearchHistory("down");
    }
    if (event.key === "Enter") {
      updateLastSearches(searchTerm);
    }
    if (event.key === "Enter" && currentIndex !== -1) {
      setIsSearching(true);
      setSearchTerm(lastSearches[currentIndex]);
      const searchTermFromDropDown = lastSearches[currentIndex];
      inputRef.current.value = searchTermFromDropDown;
      const searchResult = fuse.search(searchTermFromDropDown).slice(0, 10);
      setResults(searchResult.map((result) => result.item));
    }
  }

  function handleBlur() {
    updateLastSearches(searchTerm);
    setIsDropdown(false);
  }

  function handleSearch(event) {
    if (!fuse) {
      return;
    }
    setSearchTerm(event.target.value);
    const searchResult = fuse.search(searchTerm).slice(0, 10);
    setResults(searchResult.map((result) => result.item));
    searchTerm !== "" ? setIsSearching(true) : setIsSearching(false);
  }

  function handleLastSearchClick(event, lastSearchTerm) {
    event.preventDefault();
    setIsSearching(true);
    if (inputRef.current) {
      inputRef.current.value = lastSearchTerm;
      updateLastSearches(lastSearchTerm);
      const searchResult = fuse.search(lastSearchTerm).slice(0, 10);
      setResults(searchResult.map((result) => result.item));
    }
  }
  return (
    <StyledPage>
      <StyledToaster />
      <StyledLastSearchContainer
        onFocus={() => setIsDropdown(true)}
        onBlur={handleBlur}
        tabIndex={0}
      >
        <StyledSearchBarContainer>
          <StyledSearchBarForm onSubmit={(event) => event.preventDefault()}>
            <label htmlFor="search"></label>
            <StyledSearchBarInput
              ref={inputRef}
              type="text"
              id="search"
              name="search"
              placeholder="Search"
              autoComplete="off"
              onChange={handleSearch}
              onKeyDown={handleKeyDown}
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
        {isDropdown && (
          <StyledDropdown>
            <StyledLine />
            <StyledList>
              {lastSearches
                ?.filter((search) => {
                  if (searchTerm === "") {
                    return true;
                  }
                  if (
                    search.toLowerCase().startsWith(searchTerm.toLowerCase())
                  ) {
                    return true;
                  } else {
                    return false;
                  }
                })
                .map((search, index) => (
                  <StyledListItem
                    key={index}
                    onMouseDown={() => handleLastSearchClick(event, search)}
                    onMouseEnter={() => setCurrentIndex(index)}
                    onMouseLeave={() => setCurrentIndex(-1)}
                    tabIndex={0}
                    style={{
                      fontWeight: currentIndex === index ? 600 : "",
                    }}
                  >
                    <Icon icon="mdi:recent" height="1.3rem" /> {search}
                  </StyledListItem>
                ))}
            </StyledList>
          </StyledDropdown>
        )}
      </StyledLastSearchContainer>
      {isSearching === true && results.length === 0 ? (
        <StyledSorryMessage>Sorry, no snippets found... 😭</StyledSorryMessage>
      ) : (
        <SnippetCardList
          data={isSearching === true ? results : data}
          onToggleFavorite={onToggleFavorite}
          favorites={favorites}
        />
      )}
    </StyledPage>
  );
}
const StyledLastSearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 0;
  border-radius: 0.5rem;
  background-color: #c1d2d7;
  margin: 0 1.5rem;
  &:focus-within {
    outline: 2px solid var(--primary-color);
    border-radius: 0.5rem;
    transition: outline 0.3s ease;
  }
`;
const StyledSearchBarContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 3rem;
  grid-template-rows: 100%;
  justify-items: center;
  align-items: center;
  border-radius: 0.5rem;
  background-color: #c1d2d7;
`;
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
  padding: 1rem 1.5rem;
  font-size: 1.2rem;
`;
const StyledButton = styled.button`
  border: none;
  background: transparent;
`;
const StyledDropdown = styled.div`
  margin: 0 24px;
`;
const StyledList = styled.ul`
  list-style-type: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 0.1rem;
`;
const StyledListItem = styled.li`
  display: flex;
  flex-direction: row;
  align-items: flex-end;
  gap: 0.5rem;
  cursor: pointer;
  padding: 0.5rem 0;
`;
const StyledLine = styled.hr`
  margin: 0;
  border: none;
  height: 0.01rem;
  background-color: var(--primary-color);
`;
const StyledSorryMessage = styled.h3`
  margin: 1.5rem;
  color: var(--primary-color);
  text-align: center;
`;
