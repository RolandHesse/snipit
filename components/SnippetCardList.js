import styled from "styled-components";
import SnippetCard from "./SnippetCard";

export default function SnippetCardList({ data }) {
  return (
    <>
      <ListHeading>List of Snippets</ListHeading>
      {data.map((snippet) => (
        <p key={snippet._id}>
          <SnippetCard
            snippetData={snippet}
            name={snippet.name}
            description={snippet.description}
          />
        </p>
      ))}
    </>
  );
}

const ListHeading = styled.h1`
  font-size: 2rem;
  color: #005f6a;
  display: flex;
  justify-content: center;
`;
