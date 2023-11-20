import { StyledPage, StyledText } from "@/components/Layout";
import SnippetCardList from "@/components/SnippetCardList";
import useSWR from "swr";

export default function HomePage() {
  const { data, error, isLoading } = useSWR("api/snippets");

  if (error) return <StyledText>Failed to load...🥶 😵‍💫 😨 😩 😢</StyledText>;
  if (isLoading)
    return <StyledText>Wait....wait...wait... still loading...🤓</StyledText>;

  return (
    <StyledPage>
      <SnippetCardList data={data} />;
    </StyledPage>
  );
}
