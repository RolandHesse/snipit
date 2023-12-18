import styled from "styled-components";
import { Icon } from "@iconify/react";

function SmallButton({ type, onClick, buttonName, buttonIcon, ariaLabel }) {
  return (
    <StyledButton type={type} onClick={onClick} aria-label={ariaLabel}>
      <span role="img" aria-hidden="true">
        <Icon icon={buttonIcon} className="button-icon" />{" "}
      </span>
      {buttonName}
    </StyledButton>
  );
}

export default SmallButton;

const StyledButton = styled.button`
  font-weight: 200;
  font-size: medium;
  color: var(--text-color);
  background-color: var(--light-color);
  padding: 0.1rem 0.1rem;
  border-radius: 0.5rem;
  border-top: 2px solid #cccccc;
  border-right: 2px solid var(--primary-color);
  border-bottom: 2px solid var(--primary-color);
  border-left: 2px solid #cccccc;
  cursor: pointer;
  transition: background-color 0.3s ease, color 0.3s ease;
  &:hover {
    background-color: var(--main-blue);
    color: white;

    .button-icon {
      color: white;
    }
  }
`;
