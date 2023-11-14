import Link from "next/link";
import styled from "styled-components";
import { useState, useEffect } from "react";
import Image from "next/image";

export default function SnippetCard({ snippetData, name, description }) {
  const [isCopied, setIsCopied] = useState(false);
  async function handleClick() {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
    await navigator.clipboard.writeText(snippetData.code);
    // window.alert("Code succesfully copied!");
  }

  if (!snippetData) return <div>No snippets yet 😭</div>;

  console.log("isCopied: ", isCopied);

  return (
    <StyledCard>
      <StyledLinkComponent href={`/${snippetData._id}`}>
        <CardHeading>{name}</CardHeading>
        <CardDescription>{description}</CardDescription>
      </StyledLinkComponent>

      <StyledButton type="button" onClick={handleClick}>
        {isCopied === true ? "🙏" : "Copy code"}
      </StyledButton>
    </StyledCard>
  );
}

const StyledCard = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  margin: 1.5rem;
  padding: 2rem 1.5rem;
  border-radius: 0.5rem;
  background-color: var(--primary-color);
  color: var(--white);
  position: relative;
`;
const CardHeading = styled.h2`
  font-size: 1.5rem;
  margin: 0;
`;
const CardDescription = styled.p`
  font-size: 1rem;
  margin: 0;
`;

const StyledButton = styled.button`
  position: absolute;
  right: 1rem;
  bottom: 1rem;
`;

const StyledLinkComponent = styled(Link)`
  text-decoration: none;
  color: var(--white);
`;
