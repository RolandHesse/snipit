import Link from "next/link";
import { useRouter } from "next/router";
// import useSWR from "swr";
import styled from "styled-components";
import useSWR, { mutate } from "swr";

function SnippetDetails({ onDelete }) {
  const router = useRouter();
  // const { isReady } = router;
  const { id } = router.query;

  const { data, isLoading, error } = useSWR(`/api/snippets/${id}`);

  async function handleEdit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const snippetData = Object.fromEntries(formData);

    const response = await fetch(`/api/snippets/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(snippetData),
    });

    console.log(response);

    if (response.ok) {
      mutate();
    }
  }

  if (error) return <div>Failed to load Details View 🥺</div>;
  if (isLoading) {
    return <div>Loading Details View 🤓</div>;
  }

  // if (!isReady || isLoading || error) return <h2>Loading...</h2>;
  // async function handleDelete() {
  //   await fetch(`/api/snippets/${id}`, { method: "DELETE" });
  //   // mutate(`/api/snippets`);
  //   router.push("/");
  // }
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
      <button onClick={handleEdit}> Edit</button>
      <button onClick={onDelete}>❌ Delete</button>
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
