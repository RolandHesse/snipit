import { StyledPage } from "@/components/Layout";
import SnippetCardList from "@/components/SnippetCardList";

export default function HomePage({ data }) {
  console.log("HomepageData", data);
  return (
    <StyledPage>
      <SnippetCardList data={data} />
    </StyledPage>
  );
}
