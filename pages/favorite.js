import {
  ListHeading,
  StyledPage,
  StyledSnippetList,
} from "@/components/Layout";
import LinkLayout from "@/components/LinkLayout";
import SnippetCard from "@/components/SnippetCard";

function ShortDescription(description, maxLength) {
  if (description?.length > maxLength) {
    return `${description.slice(0, maxLength)}...`;
  }
  return description;
}

function FavoritePage({ data, onToggleFavorite, favorites }) {
  return (
    <StyledPage>
      <LinkLayout
        url={"/"}
        linkName={"Go Back"}
        linkIcon="line-md:arrow-left"
      />
      <ListHeading tabIndex={0}>Favorites</ListHeading>
      <StyledSnippetList>
        {data
          ?.filter((snippet) =>
            favorites.some((favoriteId) => favoriteId === snippet._id)
          )
          .map((snippet) => (
            <li key={snippet._id}>
              <SnippetCard
                onToggleFavorite={onToggleFavorite}
                favorites={favorites}
                snippetData={snippet}
                name={snippet.name}
                description={ShortDescription(snippet.description, 60)}
                tags={snippet.tags}
              />
            </li>
          ))}
      </StyledSnippetList>
    </StyledPage>
  );
}

export default FavoritePage;
