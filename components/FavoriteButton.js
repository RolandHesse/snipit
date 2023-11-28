import { Icon } from "@iconify/react";
import styled, { css } from "styled-components";

export default function FavoriteButton({ isList, onClick, isFavorite }) {
  return (
    <StyledFavoriteButton
      $isList={isList}
      type="button"
      onClick={onClick}
      aria-label="favorite"
    >
      {isFavorite ? (
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
  top: -1.3rem;
  right: 0rem;
`;
