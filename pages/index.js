import SnippetCardList from "@/components/SnippetCardList";
import useSWR from "swr";
import Fuse from "fuse.js";
import { useState } from "react";
import styled from "styled-components";
import { Icon } from "@iconify/react";

const fuseOptions = {
  threshold: 0.3,
  keys: ["name", "code", "description", "links", "tag"],
};
export default function HomePage() {
  const { data, error, isLoading } = useSWR("api/snippets");
  const [results, setResults] = useState([]);
  const fuse = new Fuse(data, fuseOptions);
  function handleSearch(event) {
    if (!fuse) {
      return;
    }
    const searchPattern = event.target.value;
    const searchResult = fuse.search(searchPattern).slice(0, 10);
    setResults(searchResult.map((result) => result.item));
  }

  if (error) return <p>failed to load...🥶😵‍💫😨😩😢</p>;
  if (isLoading) return <p>wait....wait...wait... still loading...🤓</p>;
  return (
    <>
      <StyledSearchBarContainer>
        <StyledSearchBarForm>
          <label htmlFor="search"></label>
          <StyledSearchBarInput
            type="text"
            id="search"
            name="search"
            placeholder="Search"
            onChange={handleSearch}
          />
        </StyledSearchBarForm>
        <Icon
          icon="line-md:search"
          height="2rem"
          color="var(--primary-color)"
        />
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
  /* gap: 1rem; */
  margin: 1.5rem;
  /* padding: 1rem 1.5rem; */
  border-radius: 0.5rem;
  background-color: #c1d2d7;
`;
