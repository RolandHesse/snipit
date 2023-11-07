import styled from "styled-components";
import { useState } from "react";

function SnippetForm({ onSubmit, formName, defaultData }) {
  const [links, setLinks] = useState([""]);

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const snippetData = Object.fromEntries(formData);

    const snippetDataPlusLinks = { ...snippetData, links };

    onSubmit(event, snippetDataPlusLinks);
  }

  function addLink() {
    setLinks([...links, ""]);
  }

  function handleLinkChange(index, value) {
    const updatedLinks = [...links];
    updatedLinks[index] = value;
    setLinks(updatedLinks);
  }

  function handleDelete(index) {
    const rectifiedLinks = [...links];
    rectifiedLinks.splice(index, 1);
    setLinks(rectifiedLinks);
  }

  console.log("links: ", links);

  return (
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

      {links.length <= 1 ? (
        <div>
          <label htmlFor="link">Link:</label>
          <input
            type="text"
            id="link"
            name="link"
            placeholder="www."
            defaultValue={defaultData?.link}
            value={links[0]}
            onChange={(event) => handleLinkChange(0, event.target.value)}
          />
          <button type="button" onClick={addLink}>
            ⨁ Add another link
          </button>
        </div>
      ) : (
        <div>
          {links.map((link, index) => (
            <div key={index}>
              <label htmlFor={index}>Link:</label>
              <input
                type="text"
                id={index}
                name="link"
                placeholder="www."
                defaultValue={defaultData?.link}
                value={link}
                onChange={(event) =>
                  handleLinkChange(index, event.target.value)
                }
              />
              <button onClick={() => handleDelete(index)}>🚮</button>
            </div>
          ))}
          <button type="button" onClick={addLink}>
            ⨁ Add another link
          </button>
        </div>
      )}
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
  );
}

export default SnippetForm;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
`;
