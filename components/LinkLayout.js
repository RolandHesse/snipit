import Link from "next/link";
import { StyledButtonOrLink } from "./StyledButtonOrLink";
import { Icon } from "@iconify/react";

function LinkLayout({ url, linkName, linkIcon }) {
  return (
    <StyledButtonOrLink href={url} $isLink as={Link}>
      <span role="img" aria-hidden="true">
        <Icon icon={linkIcon} className="button-icon" />
      </span>
      {linkName}
    </StyledButtonOrLink>
  );
}

export default LinkLayout;
