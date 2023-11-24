import { StyledPage } from "@/components/Layout";
import SnippetCardList from "@/components/SnippetCardList";

export default function HomePage({ data, onToggleFavorite, favorites }) {
  return (
    <StyledPage>
      <SnippetCardList
        data={data}
        onToggleFavorite={onToggleFavorite}
        favorites={favorites}
      />
    </StyledPage>
  );
}
