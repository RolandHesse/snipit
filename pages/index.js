import SnippetCardList from "@/components/SnippetCardList";
import styled from "styled-components";
import useSWR from "swr";

export default function HomePage() {
  const { data, error, isLoading } = useSWR("api/snippets");

  if (error) return <StyledText>Failed to load...🥶 😵‍💫 😨 😩 😢</StyledText>;
  if (isLoading)
    return <StyledText>Wait....wait...wait... still loading...🤓</StyledText>;

  return (
    <StyledHomePage>
      <SnippetCardList data={data} />;
    </StyledHomePage>
  );
}

const StyledHomePage = styled.div`
  margin: 3.5rem 0 0 0;
`;

const StyledText = styled.p`
  color: var(--primary-color);
  font-size: 2rem;
  padding: 3rem 2rem;
`;
