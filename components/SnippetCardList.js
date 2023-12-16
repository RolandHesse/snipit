import { ListHeading, StyledSnippetList } from "./Layout";
import SnippetCard from "./SnippetCard";

function shortDescription(description, maxLength) {
  if (description?.length > maxLength) {
    return `${description.slice(0, maxLength)}...`;
  }
  return description;
}

export default function SnippetCardList({ data, onToggleFavorite, favorites }) {
  return (
    <>
      <ListHeading tabIndex={0}>List of Snippets</ListHeading>
      <StyledSnippetList>
        {data?.map((snippet) => (
          <li key={snippet._id}>
            <SnippetCard
              onToggleFavorite={onToggleFavorite}
              favorites={favorites}
              snippetData={snippet}
              name={snippet.name}
              description={shortDescription(snippet.description, 60)}
              tags={snippet.tags}
            />
          </li>
        ))}
      </StyledSnippetList>
    </>
  );
}
