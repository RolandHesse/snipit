import styled from "styled-components";
import SnippetCard from "./SnippetCard";
import Link from "next/link";

export default function SnippetCardList({ data }) {
  return (
    <>
      <ListHeading>List of Snippets</ListHeading>
      <StyledSnippetList>
        {data.map((snippet) => (
          <li key={snippet._id}>
            <Link href={`/${snippet._id}`}>
              <SnippetCard
                snippetData={snippet}
                name={snippet.name}
                description={snippet.description}
              />
            </Link>
          </li>
        ))}
      </StyledSnippetList>
    </>
  );
}

const ListHeading = styled.h1`
  font-size: 2rem;
  color: var(--teal);
  display: flex;
  justify-content: center;
`;

const StyledSnippetList = styled.ul`
  list-style-type: none;
  padding: 0;
`;
