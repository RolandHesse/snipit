import Header from "@/components/Header";
import GlobalStyle from "../styles";
import useSWR, { SWRConfig } from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function App({ Component, pageProps }) {
  const { data, error, isLoading } = useSWR("api/snippets", fetcher);

  if (error) return <div>failed to load🥶😵‍💫😨😩😢</div>;
  if (isLoading) return <div>wait....wait...wait... still loading...🤓</div>;

  return (
    <SWRConfig value={{ fetcher, refreshInterval: 3000 }}>
      <>
        <GlobalStyle />
        <Header />
        <Component {...pageProps} data={data} />
      </>
    </SWRConfig>
  );
}
