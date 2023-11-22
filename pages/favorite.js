import { ListHeading, StyledPage } from "@/components/Layout";
import LinkLayout from "@/components/LinkLayout";
import SnippetCard from "@/components/SnippetCard";

function FavoritePage({
  data,
  name,
  description,
  onHandleFavorite,
  isFavorite,
}) {
  return (
    <StyledPage>
      <LinkLayout
        url={"/"}
        linkName={"Go Back"}
        linkIcon="line-md:arrow-left"
      />
      <ListHeading>Favorites</ListHeading>
      <SnippetCard
        onHandleFavorite={onHandleFavorite}
        isFavorite={isFavorite}
        snippetData={data}
        name={name}
        description={description}
      />
    </StyledPage>
  );
}

export default FavoritePage;
