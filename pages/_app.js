import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GlobalStyle from "../styles";
import { SWRConfig } from "swr";
import useSWR from "swr";
import styled from "styled-components";
import useLocalStorageState from "use-local-storage-state";

const fetcher = (...args) => fetch(...args).then((response) => response.json());

export default function App({ Component, pageProps }) {
  const { data, error, isLoading } = useSWR("api/snippets", fetcher);

  const [favorites, setFavorites] = useLocalStorageState("favorites", {
    defaultValue: [],
  });

  function handleToggleFavorite(snippetId) {
    if (favorites.includes(snippetId)) {
      setFavorites(favorites?.filter((favorite) => favorite !== snippetId));
    } else {
      setFavorites([...favorites, snippetId]);
    }
  }

  if (error) return <StyledText>Failed to load...🥶 😵‍💫 😨 😩 😢</StyledText>;
  if (isLoading)
    return <StyledText>Wait....wait...wait... still loading...🤓</StyledText>;

  const defaultTags = data?.reduce((tagsArray, item) => {
    item.tags?.forEach((tag) => {
      const existingTag = tagsArray.find(
        (singleTag) => singleTag.label === tag.label
      );
      if (!existingTag) {
        tagsArray.push(tag);
      }
    });
    return tagsArray;
  }, []);

  console.log("defaultTags app.js ", defaultTags);

  return (
    <SWRConfig value={{ fetcher }}>
      <GlobalStyle />
      <Header />
      <Component
        {...pageProps}
        data={data}
        onToggleFavorite={handleToggleFavorite}
        favorites={favorites}
        defaultTags={defaultTags}
      />
      <Footer />
    </SWRConfig>
  );
}

const StyledText = styled.p`
  /* color: var(--primary-color); */
  color: red;
  font-family: Impact, Haettenschweiler, "Arial Narrow Bold", sans-serif;
  font-size: 2rem;
  padding: 3rem 2rem;
`;
