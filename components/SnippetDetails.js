import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import useSWR from "swr";
import { useState } from "react";
import { Icon } from "@iconify/react";

function SnippetDetails({ onDelete }) {
  const router = useRouter();

  const { id } = router.query;

  const { data, isLoading, error } = useSWR(`/api/snippets/${id}`);

  const [isCopied, setIsCopied] = useState(false);
  async function handleClick() {
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
    await navigator.clipboard.writeText(data.code);
  }

  if (error) {
    return <div>Failed to load Details View 🥺</div>;
  }
  if (isLoading) {
    return <div>Loading Details View 🤓</div>;
  }

  const { name, code, description, tags, links } = data;

  return (
    <section>
      <Title>{name}</Title>
      <Heading>Code</Heading>
      <CodeContainer>
        {code}
        <StyledButton type="button" onClick={handleClick}>
          <Icon
            icon={isCopied === true ? "mingcute:check-fill" : "fa-regular:copy"}
            aria-label={isCopied === true ? "code copied" : "copy code"}
          />
          {isCopied === true ? "code copied" : "copy code"}
        </StyledButton>
      </CodeContainer>

      <Heading>Description</Heading>
      <p>{description}</p>
      <Heading>Further Resources</Heading>
      {links?.map((linkObject) => (
        <div key={linkObject.id}>
          <Link
            href={`https://${linkObject.value}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            {linkObject.value}
          </Link>
        </div>
      ))}
      <Heading>Tag</Heading>
      <p>{tags}</p>

      <Link href={`/${id}/edit`}>
        <span role="img" aria-label="hidden">
          ✏️{" "}
        </span>{" "}
        Edit
      </Link>

      <button onClick={onDelete}>
        <span role="img" aria-label="hidden">
          ❌{" "}
        </span>
        Delete
      </button>
    </section>
  );
}
const Title = styled.h2`
  font-size: 1.5rem;
  color: var(--primary-color);
`;

const Heading = styled.h3`
  color: var(--primary-color);
`;

const StyledButton = styled.button`
  position: absolute;
  background: transparent;
  border: none;
  right: 0.25rem;
  top: 0.25rem;
  display: flex;
  gap: 0.3rem;
  align-items: center;
`;

const CodeContainer = styled.div`
  overflow-y: scroll;
  max-height: 200px;
  position: relative;
  min-height: 3rem;
`;

export default SnippetDetails;
