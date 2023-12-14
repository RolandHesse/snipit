import { useState } from "react";
import { Icon } from "@iconify/react";
import styled, { css } from "styled-components";

export default function CopyWithOneClick({ iconColor, codeData, isDetail }) {
  const [isCopied, setIsCopied] = useState(false);
  async function handleClick() {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
    await navigator.clipboard.writeText(codeData);
  }

  return (
    <StyledButton
      $isDetail={isDetail}
      type="button"
      onClick={handleClick}
      aria-label={isCopied ? "code copied" : "copy code"}
    >
      <Icon
        icon={isCopied ? "mingcute:check-fill" : "fa-regular:copy"}
        color={iconColor}
        aria-hidden="true"
        // aria-label={isCopied ? "code copied" : "copy code"}
      />
      {isDetail && (isCopied ? "code copied" : "copy code")}
    </StyledButton>
  );
}

const StyledButton = styled.button`
  position: absolute;
  background: transparent;
  border: none;
  display: flex;
  align-items: center;
  gap: 0.3rem;
  ${({ $isDetail }) =>
    $isDetail
      ? css`
          top: 7.3rem;
          right: 1.2rem;
          color: var(--primary-color);
          border: 0.5rem;
        `
      : css`
          bottom: 1rem;
          right: 1rem;
        `}
`;
