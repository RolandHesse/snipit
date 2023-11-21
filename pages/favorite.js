import { ListHeading, StyledPage } from "@/components/Layout";
import LinkLayout from "@/components/LinkLayout";
import SnippetCard from "@/components/SnippetCard";

function FavoritePage({ data, name, description, onToggleFavorite }) {
  const favorites = data.filter(
    (snippet) => snippetInfo.find((info) => info.id === snippet.id)?.isFavorite
  );
  console.log("favorites", favorites);
  return (
    <StyledPage>
      <LinkLayout
        url={"/"}
        linkName={"Go Back"}
        linkIcon="line-md:arrow-left"
      />
      <ListHeading>Favorites</ListHeading>
      <SnippetCard
        onToggleFavorite={onToggleFavorite}
        snippetData={data}
        name={name}
        description={description}
      />
    </StyledPage>
  );
}

export default FavoritePage;
