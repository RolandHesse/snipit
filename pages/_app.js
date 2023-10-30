import Header from "@/components/Header";
import Footer from "@/components/Footer";
import GlobalStyle from "../styles";
import { SWRConfig } from "swr";

const fetcher = (...args) => fetch(...args).then((response) => response.json());

export default function App({ Component, pageProps }) {
  return (
    <SWRConfig value={{ fetcher }}>
      <GlobalStyle />
      <Header />
      <Component {...pageProps} />
      <Footer />
    </SWRConfig>
  );
}
