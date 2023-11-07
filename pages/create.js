import BackLink from "@/components/LinkLayout";
import SnippetForm from "@/components/SnippetForm";
import { useState } from "react";
import styled from "styled-components";

function FormPage() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

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

  return (
    <StyledCreatePage>
      <BackLink url={"/"} linkName={"Go Back"} linkIcon="line-md:arrow-left" />
      <SnippetForm onSubmit={createSnippet} />
      {submitted && (
        <StyledSuccessfullyMessage>
          <StyledEmoji role="img" aria-label="check">
            ✅
          </StyledEmoji>
          Added Snippet successfully!
        </StyledSuccessfullyMessage>
      )}
    </StyledCreatePage>
  );
}

export default FormPage;

const StyledSuccessfullyMessage = styled.div`
  display: flex;
  flex-direction: column;

  align-items: center;
  font-size: large;
  margin-bottom: 1rem;
`;

const StyledEmoji = styled.span`
  display: flex;
  justify-content: center;
  font-size: 5rem;
`;
const StyledCreatePage = styled.div`
  margin: 4rem 0 4rem 0;
`;
