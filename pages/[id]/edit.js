import { useRouter } from "next/router";
import useSWR from "swr";
import SnippetForm from "@/components/SnippetForm";
import LinkLayout from "@/components/LinkLayout";
import styled from "styled-components";
import { useState } from "react";

export default function EditPage({ defaultTags }) {
  const router = useRouter();
  const { isReady } = router;
  const { id } = router.query;
  const { data: snippet, isLoading, error } = useSWR(`/api/snippets/${id}`);
  const [readyToUpdate, setReadyToUpdate] = useState(false);

  console.log("Ready to Update: ", readyToUpdate);

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
    <StyledEditPage>
      <LinkLayout
        url={`/${id}`}
        linkName={"Go Back"}
        linkIcon="line-md:arrow-left"
      />
      <button
        onClick={() => {
          setReadyToUpdate(!readyToUpdate);
        }}
      >
        Ready to submit? Required fields filled-in?
      </button>
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
