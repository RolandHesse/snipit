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
  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [lastSearches, setLastSearches] = useLocalStorageState("lastSearches", {
    defaultValue: [],
  });
  const [isSearching, setIsSearching] = useState(false);
  const [isDropdown, setIsDropdown] = useState(false);

  const { data } = useSWR("/api/snippets");

  console.log("data: ", data);

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

  function handleKeyPress(event) {
    if (event.key === "Enter") {
      updateLastSearches(searchTerm);
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
              onKeyDown={handleKeyPress}
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
                  >
                    <Icon icon="mdi:recent" height="1.3rem" /> {search}
                  </StyledListItem>
                ))}
            </StyledList>
          </StyledDropdown>
        )}
      </StyledLastSearchContainer>
      {isSearching === true && results.length === 0 ? (
        <StyledSorryMessage>Sorry, no snippets found... 😢</StyledSorryMessage>
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
  margin: 0;
  border-radius: 3rem;
  background-color: var(--white);

  &:focus-within {
    outline: 2px solid var(--primary-color);
    border-radius: 3rem;
    transition: outline 0.3s ease;
    box-shadow: 0px 0px 17px 0px rgba(35, 1, 169, 0.38);
  }
`;

const StyledSearchBarContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 3rem;
  grid-template-rows: 100%;
  justify-items: center;
  align-items: center;
  border-radius: 3rem;
  border: 3px solid var(--main-lila);
  background-color: var(--white);
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
  padding: 0.8rem 1.5rem;
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
