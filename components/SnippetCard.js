import Link from "next/link";
import styled from "styled-components";

export default function SnippetCard({ snippetData, name, description }) {
  if (!snippetData) return <div>No snippets yet 😭</div>;
  async function handleClick() {
    await navigator.clipboard.writeText(snippetData.code);
    window.alert("Code succesfully copied!");
  }

  return (
    <StyledCard>
      <StyledLinkComponent href={`/${snippetData._id}`}>
        <CardHeading>{name}</CardHeading>
        <CardDescription>{description}</CardDescription>
      </StyledLinkComponent>

      <StyledButton type="button" onClick={handleClick}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
          <path d="M6.9998 6V3C6.9998 2.44772 7.44752 2 7.9998 2H19.9998C20.5521 2 20.9998 2.44772 20.9998 3V17C20.9998 17.5523 20.5521 18 19.9998 18H16.9998V20.9991C16.9998 21.5519 16.5499 22 15.993 22H4.00666C3.45059 22 3 21.5554 3 20.9991L3.0026 7.00087C3.0027 6.44811 3.45264 6 4.00942 6H6.9998ZM5.00242 8L5.00019 20H14.9998V8H5.00242ZM8.9998 6H16.9998V16H18.9998V4H8.9998V6Z"></path>
        </svg>
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
