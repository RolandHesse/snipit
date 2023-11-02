import Link from "next/link";
import styled from "styled-components";

export default function Footer() {
  return <StyledLink href="/create">+ Add new</StyledLink>;
}

const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  position: fixed;
  color: white;
  background-color: var(--primary-color);
  left: 0;
  right: 0;
  bottom: 0;
  padding: 0.5rem 0.7rem 0.7rem 0.7rem;
  height: 3rem;
  width: 100%;
  text-decoration: none;
  font-size: 1.5rem;
  border-top: solid white 0.1rem;
`;
