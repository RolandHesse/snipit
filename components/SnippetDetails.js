import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";

function SnippetDetails() {
  const router = useRouter();

  const { id } = router.query;

  const { data, isLoading, error } = useSWR(`/api/snippets/${id}`);

  if (error) return <div>failed to load Details View 🥺</div>;
  if (isLoading) {
    return <h1>Loading Details View 🤓</h1>;
  }
  if (!data) {
    return <div>cant find the data yet</div>;
  }
  const { name, code, description, link, tags } = data;

  return (
    <section>
      <h1>{name}</h1>
      <h2>Code</h2>
      <div>{code}</div>
      <h2>Description</h2>
      <p>{description}</p>
      <h2>Link</h2>
      <Link href={link}>Further information</Link>
      <h2>Tag</h2>
      <p>{tags}</p>
    </section>
  );
}

export default SnippetDetails;
