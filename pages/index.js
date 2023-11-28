import SnippetCardList from "@/components/SnippetCardList";
import useSWR from "swr";
import Fuse from "fuse.js";
import { useState } from "react";
import styled from "styled-components";
import { Icon } from "@iconify/react";
import { useRef } from "react";
import useLocalStorageState from "use-local-storage-state";

const fuseOptions = {
  threshold: 0.3,
  keys: ["name", "code", "description", "links", "tag"],
};

export default function HomePage() {
  const { data, error, isLoading } = useSWR("api/snippets");
  const [results, setResults] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [lastSearches, setLastSearches] = useLocalStorageState("lastSearches", {
    defaultValue: [],
  });
  const [isSearching, setIsSearching] = useState(false);
  const [isDropdown, setIsDropdown] = useState(true);

  const fuse = new Fuse(data, fuseOptions);

  const inputRef = useRef(null);

  function handleClick() {
    inputRef.current.focus();
  }

  function updateLastSearches(newTerm) {
    if (newTerm !== "" && newTerm !== lastSearches[0]) {
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

  function handleBlur(event) {
    updateLastSearches(searchTerm);

    setIsDropdown(false);
    console.log("hello");
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

  function handleLastSearchClick(lastSearchTerm, event) {
    if (inputRef.current) {
      inputRef.current.value = lastSearchTerm;
      updateLastSearches(lastSearchTerm);
      const searchResult = fuse.search(lastSearchTerm).slice(0, 10);
      setResults(searchResult.map((result) => result.item));
      setIsSearching(true);
      console.log("lastSearchTerm: ", lastSearchTerm);
    }
  }

  if (error) return <p>failed to load...🥶😵‍💫😨😩😢</p>;
  if (isLoading) return <p>wait....wait...wait... still loading...🤓</p>;

  return (
    <>
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
            <StyledLine></StyledLine>
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
                    onClick={(event) => handleLastSearchClick(search, event)}
                  >
                    {" "}
                    <Icon icon="mdi:recent" height="1.3rem" /> {search}
                  </StyledListItem>
                ))}
            </StyledList>
          </StyledDropdown>
        )}
      </StyledLastSearchContainer>
      <SnippetCardList data={isSearching ? results : data} />
    </>
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
