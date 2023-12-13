import Link from "next/link";
import styled from "styled-components";
import { Icon } from "@iconify/react";
import useLocalStorageState from "use-local-storage-state";
export default function Footer() {
  const [url, setUrl] = useLocalStorageState("url", { defaultValue: "home" });
  return (
    <StyledFooter>
      <StyledLink
        href="/"
        onClick={() => {
          setUrl("home");
        }}
      >
        <Icon
          icon={url === "home" ? "typcn:home" : "typcn:home-outline"}
          // icon={
          //   url === "home" ? "teenyicons:home-solid" : "teenyicons:home-outline"
          // }
          width="3.5rem"
        />
      </StyledLink>
      <StyledLink
        href="/create"
        onClick={() => {
          setUrl("create");
        }}
      >
        <Icon
          // icon={
          //   url === "create"
          //     ? "teenyicons:plus-circle-solid"
          //     : "teenyicons:plus-circle-outline"
          // }
          icon={url === "create" ? "typcn:plus" : "typcn:plus-outline"}
          width="3.5rem"
        />
      </StyledLink>
      <StyledLink
        href="/favorite"
        s
        onClick={() => {
          setUrl("favorite");
        }}
      >
        <Icon
          icon={
            url === "favorite"
              ? "typcn:star-full-outline"
              : "typcn:star-outline"
          }
          // icon={
          //   url === "favorite"
          //     ? "teenyicons:star-solid"
          //     : "teenyicons:star-outline"
          // }
          // icon={url === "favorite" ? "tabler:star-filled" : "tabler:star"}
          width="3.5rem"
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