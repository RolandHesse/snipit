import Link from "next/link";
import styled from "styled-components";
import { Icon } from "@iconify/react";

function LinkLayout({ url, linkName, linkIcon }) {
  return (
    <StyledLink href={url}>
      <span role="img" aria-hidden="true">
        <Icon
          icon={linkIcon}
          style={{ fontSize: "1.7rem" }}
          className="link-icon"
        />
      </span>
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
  display: inline-flex;
  align-items: center;
  transition: background-color 0.3s ease, color 0.3s ease;
  .link-icon {
    margin-right: 0.5rem;
  }
  &:hover {
    background-color: var(--primary-color);
    color: white;

    .link-icon {
      color: white;
    }
  }
`;
