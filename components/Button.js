import { StyledButtonOrLink } from "./StyledButtonOrLink";
import { Icon } from "@iconify/react";

function Button({ onClick, buttonName, buttonIcon }) {
  return (
    <StyledButtonOrLink onClick={onClick}>
      <span role="img" aria-label="hidden">
        <Icon icon={buttonIcon} className="button-icon" />
      </span>
      {buttonName}
    </StyledButtonOrLink>
  );
}

export default Button;
