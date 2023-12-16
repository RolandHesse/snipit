import styled from "styled-components";
export const StyledButtonOrLink = styled.button`
  text-decoration: ${({ $isLink }) => $isLink && "none"};
  cursor: pointer;
  font-weight: 600;
  font-size: large;
  color: var(--text-color);
  background-color: var(--light-color);
  padding: 0.5rem 2rem;
  border-radius: 5rem;
  border: 2px solid var(--main-blue);
  display: inline-flex;
  align-items: center;
  transition: background-color 0.3s ease, color 0.3s ease;
  .button-icon {
    margin-right: 0.5rem;
    font-size: 1.7rem;
  }
  &:hover {
    background-color: ${({ $backgroundColor }) =>
      $backgroundColor ? $backgroundColor : "var(--main-blue)"};
    color: white;

    .button-icon {
      color: white;
    }
  }
`;
