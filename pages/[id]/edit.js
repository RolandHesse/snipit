import { useRouter } from "next/router";
import useSWR from "swr";
import SnippetForm from "@/components/SnippetForm";

export default function EditPage() {
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;
  const { data: snippet, isLoading, error } = useSWR(`/api/snippets/${id}`);

  async function editSnippet(event, snippetData) {
    try {
      const { id } = router.query;
      const response = await fetch(`/api/snippets/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(snippetData),
      });

      if (response.ok) {
        router.push(`/${id}`);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      response.status(500).json({ error: "Something went wrong" });
    }
  }

  if (!isReady || isLoading || error) return <h2>Loading...</h2>;

  return (
    <SnippetForm
      onSubmit={editSnippet}
      formName={"edit-snippet"}
      defaultData={snippet}
    />
  );
}
