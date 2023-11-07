import SnippetCardList from "@/components/SnippetCardList";
import styled from "styled-components";
import useSWR from "swr";

export default function HomePage() {
  const { data, error, isLoading } = useSWR("api/snippets");

  if (error) return <p>failed to load🥶😵‍💫😨😩😢</p>;
  if (isLoading) return <p>wait....wait...wait... still loading...🤓</p>;

  return (
    <StyledHomePage>
      <SnippetCardList data={data} />;
    </StyledHomePage>
  );
}

const StyledHomePage = styled.div`
  margin: 3.5rem 0 0 0;
`;
