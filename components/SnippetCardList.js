import { ListHeading, StyledSnippetList } from "./Layout";
import SnippetCard from "./SnippetCard";

function ShortDescription(description, maxLength) {
  if (description?.length > maxLength) {
    return `${description.slice(0, maxLength)}...`;
  }
  return description;
}

export default function SnippetCardList({ data, onToggleFavorite, favorites }) {
  return (
    <>
      <ListHeading>List of Snippets</ListHeading>
      <StyledSnippetList>
        {data?.map((snippet) => (
          <li key={snippet._id}>
            <SnippetCard
              onToggleFavorite={onToggleFavorite}
              favorites={favorites}
              snippetData={snippet}
              name={snippet.name}
              description={ShortDescription(snippet.description, 100)}
            />
          </li>
        ))}
      </StyledSnippetList>
    </>
  );
}
