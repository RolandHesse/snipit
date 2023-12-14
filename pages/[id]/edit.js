import { useRouter } from "next/router";
import useSWR from "swr";
import SnippetForm from "@/components/SnippetForm";
import LinkLayout from "@/components/LinkLayout";
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
    if (snippetData.name && snippetData.code) {
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
      } else {
        const data = await response.json();
        setError(data.error);
      }
    }
  }

  if (!isReady || isLoading || error) return <h2>Loading...</h2>;

  return (
    <StyledEditPage>
      <LinkLayout
        url={`/${id}`}
        linkName="Go Back"
        linkIcon="line-md:arrow-left"
      />
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
  color: var(--primary-color);
`;
