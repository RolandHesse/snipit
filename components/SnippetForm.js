import styled from "styled-components";
import { useState } from "react";
import SmallButton from "./SmallButton";
import { nanoid } from "nanoid";

function SnippetForm({ onSubmit, formName, defaultData }) {
  const [links, setLinks] = useState(
    defaultData ? defaultData.links : [{ id: "0", value: "" }]
  );

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const snippetData = Object.fromEntries(formData);

    const snippetDataPlusLinks = { ...snippetData, links };

    onSubmit(event, snippetDataPlusLinks);
    setLinks([{ id: "0", value: "" }]);
  }

  function handleAddLink() {
    setLinks([...links, { id: nanoid(), value: "" }]);
  }

  function handleLinkChange(id, value) {
    setLinks(links.map((link) => (link.id === id ? { ...link, value } : link)));
  }

  function handleDelete(id) {
    setLinks(links.filter((link) => link.id !== id));
  }

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
        <>
          <StyledList>
            {links.map((linkObject) => (
              <li key={linkObject.id}>
                <label htmlFor={linkObject.id}>Link: </label>
                <input
                  type="text"
                  id={linkObject.id}
                  placeholder="www."
                  defaultValue={linkObject.value}
                  onChange={(event) =>
                    handleLinkChange(linkObject.id, event.target.value)
                  }
                />
              </li>
            ))}
          </StyledList>
          <SmallButton
            type={"button"}
            onClick={handleAddLink}
            buttonIcon={"simple-line-icons:plus"}
            buttonName={"Add another link"}
            ariaLabel={"hidden"}
          />
        </>
      ) : (
        <>
          <StyledList>
            {links.map((linkObject) => (
              <li key={linkObject.id}>
                <label htmlFor={linkObject.id}>Link: </label>
                <input
                  required
                  autoFocus
                  type="text"
                  id={linkObject.id}
                  placeholder="www."
                  defaultValue={linkObject.value}
                  onChange={(event) =>
                    handleLinkChange(linkObject.id, event.target.value)
                  }
                />
                <SmallButton
                  type={"button"}
                  onClick={() => handleDelete(linkObject.id)}
                  buttonIcon={"mynaui:trash"}
                  ariaLabel={"delete"}
                />
              </li>
            ))}
          </StyledList>
          <SmallButton
            type={"button"}
            onClick={handleAddLink}
            buttonIcon={"simple-line-icons:plus"}
            buttonName={"Add another link"}
            ariaLabel={"hidden"}
          />
        </>
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

const StyledList = styled.ul`
  list-style: none;
`;
