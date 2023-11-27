import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GlobalStyle from "../styles";
import { SWRConfig } from "swr";
import useSWR from "swr";
import styled from "styled-components";
import useLocalStorageState from "use-local-storage-state";
import ConfirmModal from "./ConfirmModal";

const fetcher = (...args) => fetch(...args).then((response) => response.json());

export default function App({ Component, pageProps }) {
  const { data, error, isLoading } = useSWR("api/snippets", fetcher);

  const [favorites, setFavorites] = useLocalStorageState("favorites", {
    defaultValue: [],
  });

  function handleToggleFavorite(snippetIdBrokkoli) {
    if (favorites.includes(snippetIdBrokkoli)) {
      setFavorites(
        favorites?.filter((favorite) => favorite !== snippetIdBrokkoli)
      );
    } else {
      setFavorites([...favorites, snippetIdBrokkoli]);
    }
  }

  if (error) return <StyledText>Failed to load...🥶 😵‍💫 😨 😩 😢</StyledText>;
  if (isLoading)
    return <StyledText>Wait....wait...wait... still loading...🤓</StyledText>;

  return (
    <SWRConfig value={{ fetcher }}>
      <GlobalStyle />
      <Header />
      <Component
        {...pageProps}
        data={data}
        onToggleFavorite={handleToggleFavorite}
        favorites={favorites}
      />
      <Footer />
    </SWRConfig>
  );
}

const StyledText = styled.p`
  color: var(--primary-color);
  font-size: 2rem;
  padding: 3rem 2rem;
`;
