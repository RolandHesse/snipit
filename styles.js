import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: border-box;
  }

  :root {
    --teal: #00586a;
    --light-grey: #EEEEF6;
    --white: white;
  }

  body {
    margin: 4rem 0 0 0;
    font-family:  Arial, 'Trebuchet MS', 'Lucida Sans Unicode', 'Lucida Grande', 'Lucida Sans', sans-serif, system-ui, 'Segoe UI', 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`;
