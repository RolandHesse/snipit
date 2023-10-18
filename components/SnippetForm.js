import styled from "styled-components";
import useSWR from "swr";

function SnippetForm() {
  const { mutate } = useSWR(`api/snippets`);

  async function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const snippetData = Object.fromEntries(formData);

    const response = await fetch("/api/snippets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(snippetData),
    });

    if (response.ok) {
      mutate();
    }
  }

  return (
    <>
      <StyledForm onSubmit={handleSubmit}>
        <h1>Add new Snippet</h1>
        {/* <fieldset aria-describedby="name">
          <legend>Enter your Code name and Snippet here</legend> */}
        <label for="name">Name:</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Code name"
        ></input>
        <label for="code">Code:</label>
        <textarea
          type="text"
          id="code"
          name="code"
          rows="5"
          placeholder="your code"
        ></textarea>
        {/* </fieldset> */}
        <label for="description">Description:</label>
        <textarea
          type="text"
          id="description"
          name="description"
          rows="5"
          placeholder="description of the code"
        ></textarea>
        <label for="link">Link:</label>
        <input
          type="text"
          id="link"
          name="link"
          placeholder="type your link here"
        ></input>

        <label for="tag">Tag:</label>
        <select id="tag" name="tag" placeholder="tag">
          <option value=""></option>
          <option value="html">html</option>
          <option value="javaScript">javaScript</option>
          <option value="next">next</option>
        </select>

        <button type="submit">Submit</button>
      </StyledForm>
    </>
  );
}

export default SnippetForm;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;
