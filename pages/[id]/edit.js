import { useRouter } from "next/router";
import useSWR from "swr";
import SnippetForm from "@/components/SnippetForm";
import styled from "styled-components";
import toast from "react-hot-toast";
import StyledToaster from "@/components/StyledToaster";

const notify = () => toast.success("Updated snippet successfully.");

export default function EditPage({ defaultTags }) {
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
        notify();
        router.push(`/${id}`);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      response.status(500).json({ error: "Something went wrong" });
    }
  }

  if (!isReady || isLoading || error) return <h2>Loading...</h2>;

  return (
    <StyledEditPage>
      <StyledToaster />
      <SnippetForm
        onSubmit={editSnippet}
        formName={"edit-snippet"}
        defaultData={snippet}
        defaultTags={defaultTags}
      />
    </StyledEditPage>
  );
}

const StyledEditPage = styled.div`
  margin: 4rem 0 4rem 0;
`;
