import BackLink from "@/components/BackLink";
import SnippetForm from "@/components/SnippetForm";
import { useState } from "react";

function FormPage() {
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  async function createSnippet(event, krautsalat) {
    const response = await fetch("/api/snippets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(krautsalat),
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
