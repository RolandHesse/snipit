import styled from "styled-components";
import Button from "./Button";
import { useState } from "react";
import { Icon } from "@iconify/react";
import SmallButton from "./SmallButton";
import { nanoid } from "nanoid";
import CreatableSelect from "react-select/creatable";
// import { useEffect } from "react";

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

  // const [tagOptions, setTagOptions] = useState(defaultTags);

  console.log("tag chaos", defaultData.tags);

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
    setInputName("");
    setInputCode("");
    setLinks([{ id: "0", value: "" }]);
    setSelectedTags([]);
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

  function handleTagChange(defaultTags) {
    setSelectedTags(defaultTags);
  }

  function handleCreateTag(inputValue) {
    const newTags = { label: inputValue, value: inputValue.toLowerCase() };
    setSelectedTags([...selectedTags, newTags]);
  }

  // const handleTagChange = (newValue, actionMeta) => {
  //   // Update selected tags
  //   setSelectedTags(newValue);

  //   // Check if a new tag is created
  //   if (actionMeta.action === "create-option") {
  //     // Update tag options with the new tag
  //     setTagOptions([
  //       ...tagOptions,
  //       { value: newValue.label, label: newValue.label },
  //     ]);
  //   }
  // };

  // useEffect(() => {
  //   if (defaultData && defaultData.tags && Array.isArray(defaultData.tags)) {
  //     const newTags = defaultData.tags.filter(
  //       (tag) => !tagOptions?.some((option) => option.value === tag)
  //     );
  //     setTagOptions([
  //       ...tagOptions,
  //       ...newTags.map((tag) => ({ value: tag, label: tag })),
  //     ]);
  //   }
  // }, [defaultData, tagOptions]);

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
        // error={isFormValidated ? inputName : undefined}
        error={isFormValidated && inputName === ""}
      />
      <label htmlFor="code">Code*</label>
      <StyledCode
        value={inputCode}
        onChange={handleInputCode}
        type="text"
        id="code"
        name="code"
        rows="5"
        placeholder="Your code"
        // error={isFormValidated ? inputName : undefined}
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
                <StyledFormElementOfCrime
                  as="input"
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
        <Button type="reset" buttonName="Reset" />
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
