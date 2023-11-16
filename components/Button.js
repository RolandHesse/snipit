import { StyledButtonOrLink } from "./StyledButtonOrLink";
import { Icon } from "@iconify/react";

function Button({ onDelete, buttonName, buttonIcon }) {
  return (
    <StyledButtonOrLink onClick={onDelete}>
      <span role="img" aria-label="hidden">
        <Icon icon={buttonIcon} className="button-icon" />
      </span>
      {buttonName}
    </StyledButtonOrLink>
  );
}

export default Button;
