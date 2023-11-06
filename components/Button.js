import styled from "styled-components";

function Button({ onDelete, buttonName, buttonEmoji }) {
  return (
    <StyledButton onClick={onDelete}>
      <span role="img" aria-label="hidden">
        {buttonEmoji}
      </span>
      {buttonName}
    </StyledButton>
  );
}

export default Button;

const StyledButton = styled.button`
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
  cursor: pointer;
  &:hover {
    background-color: var(--primary-color);
    color: white;
  }
`;
