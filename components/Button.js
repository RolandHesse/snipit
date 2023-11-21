import { StyledButtonOrLink } from "./StyledButtonOrLink";
import { Icon } from "@iconify/react";

function Button({
  onClick,
  buttonName,
  buttonIcon,
  $backgroundColor,
  $shadowColor,
}) {
  return (
    <StyledButtonOrLink
      onClick={onClick}
      $backgroundColor={$backgroundColor}
      $shadowColor={$shadowColor}
    >
      <span role="img" aria-label="hidden">
        <Icon icon={buttonIcon} className="button-icon" />
      </span>
      {buttonName}
    </StyledButtonOrLink>
  );
}

export default Button;
