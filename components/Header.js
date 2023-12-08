import Link from "next/link";
import styled from "styled-components";

function Header() {
  return (
    <Link href={`/`}>
      <Logo>/ˈsnıp.ıt/</Logo>
    </Link>
  );
}

export default Header;

const Logo = styled.h1`
  display: flex;
  position: fixed;
  color: var(--white);
  background-color: var(--gradient);
  justify-content: center;
  margin: 0 0 1rem 0;
  padding: 0.5rem 0.7rem 0.7rem 0.7rem;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
`;
