import styled from "styled-components";
import { Icon } from "@iconify/react";

function Button({ onDelete, buttonName, buttonIcon }) {
  return (
    <StyledButton onClick={onDelete}>
      <span role="img" aria-label="hidden">
        <Icon
          icon={buttonIcon}
          style={{ fontSize: "1.7rem" }}
          className="button-icon"
        />{" "}
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

  display: inline-flex;
  align-items: center;
  transition: background-color 0.3s ease, color 0.3s ease;
  .button-icon {
    margin-right: 0.5rem;
  }
  &:hover {
    background-color: var(--primary-color);
    color: white;

    .button-icon {
      color: white;
    }
  }
`;
