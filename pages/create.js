import BackLink from "@/components/LinkLayout";
import SnippetForm from "@/components/SnippetForm";
import { useState } from "react";

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
      response.status(500).json({ error: "Something went wrong" });
    }
  }

  return (
    <>
      <BackLink url={"/"} />
      <SnippetForm onSubmit={createSnippet} />
      {submitted && (
        <div>
          <span role="img" aria-label="check">
            ✅
          </span>
          Added Snippet successfully!
        </div>
      )}
      {error && (
        <div>
          <span role="img" aria-label="oh no!">
            😵‍💫
          </span>
          Something went wrong ...
        </div>
      )}
    </>
  );
}

export default FormPage;
