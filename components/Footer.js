import Link from "next/link";
import styled from "styled-components";

export default function Footer() {
  return (
    <StyledLink href="/form">
      <StyledButton>+ Add new</StyledButton>
    </StyledLink>
  );
}

const StyledLink = styled(Link)`
  display: flex;
  justify-content: center;
  position: fixed;
  color: white;
  background-color: #005f6a;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 0.5rem;
  height: 3rem;
  width: 100%;
  text-decoration: none;
`;

const StyledButton = styled.button`
  border: none;
  color: white;
  background-color: #005f6a;
  font-size: 1.5rem;
  cursor: pointer;
`;
