import styled from "styled-components";
import SnippetCard from "./SnippetCard";

export default function SnippetCardList({ data }) {
  return (
    <>
      <ListHeading>List of Snippets</ListHeading>
       <ul>
      {data.map((snippet) => (
        <li key={snippet._id}>
          <SnippetCard
            snippetData={snippet}
            name={snippet.name}
            description={snippet.description}
          />
        </li>
      ))}
     </ul>
    </>
  );
}

const ListHeading = styled.h1`
  font-size: 2rem;
  color: #005f6a;
  display: flex;
  justify-content: center;
`;
