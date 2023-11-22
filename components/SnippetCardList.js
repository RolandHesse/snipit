import { ListHeading, StyledSnippetList } from "./Layout";
import SnippetCard from "./SnippetCard";

function ShortDescription(description, maxLength) {
  if (description?.length > maxLength) {
    return `${description.slice(0, maxLength)}...`;
  }
  return description;
}

export default function SnippetCardList({
  data,
  onToggleFavorite,
  isFavorite,
}) {
  console.log("SnippetCardList", isFavorite);

  return (
    <>
      <ListHeading>List of Snippets</ListHeading>
      <StyledSnippetList>
        {data?.map((snippet) => (
          <li key={snippet._id}>
            <SnippetCard
              onToggleFavorite={onToggleFavorite}
              isFavorite={isFavorite}
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
