import Link from "next/link";
import styled from "styled-components";
import { Icon } from "@iconify/react";

export default function Footer() {
  return (
    <StyledFooter>
      <StyledLink href="/create">+ Add new</StyledLink>
      <StyledLink href="/favorite">
        {" "}
        <Icon
          icon="ic:sharp-star"
          width="24"
          stroke-width="1.5"
          stroke="var(--white"
        />
        {"  "}
        Favorites
      </StyledLink>
    </StyledFooter>
  );
}

const StyledFooter = styled.div`
  display: flex;
  justify-content: space-evenly;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  color: white;
  height: 3rem;
  background-color: var(--primary-color);
  width: 100%;
  text-decoration: none;
  font-size: 1.5rem;
  border-top: solid white 0.1rem;
  padding: 0.5rem;
`;
const StyledLink = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 1.5rem;
`;
