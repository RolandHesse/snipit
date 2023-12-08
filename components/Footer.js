import Link from "next/link";
import styled from "styled-components";
import { Icon } from "@iconify/react";
import { useRouter } from "next/router";

export default function Footer() {
  const router = useRouter();
  const { id } = router.query;

  return (
    <StyledFooter>
      <StyledLink href="/">
        <Icon
          icon="teenyicons:home-outline"
          //icon="teenyicons:home-solid" wenn auf den button geklickt wird
          width="3rem"
          strokeWidth="1.5"
          stroke="var(--gradient)"
        />
      </StyledLink>
      <StyledLink href="/create">
        <Icon
          icon="typcn:plus-outline"
          // icon="typcn:plus" wenn auf den button geklickt wird
          width="4rem"
          strokeWidth="1.5"
          // stroke="var(--gradient)"
          // fill="var(--gradient)"
        />
      </StyledLink>
      <StyledLink href="/favorite">
        <Icon
          icon="tabler:star"
          // icon="tabler:star-filled" wenn auf den button geklickt wird
          width="3rem"
          strokeWidth="1.5"
          stroke="var(--gradient)"
        />
      </StyledLink>
    </StyledFooter>
  );
}

const StyledFooter = styled.nav`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  color: var(--gradient);
  height: 3rem;
  background: var(--white);
  width: 100%;
  height: 4.5rem;
  text-decoration: none;
  font-size: 1.5rem;
  border-top: solid white 0.1rem;
  padding: 0.5rem;
  border-radius: 1.5rem 1.5rem 0rem 0rem;
  box-shadow: 0px 0px 15.8px 0px rgba(0, 0, 0, 0.25);
`;
const StyledLink = styled(Link)`
  fill: var(--gradient);
  text-decoration: none;
  font-size: 1.5rem;
`;
