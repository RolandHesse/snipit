import Link from "next/link";
import { useRouter } from "next/router";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

function SnippetDetails() {
  console.log("test");
  const router = useRouter();
  console.log("Router :", router);
  const { id } = router.query;
  console.log("ID: ", { id });

  const { data, isLoading } = useSWR(`/pages/api/snippets/${id}`, fetcher);
  //   console.log("Mutate:", mutate);

  console.log("useSWR: ", useSWR());
  //   console.log("Error:", error);
  console.log(data);
  //   if (error) return <div>failed to load Details View 🥺</div>;
  if (isLoading) {
    return <h1>Loading Details View 🤓</h1>;
  }
  if (!data) {
    return <div>cant find the data yet</div>;
  }
  const { name, code, description, link, tags } = data;

  return (
    <>
      <h1>test{name}</h1>
      <p>{code}</p>
      <p>{description}</p>
      <Link>{link}</Link>
      <p>{tags}</p>
    </>
  );
}

export default SnippetDetails;
