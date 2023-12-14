import Link from "next/link";
import styled from "styled-components";
import CopyWithOneClick from "./CopyWithOneClick";
import FavoriteButton from "./FavoriteButton";

export default function SnippetCard({
  snippetData,
  name,
  description,
  tags,
  onToggleFavorite,
  favorites,
}) {
  if (!snippetData) return <div>No snippets yet 😭</div>;

  console.log("snippetData: ", snippetData);
  console.log("tags: ", tags);

  return (
    <StyledCard>
      <StyledTextWraper>
        <StyledLinkComponent href={`/${snippetData._id}`}>
          <CardHeading>{name}</CardHeading>
          <CardDescription>{description}</CardDescription>
        </StyledLinkComponent>
        <StyledTagList>
          {tags.map((tag) => (
            <StyledTagListEntry key={snippetData._id}>
              {tag.value}
            </StyledTagListEntry>
          ))}
        </StyledTagList>
      </StyledTextWraper>
      <StyledButttonWrapper>
        <FavoriteButton
          onClick={() => onToggleFavorite(snippetData._id)}
          isFavorite={favorites.includes(snippetData._id)}
        />
        <CopyWithOneClick codeData={snippetData.code} />
      </StyledButttonWrapper>
    </StyledCard>
  );
}

const StyledCard = styled.section`
  display: flex;
  margin: 1.5rem 0;
  padding: 2rem 1rem 1.5rem 1.5rem;
  border-radius: 1.5rem;
  background: var(--white);
  color: var(--text-color);
  position: relative;
  box-shadow: 0px 0px 17px 0px rgba(35, 1, 169, 0.38);
  min-height: 8rem;
`;

const StyledTextWraper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  height: 100%;
  max-width: 80%;
  margin: 0;
  padding: 0;
`;

const StyledButttonWrapper = styled.div`
  min-height: 6rem;
`;

const StyledLinkComponent = styled(Link)`
  text-decoration: none;
  color: var(--text-color);
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const CardHeading = styled.h2`
  font-size: 1.5rem;
  margin: 0;
`;

const CardDescription = styled.p`
  font-size: 1rem;
  margin: 0;
`;

const StyledTagList = styled.ul`
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 0.1rem;
  list-style-type: none;
  margin: 0;
  padding: 0;
`;

const StyledTagListEntry = styled.li`
  border-radius: 1rem;
  padding: 0.2rem 0.4rem 0.2rem 0.3rem;
  text-align: center;
  box-shadow: 0px 0px 17px 0px rgba(35, 1, 169, 0.38);
`;
