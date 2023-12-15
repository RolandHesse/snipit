import Link from "next/link";
import styled from "styled-components";

function Header() {
  return (
    <StyledNormalHeader>
      <h1>/ˈsnıp.ıt/</h1>
      <StyledSecondDiv></StyledSecondDiv>
    </StyledNormalHeader>

    // <Link href={`/`}>
    //   <Logo aria-label="Snip it Logo">
    //     <span aria-hidden="true">/ˈsnıp.ıt/</span>
    //   </Logo>
    // </Link>
  );
}

export default Header;

const StyledNormalHeader = styled.div`
  /* display: flex; */
  position: fixed;
  width: 100%;
  text-align: center;
  z-index: 1;
  top: 0;
  margin: 0;
  background: var(--gradient);
  /* border-radius: 10rem; */
`;

// const StyledHeader = styled.h1`
//   z-index: 2;
//   background-color: var(--gradient);
// `;

const StyledSecondDiv = styled.div`
  background-color: white;
  border-radius: 2rem 2rem 0 0;
  height: 2rem;
  /* z-index: -1; */
`;

// const Logo = styled.h1`
//   display: flex;
//   position: fixed;
//   color: var(--white);
//   /* background-color: var(--gradient); */
//   justify-content: center;
//   margin: 0 0 1rem 0;
//   padding: 0.5rem 0.7rem 0.7rem 0.7rem;
//   top: 0;
//   left: 0;
//   right: 0;
//   z-index: 1;
// `;
