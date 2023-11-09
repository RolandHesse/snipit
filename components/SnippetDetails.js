import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import useSWR from "swr";
import SyntaxHighlighter from "react-syntax-highlighter";
import { a11yLight } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import Button from "./Button";
import LinkLayout from "./LinkLayout";

function SnippetDetails({ onDelete }) {
  const router = useRouter();

  const { id } = router.query;

  const { data, isLoading, error } = useSWR(`/api/snippets/${id}`);

  if (error) {
    return <div>Failed to load Details View 🥺</div>;
  }
  if (isLoading) {
    return <div>Loading Details View 🤓</div>;
  }

  const { name, code, description, links, tags } = data;

  return (
    <StyledSection>
      <StyledCard>
        <Title>{name}</Title>
        <Heading>Code</Heading>
        <CodeContainer>
          <SyntaxHighlighter
            language="javascript"
            style={a11yLight}
            wrapLongLines
            showLineNumbers
          >
            {code}
          </SyntaxHighlighter>
        </CodeContainer>
        <Heading>Description</Heading>
        <p>{description}</p>
        <Heading>Link</Heading>
        <Link href={links}>Further information</Link>
        <Heading>Tag</Heading>
        <p>{tags}</p>
      </StyledCard>
      <StyledButtonDiv>
        <LinkLayout
          url={`/${id}/edit`}
          linkName="Edit"
          linkIcon="line-md:edit"
        />
        <Button
          onDelete={onDelete}
          buttonName="Delete"
          buttonIcon="line-md:remove"
        />
      </StyledButtonDiv>
    </StyledSection>
  );
}
const Title = styled.h2`
  font-size: 1.5rem;
  color: var(--primary-color);
`;

const Heading = styled.h3`
  color: var(--primary-color);
`;

const StyledSection = styled.section`
  margin: 0.5rem 0.1rem 4rem 0.1rem;
`;

const StyledCard = styled.div`
  background-color: var(--light-color);
  margin: 1rem 0.5rem;
  padding: 0.1rem 0.5rem;
  border-radius: 1rem;
`;

const StyledButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;
const CodeContainer = styled.div`
  overflow-y: scroll;
  max-height: 200px;
`;

export default SnippetDetails;
