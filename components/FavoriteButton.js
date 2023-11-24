import { Icon } from "@iconify/react";
import styled, { css } from "styled-components";

export default function FavoriteButton({ isList, onClick, favorite }) {
  return (
    <StyledFavoriteButton
      $isList={isList}
      type="button"
      onClick={onClick}
      aria-label="favorite"
    >
      {favorite ? (
        <Icon
          icon="ic:sharp-star"
          width="48"
          strokeWidth="1.5"
          stroke="var(--white)"
        />
      ) : (
        <Icon
          icon="ic:sharp-star"
          width="48"
          stroke="var(--primary-color)"
          color="var(--white)"
          strokeWidth="1.5"
        />
      )}
    </StyledFavoriteButton>
  );
}

const StyledFavoriteButton = styled.button`
  border: none;
  background: none;
  color: var(--primary-color);
  position: absolute;

  ${({ $isList }) =>
    $isList
      ? css`
          top: -1.3rem;
          right: 0rem;
          color: var(--primary-color);
        `
      : css`
          top: 7.2rem;
          right: 1rem;
        `}
`;
