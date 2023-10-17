import Header from "@/components/Header";
import GlobalStyle from "../styles";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function App({ Component, pageProps }) {
  const { data: snippets, error, isLoading } = useSWR("api/snippets", fetcher);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <>
      <GlobalStyle />
      <Header />
      <Component {...pageProps} data={snippets} />
    </>
  );
}
