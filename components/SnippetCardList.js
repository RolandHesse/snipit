import styled from "styled-components";
import SnippetCard from "./SnippetCard";

export default function SnippetCardList({ data }) {
  return (
    <>
      <ListHeading>List of Snippets</ListHeading>
      <StyledSnippetList>
        {data.map((snippet) => (
          <li key={snippet._id}>
            <SnippetCard
              snippetData={snippet}
              name={snippet.name}
              description={snippet.description}
            />
          </li>
        ))}
      </StyledSnippetList>
    </>
  );
}

const ListHeading = styled.h1`
  font-size: 2rem;
  color: #005f6a;
  display: flex;
  justify-content: center;
`;

const StyledSnippetList = styled.ul`
  list-style-type: none;
  padding: 0;
`;
