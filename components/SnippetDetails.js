import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";

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
      <h2>{name}</h2>
      <h3>Code</h3>
      <code>{code}</code>
      <h3>Description</h3>
      <p>{description}</p>
      <h3>Link</h3>
      <Link href={link}>Further information</Link>
      <h3>Tag</h3>
      <p>{tags}</p>
    </section>
  );
}

export default SnippetDetails;
