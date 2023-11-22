import styled, { css } from "styled-components";
export const StyledButtonOrLink = styled.button`
  text-decoration: ${({ $isLink }) => $isLink && "none"};
  cursor: pointer;
  font-weight: 600;
  font-size: large;
  color: var(--primary-color);
  background-color: var(--light-color);
  padding: 0.3rem 0.6rem;
  border-radius: 0.5rem;
  border-top: 2px solid #cccccc;
  border-right: 2px solid var(--primary-color);
  border-bottom: 2px solid var(--primary-color);
  border-left: 2px solid #cccccc;
  display: inline-flex;
  align-items: center;
  transition: background-color 0.3s ease, color 0.3s ease;
  .button-icon {
    margin-right: 0.5rem;
    font-size: 1.7rem;
  }
  &:hover {
    background-color: ${({ $backgroundColor }) =>
      $backgroundColor ? $backgroundColor : "var(--primary-color)"};
    color: white;

    .button-icon {
      color: white;
    }
  }
`;
