import { Icon } from "@iconify/react";
import styled, { css } from "styled-components";

export default function FavoriteButton({ onClick, isFavorite, isDetail }) {
  return (
    <StyledFavoriteButton type="button" onClick={onClick} aria-label="favorite">
      <StyledIcon
        icon="iconamoon:star-fill"
        width="48"
        stroke={isFavorite ? "var(--white)" : "var(--primary-color)"}
        strokeWidth="1.5"
        color={isFavorite ? "var(--main-lila)" : "var(--white)"}
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

const StyledIcon = styled(Icon)`
  /* filter: drop-shadow(0px 0px 5px rgba(0, 0, 0, 0.25)); */
  filter: drop-shadow(0px 0px 5px rgba(154, 48, 197, 0.5));
`;
