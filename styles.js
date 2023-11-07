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
    --text-color: #04151B;
    --light-color: #C1D2D7;
  }

  body {
    font-family: ${montserratFont.style.fontFamily};
    padding: 0.5rem; 
  }
`;
