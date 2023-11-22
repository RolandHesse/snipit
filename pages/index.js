import { StyledPage } from "@/components/Layout";
import SnippetCardList from "@/components/SnippetCardList";

export default function HomePage({ data, onToggleFavorite, isFavorite }) {
  console.log("HomepageData", data);
  return (
    <StyledPage>
      <SnippetCardList
        data={data}
        onToggleFavorite={onToggleFavorite}
        isFavorite={isFavorite}
      />
    </StyledPage>
  );
}
