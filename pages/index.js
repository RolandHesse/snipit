import { StyledPage } from "@/components/Layout";
import SnippetCardList from "@/components/SnippetCardList";
import Fuse from "fuse.js";
import { useState } from "react";
import styled from "styled-components";
import { Icon } from "@iconify/react";
import { useRef } from "react";
import useLocalStorageState from "use-local-storage-state";
const fuseOptions = {
  threshold: 0.5,
  keys: ["name", "code", "description", "links", "tag"],
};
export default function HomePage({ data, onToggleFavorite, favorites }) {
  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [lastSearches, setLastSearches] = useLocalStorageState("lastSearches", {
    defaultValue: [],
  });
  const [isSearching, setIsSearching] = useState(false);
  const [isDropdown, setIsDropdown] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const fuse = new Fuse(data, fuseOptions);
  const inputRef = useRef(null);
  function handleClick() {
    inputRef.current.focus();
  }
  function updateLastSearches(newTerm) {
    if (newTerm.trim() !== "" && newTerm !== lastSearches[0]) {
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
    } else if (direction === "down" && currentIndex < lastSearches.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
    const selectedSearchTerm =
      currentIndex !== -1 ? lastSearches[currentIndex] : "";
    setSearchTerm(selectedSearchTerm);
  }
  function handleKeyDown(event) {
    if (event.key === "ArrowUp") {
      navigateSearchHistory("up");
    }
    if (event.key === "ArrowDown") {
      navigateSearchHistory("down");
    } else if (event.key === "Enter") {
      updateLastSearches(searchTerm);
    }
  }
  // function handleKeyPress(event) {
  //   if (event.key === "Enter") {
  //     updateLastSearches(searchTerm);
  //   }
  // }
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
              // onKeyDown={handleKeyPress}
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
                    onKeyDown={() => handleLastSearchClick(event, search)}
                  >
                    <Icon icon="mdi:recent" height="1.3rem" /> {search}
                  </StyledListItem>
                ))}
            </StyledList>
          </StyledDropdown>
        )}
      </StyledLastSearchContainer>
      {isSearching === true && results.length === 0 ? (
        <StyledSorryMessage>
          Sorry, no snippets found... :weinen:
        </StyledSorryMessage>
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
  &:hover {
    font-weight: 600;
  }
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
