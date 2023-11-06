import Link from "next/link";
import styled from "styled-components";

function LinkLayout({ url, linkName, linkEmoji }) {
  return (
    <StyledLink href={url}>
      <span role="img" aria-hidden="true">
        {linkEmoji}
      </span>{" "}
      {linkName}
    </StyledLink>
  );
}

export default LinkLayout;

const StyledLink = styled(Link)`
  text-decoration: none;
  font-weight: 600;
  color: var(--primary-color);
  background-color: var(--light-color);
  padding: 0.3rem 0.6rem;
  border-radius: 0.5rem;
  border-top: 2px solid #cccccc;
  border-right: 2px solid var(--primary-color);
  border-bottom: 2px solid var(--primary-color);
  border-left: 2px solid #cccccc;
  font-size: large;
  &:hover {
    background-color: var(--primary-color);
    color: white;
  }
`;

// function ArrowLeft() {
//   return (
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       width="1em"
//       height="1em"
//       viewBox="0 0 16 16"
//       // {...props}
//     >
//       <path
//         fill="none"
//         stroke="#04151b"
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth="1.5"
//         d="m7.25 3.75l-4.5 4.5l4.5 4.5m6-4.5H2.75"
//       ></path>
//     </svg>
//   );}
