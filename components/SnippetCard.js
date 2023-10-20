import styled from "styled-components";

export default function SnippetCard({ snippetData, name, description }) {
  if (!snippetData) return <div>No snippets yet 😭</div>;
  return (
    <StyledCard>
      <CardHeading>{name}</CardHeading>
      <CardDescription>{description}</CardDescription>
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
  background-color: var(--teal);
  color: var(--white);
`;
const CardHeading = styled.h2`
  font-size: 1.5rem;
  margin: 0;
`;
const CardDescription = styled.p`
  font-size: 1rem;
  margin: 0;
`;
