import Link from "next/link";
import { useRouter } from "next/router";
import styled from "styled-components";
import useSWR from "swr";
import CopyWithOneClick from "./CopyWithOneClick";
import SyntaxHighlighter from "react-syntax-highlighter";
import { a11yLight } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import LinkLayout from "./LinkLayout";
import FavoriteButton from "./FavoriteButton";
import ConfirmModal from "./ConfirmModal";

function SnippetDetails({ onDelete, favorites, onToggleFavorite }) {
  const router = useRouter();

  const { id } = router.query;

  const { data, isLoading, error } = useSWR(`/api/snippets/${id}`);

  if (error) {
    return <div>Failed to load Details View 🥺</div>;
  }
  if (isLoading) {
    return <div>Loading Details View 🤓</div>;
  }

  const { name, code, language, description, tags, links, _id } = data;

  return (
    <StyledSection>
      <StyledCard>
        <Title tabIndex={0}>{name}</Title>
        <Heading tabIndex={0}>Code</Heading>
        <FavoriteButton
          onClick={() => onToggleFavorite(_id)}
          isFavorite={favorites.includes(_id)}
        />
        <CodeContainer>
          <StyledSyntaxHighlighter
            language={language}
            style={a11yLight}
            showLineNumbers
            tabIndex={0}
          >
            {code}
          </StyledSyntaxHighlighter>
          <CopyWithOneClick
            isDetail
            codeData={code}
            iconColor="var(--primary-color)"
          />
        </CodeContainer>
        <Heading tabIndex={0}>Description</Heading>
        <p tabIndex={0}>{description}</p>

        <Heading tabIndex={0}>Further Resources</Heading>
        {links?.map((linkObject) => (
          <div key={linkObject.id}>
            <Link
              href={linkObject.value}
              target="_blank"
              rel="noopener noreferrer"
            >
              {linkObject.value}
            </Link>
          </div>
        ))}

        <Heading tabIndex={0}>Tags</Heading>
        {tags?.map((tagObject) => (
          <StyledTags tabIndex={0} key={tagObject.value}>
            {tagObject.label}
          </StyledTags>
        ))}
      </StyledCard>
      <StyledButtonDiv>
        <LinkLayout
          url={`/${id}/edit`}
          linkName="Edit"
          linkIcon="line-md:edit"
        />
        <ConfirmModal
          message={`Are you sure you want to delete the snippet "${name}"?`}
          handleFunction={onDelete}
          snippetId={id}
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
  margin: 1rem 0rem;
  padding: 0.1rem 0.5rem;
  border-radius: 1rem;
  position: relative;
`;

const StyledButtonDiv = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
`;
const CodeContainer = styled.div`
  padding: 0.7rem 0.001rem 0.001rem 0.001rem;
  background-color: white;
  border-radius: 0.5rem;
`;

const StyledSyntaxHighlighter = styled(SyntaxHighlighter)`
  overflow-y: auto;
  max-height: 200px;
`;

const StyledTags = styled.div`
  background-color: var(--white);
  color: var(--primary-color);
  display: inline-flex;
  align-content: flex-start;
  border-radius: 1rem;
  padding: 0.5rem;
  margin-right: 0.5rem;
  margin-bottom: 1rem;
`;
export default SnippetDetails;
