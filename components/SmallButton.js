import styled from "styled-components";
import { Icon } from "@iconify/react";

function SmallButton({ handleClick, buttonName, buttonIcon, ariaLabel }) {
  return (
    <StyledButton onClick={handleClick}>
      <span role="img" aria-label={ariaLabel}>
        <Icon
          icon={buttonIcon}
          // style={{ fontSize: "1.5rem" }}
          className="button-icon"
        />{" "}
      </span>
      {buttonName}
    </StyledButton>
  );
}

export default SmallButton;

const StyledButton = styled.button`
  font-weight: 200;
  font-size: medium;
  color: var(--primary-color);
  background-color: var(--light-color);
  padding: 0.1rem 0.1rem;
  border-radius: 0.5rem;
  border-top: 2px solid #cccccc;
  border-right: 2px solid var(--primary-color);
  border-bottom: 2px solid var(--primary-color);
  border-left: 2px solid #cccccc;
  cursor: pointer;
  /* 
  display: flex;
  align-items: center; */
  transition: background-color 0.3s ease, color 0.3s ease;
  &:hover {
    background-color: var(--primary-color);
    color: white;

    .button-icon {
      color: white;
    }
  }
`;
