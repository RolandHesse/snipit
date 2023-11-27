import {
  ListHeading,
  StyledPage,
  StyledSnippetList,
} from "@/components/Layout";
import LinkLayout from "@/components/LinkLayout";
import SnippetCard from "@/components/SnippetCard";

function FavoritePage({ data, onToggleFavorite, favorites }) {
  const dataIds = data.map((snippet) => snippet._id);

  return (
    <StyledPage>
      <LinkLayout
        url={"/"}
        linkName={"Go Back"}
        linkIcon="line-md:arrow-left"
      />
      <ListHeading>Favorites</ListHeading>
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
                description={snippet.description}
              />
            </li>
          ))}
      </StyledSnippetList>
    </StyledPage>
  );
}

export default FavoritePage;
