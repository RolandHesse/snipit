import { StyledButtonOrLink } from "./StyledButtonOrLink";
import { Icon } from "@iconify/react";

function Button({ onClick, buttonName, buttonIcon, $backgroundColor }) {
  return (
    <StyledButtonOrLink onClick={onClick} $backgroundColor={$backgroundColor}>
      <span role="img" aria-label="hidden">
        <Icon icon={buttonIcon} className="button-icon" />
      </span>
      {buttonName}
    </StyledButtonOrLink>
  );
}

export default Button;
