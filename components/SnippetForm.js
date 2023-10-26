import styled from "styled-components";

function SnippetForm({ onSubmit, formName, defaultData }) {
  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const snippetData = Object.fromEntries(formData);

    onSubmit(event, snippetData);
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
    </>
  );
}

export default SnippetForm;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;
