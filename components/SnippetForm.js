import styled from "styled-components";
import Button from "./Button";
import { useState } from "react";
import { Icon } from "@iconify/react";
import SmallButton from "./SmallButton";
import { nanoid } from "nanoid";
import CreatableSelect from "react-select/creatable";
import SyntaxHighlighter from "react-syntax-highlighter";
import { a11yLight } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { useRouter } from "next/router";

function SnippetForm({ onSubmit, formName, defaultData, defaultTags }) {
  const [inputName, setInputName] = useState(defaultData?.name || "");
  const [inputCode, setInputCode] = useState(defaultData?.code || "");
  const [warningMessage, setWarningMessage] = useState("");
  const [isFormValidated, setIsFormValidated] = useState(false);
  const [links, setLinks] = useState(
    defaultData ? defaultData.links : [{ id: "0", value: "" }]
  );
  const [selectedTags, setSelectedTags] = useState(
    defaultData ? defaultData.tags : []
  );
  const router = useRouter();

  function handleInputName(event) {
    const value = event.target.value;
    setInputName(value);
  }

  function handleInputCode(event) {
    const value = event.target.value;
    setInputCode(value);
  }

  function handleSubmit(event) {
    event.preventDefault();

    if (inputName === "" || inputCode === "") {
      setWarningMessage(
        <span>
          <Icon icon="tabler:alert-circle-filled" height="2rem" /> Please fill
          in the required field
        </span>
      );
      setIsFormValidated(true);
    } else {
      setWarningMessage("");
    }
    const formData = new FormData(event.target);
    const snippetData = Object.fromEntries(formData);

    const snippetDataPlusLinksAndTags = {
      ...snippetData,
      links,
      tags: selectedTags,
    };

    onSubmit(event, snippetDataPlusLinksAndTags);
    setLinks([{ id: "0", value: "" }]);
    setSelectedTags([]);
  }

  function handleAddLink() {
    setLinks([...links, { id: nanoid(), value: "" }]);
  }

  function handleLinkChange(id, value) {
    const rawLinks = links.map((link) =>
      link.id === id ? { ...link, value } : link
    );
    setLinks(
      rawLinks.map((rawLinkObject) =>
        rawLinkObject.value.startsWith("https://")
          ? rawLinkObject
          : { ...rawLinkObject, value: `https://${rawLinkObject.value}` }
      )
    );
  }

  function handleDelete(id) {
    setLinks(links.filter((link) => link.id !== id));
  }

  function handleTagChange(defaultTags) {
    setSelectedTags(defaultTags);
  }

  function handleCreateTag(inputValue) {
    const newTags = { label: inputValue, value: inputValue.toLowerCase() };
    setSelectedTags([...selectedTags, newTags]);
  }

  return (
    <StyledForm aria-labelledby={formName} onSubmit={handleSubmit}>
      <h2> {defaultData ? "Update Snippet" : "Add new Snippet"}</h2>
      <Warning>{warningMessage}</Warning>
      <p>
        <Icon icon="tabler:alert-circle" height="2rem" />
        &nbsp;Fields marked with an * are required
      </p>
      <label htmlFor="name">Name*</label>
      <StyledInputName
        value={inputName}
        onChange={handleInputName}
        type="text"
        id="name"
        name="name"
        placeholder="Code name"
        error={isFormValidated && inputName === ""}
      />
      <label htmlFor="language"></label>
      <StyledLanguagesContainer>
        <StyledLanguages
          id="language"
          name="language"
          defaultValue={defaultData?.language}
        >
          <option value="text">Text</option>
          <option value="c">c</option>
          <option value="css">CSS</option>
          <option value="java">java</option>
          <option value="javascript">JavaScript</option>
          <option value="json">json</option>
          <option value="markdown">markdown</option>
          <option value="python">python</option>
          <option value="shell">shell</option>
          <option value="typescript">TypeScript</option>
        </StyledLanguages>

        <label htmlFor="code">Code*</label>
      </StyledLanguagesContainer>
      <StyledCode
        value={inputCode}
        onChange={handleInputCode}
        type="text"
        id="code"
        name="code"
        rows="5"
        placeholder="Your code"
        error={isFormValidated && inputCode === ""}
      ></StyledCode>
      <label htmlFor="description">Description</label>
      <StyledFormElementOfCrime
        type="text"
        id="description"
        name="description"
        rows="5"
        placeholder="Description of the code"
        defaultValue={defaultData?.description}
      ></StyledFormElementOfCrime>
      {links.length <= 1 ? (
        <>
          <StyledList>
            {links.map((linkObject) => (
              <li key={linkObject.id}>
                <label htmlFor={linkObject.id}>Link: </label>
                <StyledFormElementOfCrime
                  as="input"
                  type="text"
                  id={linkObject.id}
                  placeholder="https://example.com/"
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
                <StyledFormElementOfCrime
                  as="input"
                  required
                  autoFocus
                  type="text"
                  id={linkObject.id}
                  placeholder="https://example.com/"
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
      <label htmlFor="tag">Tags:</label>
      <CreatableSelect
        isMulti
        options={defaultTags}
        onChange={handleTagChange}
        onCreateOption={handleCreateTag}
        value={selectedTags}
      />

      <StyledButtonContainer>
        <Button type="submit" buttonName={defaultData ? "Update" : "Submit"} />
        <Button
          type="button"
          buttonName="Cancel"
          onClick={
            defaultData
              ? () => router.push(`/${defaultData._id}`)
              : () => router.push("/")
          }
        />
      </StyledButtonContainer>
    </StyledForm>
  );
}

export default SnippetForm;

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  font-weight: 500;
`;

const StyledInputName = styled.input`
  border: 2px solid ${(props) => (props.error ? "red" : "initial")};
  height: 2rem;
  border-radius: 0.3rem;
  background-color: var(--light-color);
`;

const StyledLanguagesContainer = styled.div`
  display: flex;
  flex-direction: row-reverse;
  justify-content: flex-end;
  gap: 1.5rem;
  margin: 0.5rem 0 0.2rem;
`;
const StyledLanguages = styled.select`
  display: flex;
  align-content: flex-start;
  border-radius: 0.3rem;
  background-color: var(--light-color);
`;
const StyledCode = styled.textarea`
  border: 2px solid ${(props) => (props.error ? "red" : "initial")};
  height: 10rem;
  border-radius: 0.3rem;
  background-color: var(--primary-color);

  color: var(--white);
`;

const StyledFormElementOfCrime = styled.textarea`
  height: 2rem;
  border-radius: 0.3rem;
  background-color: var(--light-color);
  border: none;
`;

const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 0.5rem;
`;

const Warning = styled.p`
  color: red;
`;

const StyledList = styled.ul`
  list-style: none;
`;

const StyledSyntaxHighlighter = styled(SyntaxHighlighter)`
  overflow-y: auto;
  max-height: 200px;
`;
