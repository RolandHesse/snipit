import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";
import styled from "styled-components";

function SnippetDetails() {
  const router = useRouter();

  const { id } = router.query;

  const { data, isLoading, error } = useSWR(`/api/snippets/${id}`);

  if (error) return <div>Failed to load Details View 🥺</div>;
  if (isLoading) {
    return <div>Loading Details View 🤓</div>;
  }

  const { name, code, description, link, tags } = data;

  return (
    <section>
      <Title>{name}</Title>
      <Heading>Code</Heading>
      <code>{code}</code>
      <Heading>Description</Heading>
      <p>{description}</p>
      <Heading>Link</Heading>
      <Link href={link}>Further information</Link>
      <Heading>Tag</Heading>
      <p>{tags}</p>
    </section>
  );
}

const Title = styled.h2`
  font-size: 1.5rem;
  color: var(--primary-color);
`;

const Heading = styled.h3`
  color: var(--primary-color);
`;

export default SnippetDetails;
