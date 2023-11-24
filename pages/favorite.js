import {
  ListHeading,
  StyledPage,
  StyledSnippetList,
} from "@/components/Layout";
import LinkLayout from "@/components/LinkLayout";
import SnippetCard from "@/components/SnippetCard";

function FavoritePage({ data, onToggleFavorite, favorites }) {
  console.log("Favorite Page", favorites);

  const dataIds = data.map((snippet) => snippet._id);
  console.log("Data Ids", dataIds);

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
          ?.filter((snippet) => {
            snippet._id === favorites;
          })
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
