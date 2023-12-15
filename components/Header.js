import Link from "next/link";
import styled from "styled-components";

function Header() {
  return (
    <Link href={`/`}>
      <StyledHeader aria-label="Snip it Logo">
        <StyledH1 aria-hidden="true">/ˈsnıp.ıt/</StyledH1>
      </StyledHeader>
    </Link>
  );
}

export default Header;

const StyledHeader = styled.div`
  position: fixed;
  width: 100%;
  text-align: center;
  z-index: 1;
  top: 0;
  margin: 0;
  background: var(--gradient);
`;

const StyledH1 = styled.h1`
  color: var(--white);
`;
