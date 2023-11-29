import { Icon } from "@iconify/react";
import styled, { css } from "styled-components";

export default function FavoriteButton({ onClick, isFavorite }) {
  return (
    <StyledFavoriteButton type="button" onClick={onClick} aria-label="favorite">
      <Icon
        icon="ic:sharp-star"
        width="48"
        stroke={isFavorite ? "var(--white)" : "var(--primary-color)"}
        strokeWidth="1.5"
        color={isFavorite ? "var(--primary-color)" : "var(--white)"}
      />
    </StyledFavoriteButton>
  );
}

const StyledFavoriteButton = styled.button`
  border: none;
  background: none;
  color: var(--primary-color);
  position: absolute;
  top: -1.3rem;
  right: 0rem;
`;
