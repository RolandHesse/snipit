import { useRouter } from "next/router";
import useSWR from "swr";
import SnippetForm from "@/components/SnippetForm";
import { useState } from "react";

export default function EditPage() {
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;
  const { data: snippet, isLoading, error } = useSWR(`/api/snippets/${id}`);
  const [edit, setEdit] = useState(false);

  async function editSnippet(event, snippetData) {
    const response = await fetch(`/api/snippets/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(snippetData),
    });

    if (response.ok) {
      setEdit(true);
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
        editState={edit}
      />
    </>
  );
}
