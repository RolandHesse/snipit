import BackLink from "@/components/BackLink";
import SnippetDetails from "@/components/SnippetDetails";
import { useRouter } from "next/router";
import { mutate } from "swr";

function SnippetDetailsPage() {
  const router = useRouter();

  const { id } = router.query;

  async function handleDelete() {
    try {
      await fetch(`/api/snippets/${id}`, { method: "DELETE" });
      mutate(`/api/snippets`);
      router.push("/");
    } catch (error) {
      console.error("An error occurred:", error);
      response.status(500).json({ error: "Something went wrong" });
    }
  }

  return (
    <>
      <BackLink url={"/"} />
      <SnippetDetails onDelete={handleDelete} />
    </>
  );
}

export default SnippetDetailsPage;
