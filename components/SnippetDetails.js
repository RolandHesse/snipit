import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import useSWR from "swr";
import CopyWithOneClick from "./CopyWithOneClick";
import SyntaxHighlighter from "react-syntax-highlighter";
import { a11yLight } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import Button from "./Button";
import LinkLayout from "./LinkLayout";
import ConfirmModal from "./ConfirmModal";

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

  const { name, code, description, tags, links } = data;

  return (
    <StyledSection>
      <StyledCard>
        <Title>{name}</Title>
        <Heading>Code</Heading>
        <CodeContainer>
          <StyledSyntaxHighlighter
            language="javascript"
            style={a11yLight}
            wrapLongLines
            showLineNumbers
          >
            {code}
          </StyledSyntaxHighlighter>
          <CopyWithOneClick
            isDetail
            codeData={code}
            iconColor="var(--primary-color)"
          />
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
      </StyledCard>
      <StyledButtonDiv>
        <LinkLayout
          url={`/${id}/edit`}
          linkName="Edit"
          linkIcon="line-md:edit"
        />
        <ConfirmModal
          message={`Are you sure you want to delete the snippet ${name}?`}
          handleFunction={onDelete}
          snippetId={id}
        />
        {/* <Button
          onClick={onDelete}
          buttonName="Delete"
          buttonIcon="line-md:remove"
        /> */}
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
  margin: 1rem 0rem;
  padding: 0.1rem 0.5rem;
  border-radius: 1rem;
`;

const StyledButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;
const CodeContainer = styled.div`
  position: relative;
`;

const StyledSyntaxHighlighter = styled(SyntaxHighlighter)`
  overflow-y: scroll;
  max-height: 200px;
`;

export default SnippetDetails;
