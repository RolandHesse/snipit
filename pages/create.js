import BackLink from "@/components/LinkLayout";
import SnippetForm from "@/components/SnippetForm";
import { useState } from "react";
import styled from "styled-components";
import useSWR from "swr";
import toast from "react-hot-toast";
import StyledToaster from "@/components/StyledToaster";
import { useEffect } from "react";

const notify = () => toast.success("Added snippet successfully.");

function FormPage({ defaultTags }) {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const { mutate } = useSWR("/api/snippets");

  async function createSnippet(event, snippetData) {
    try {
      const response = await fetch("/api/snippets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(snippetData),
      });
      if (response.ok) {
        setSubmitted(true);
        setError(null);
        mutate();
        event.target.reset();
        event.target.elements.name.focus();
      } else {
        const data = await response.json();
        setError(data.error);
      }
    } catch (error) {
      console.error("An error occurred:", error);
      response.status(500).json({ error: "😵‍💫 Something went wrong" });
    }
  }

  useEffect(() => {
    if (submitted) {
      notify();
    }
  }, [submitted]);

  return (
    <StyledCreatePage>
      <StyledToaster />
      <BackLink url={"/"} linkName={"Go Back"} linkIcon="line-md:arrow-left" />
      <SnippetForm onSubmit={createSnippet} defaultTags={defaultTags} />
    </StyledCreatePage>
  );
}

export default FormPage;

const StyledSuccessfullyMessage = styled.div`
  color: var(--primary-color);
  display: flex;
  flex-direction: column;

  align-items: center;
  font-size: large;
  margin-bottom: 1rem;
`;

const StyledCreatePage = styled.div`
  margin: 4rem 0 4rem 0;
  color: var(--primary-color);
`;
