import { useState } from "react";
import styled from "styled-components";
import useSWR from "swr";

function SnippetForm({ onSubmit, formName, defaultData }) {
  const { mutate } = useSWR(`api/snippets`);

  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const snippetData = Object.fromEntries(formData);
    onSubmit(snippetData);
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
      mutate();
    } else {
      const data = await response.json();
      setError(data.error);
    }
  }

  return (
    <>
      <StyledForm aria-labelledby={formName} onSubmit={handleSubmit}>
        <h2> {defaultData ? "Update Snippet" : "Add new Snippet"}</h2>
        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Code name"
          defaultValue={defaultData?.name}
        />
        <label htmlFor="code">Code:</label>
        <textarea
          type="text"
          id="code"
          name="code"
          rows="5"
          placeholder="your code"
          defaultValue={defaultData?.code}
        ></textarea>

        <label htmlFor="description">Description:</label>
        <textarea
          type="text"
          id="description"
          name="description"
          rows="5"
          placeholder="description of the code"
          defaultValue={defaultData?.description}
        ></textarea>
        <label htmlFor="link">Link:</label>
        <input
          type="text"
          id="link"
          name="link"
          placeholder="type your link here"
          defaultValue={defaultData?.link}
        />
        <label htmlFor="tag">Tag:</label>
        <select
          id="tag"
          name="tag"
          placeholder="tag"
          defaultValue={defaultData?.tag}
        >
          <option value=""></option>
          <option value="html">html</option>
          <option value="javaScript">javaScript</option>
          <option value="next">next</option>
        </select>

        <button type="submit">
          {defaultData ? "Update snippet" : "Add snippet"}
        </button>
        <button type="reset">Reset</button>
      </StyledForm>
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

export default SnippetForm;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;
