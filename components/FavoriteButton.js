import { Icon } from "@iconify/react";
import styled, { css } from "styled-components";

export default function FavoriteButton({ onClick, isFavorite, isDetail }) {
  return (
    <StyledFavoriteButton type="button" onClick={onClick} aria-label="favorite">
      <Icon
        icon="iconamoon:star-fill"
        width="48"
        color={isFavorite ? "var(--main-lila)" : "var(--light-color)"}
      />
    </StyledFavoriteButton>
  );
}

const StyledFavoriteButton = styled.button`
  border: none;
  background: none;
  color: var(--primary-color);
  position: absolute;
  ${({ $isDetail }) =>
    $isDetail
      ? css`
          top: 7.3rem;
          right: 1.2rem;
          border: 0.5rem;
        `
      : css`
          top: 1rem;
          right: 1rem;
        `}
`;
