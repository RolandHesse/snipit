import Link from "next/link";
import styled from "styled-components";

function BackLink({ url }) {
  return (
    <StyledLink href={url}>
      <span role="img" aria-hidden="true">
        ⬅️ {ArrowLeft}
      </span>{" "}
      go back
    </StyledLink>
  );
}

export default BackLink;

const StyledLink = styled(Link)`
  text-decoration: none;
  font-weight: 600;
  font-variant: small-caps;
  color: var(--text-color);
  background-color: var(--light-color);
  padding: 0.3rem 0.6rem;
  border-radius: 0.5rem;
  border-top: 1px solid #cccccc;
  border-right: 1px solid #333333;
  border-bottom: 1px solid #333333;
  border-left: 1px solid #cccccc;
  visited: {
    color: "purple";
  }
`;

function ArrowLeft() {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      viewBox="0 0 16 16"
      // {...props}
    >
      <path
        fill="none"
        stroke="#04151b"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.5"
        d="m7.25 3.75l-4.5 4.5l4.5 4.5m6-4.5H2.75"
      ></path>
    </svg>
  );
}
