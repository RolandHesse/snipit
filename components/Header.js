import Link from "next/link";
import styled from "styled-components";

function Header() {
  return (
    <Link href={`/`}>
      <Logo>/ˈsnɪp.ɪt/</Logo>
    </Link>
  );
}

export default Header;

const Logo = styled.h1`
  display: flex;
  position: fixed;
  color: white;
  background-color: #005f6a;
  justify-content: center;
  margin: 0 0 1rem 0;
  padding: 0.5rem;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1;
`;
