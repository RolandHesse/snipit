import Link from "next/link";
import styled from "styled-components";
import CopyWithOneClick from "./CopyWithOneClick";
import FavoriteButton from "./FavoriteButton";

export default function SnippetCard({
  snippetData,
  name,
  description,
  onToggleFavorite,
  favorites,
}) {
  if (!snippetData) return <div>No snippets yet 😭</div>;

  return (
    <StyledCard>
      <FavoriteButton
        onClick={() => onToggleFavorite(snippetData._id)}
        isFavorite={favorites.includes(snippetData._id)}
      />
      <StyledLinkComponent href={`/${snippetData._id}`}>
        <CardHeading>{name}</CardHeading>
        <CardDescription>{description}</CardDescription>
      </StyledLinkComponent>
      <CopyWithOneClick codeData={snippetData.code} iconColor="var(--white)" />
    </StyledCard>
  );
}

const StyledCard = styled.section`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  margin: 1.5rem 0;
  padding: 2rem 1.5rem;
  border-radius: 1.5rem;
  background: var(--white);
  color: var(--text-color);
  position: relative;
  box-shadow: 0px 0px 17px 0px rgba(35, 1, 169, 0.38);
`;

const CardHeading = styled.h2`
  font-size: 1.5rem;
  margin: 0;
`;

const CardDescription = styled.p`
  font-size: 1rem;
  margin: 0;
`;

const StyledLinkComponent = styled(Link)`
  text-decoration: none;
  color: var(--text-color);
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;
