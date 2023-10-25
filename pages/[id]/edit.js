import { useRouter } from "next/router";
import useSWR from "swr";
import { mutate } from "swr";
import SnippetForm from "@/components/SnippetForm";
export default function EditPage() {
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;
  const {
    data: snippet,
    isLoading,
    error,
    mutate,
  } = useSWR(`/api/snippets/${id}`);

  async function editSnippet(snippet) {
    const response = await fetch(`/api/snippets/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(snippet),
    });

    if (response.ok) {
      mutate();
      router.push(`/${id}`);
    }
  }
  if (!isReady || isLoading || error) return <h2>Loading...</h2>;

  return (
    <>
      <SnippetForm
        onSubmit={editSnippet}
        formName={"edit-snippet"}
        defaultData={snippet}
      />
    </>
  );
}
