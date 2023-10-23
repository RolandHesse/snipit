import { Montserrat } from "@next/font/google";
import { createGlobalStyle } from "styled-components";

const montserratFont = Montserrat({ subsets: ["latin"] });

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  :root {
    --primary-color: #0B4C5F;
    --white: white;
  }

  body {
    margin: 4rem 0 0 0;
    font-family: ${montserratFont.style.fontFamily};
    padding: 2rem;
  }
`;
