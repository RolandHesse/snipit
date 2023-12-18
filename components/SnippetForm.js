import styled from "styled-components";
import Button from "./Button";
import { useState } from "react";
import { Icon } from "@iconify/react";
import SmallButton from "./SmallButton";
import { nanoid } from "nanoid";
import CreatableSelect from "react-select/creatable";
import { useRouter } from "next/router";
import toast from "react-hot-toast";

const notify = () =>
  toast.error("Please fill in the required fields.", {
    ariaProps: { role: "status", "aria-live": "assertive" },
  });

function SnippetForm({ onSubmit, formName, defaultData, defaultTags }) {
  const [inputName, setInputName] = useState(defaultData?.name || "");
  const [inputCode, setInputCode] = useState(defaultData?.code || "");
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
      notify();
      setIsFormValidated(true);
    }

    const formData = new FormData(event.target);
    const snippetData = Object.fromEntries(formData);

    const snippetDataPlusLinksAndTags = {
      ...snippetData,
      links,
      tags: selectedTags,
    };

    onSubmit(event, snippetDataPlusLinksAndTags);
    if (!defaultData) {
      setLinks([{ id: "0", value: "" }]);
      setSelectedTags([]);
    }
  }

  function handleAddLink() {
    setLinks([...links, { id: nanoid(), value: "" }]);
  }

  function handleLinkChange(id, value) {
    if (value.trim() === "") {
      return;
    }

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
      <h2 tabIndex={0}>
        {" "}
        {defaultData ? "Update Snippet" : "Add new Snippet"}
      </h2>
      <StyledRequiredMessage tabIndex={0}>
        <Icon icon="tabler:alert-circle" height="2rem" />
        &nbsp;Fields marked with an * are required
      </StyledRequiredMessage>
      <label htmlFor="name">Name*</label>
      <StyledInputName
        tabIndex={0}
        value={inputName}
        onChange={handleInputName}
        type="text"
        id="name"
        name="name"
        error={isFormValidated && inputName === ""}
      />
      <label htmlFor="language"></label>
      <StyledLanguagesContainer aria-label="Choose code language" tabIndex={0}>
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
        tabIndex={0}
        value={inputCode}
        onChange={handleInputCode}
        type="text"
        id="code"
        name="code"
        rows="5"
        error={isFormValidated && inputCode === ""}
      ></StyledCode>
      <label htmlFor="description">Description</label>
      <StyledFormElementOfCrime
        tabIndex={0}
        type="text"
        id="description"
        name="description"
        rows="5"
        defaultValue={defaultData?.description}
      ></StyledFormElementOfCrime>
      {links.length <= 1 ? (
        <>
          <StyledList>
            {links.map((linkObject) => (
              <StyledListItem key={linkObject.id}>
                <label htmlFor={linkObject.id}>Link: </label>
                <StyledFormElementOfCrime
                  tabIndex={0}
                  as="input"
                  type="text"
                  id={linkObject.id}
                  defaultValue={linkObject.value}
                  onChange={(event) =>
                    handleLinkChange(linkObject.id, event.target.value)
                  }
                />
              </StyledListItem>
            ))}
          </StyledList>
          <SmallButton
            type={"button"}
            onClick={handleAddLink}
            buttonIcon={"simple-line-icons:plus"}
            buttonName={"Add another link"}
          />
        </>
      ) : (
        <>
          <StyledList>
            {links.map((linkObject) => (
              <StyledListItem key={linkObject.id}>
                <label htmlFor={linkObject.id}>Link: </label>
                <StyledFormElementOfCrime
                  as="input"
                  required
                  autoFocus
                  type="text"
                  id={linkObject.id}
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
              </StyledListItem>
            ))}
          </StyledList>
          <SmallButton
            type={"button"}
            onClick={handleAddLink}
            buttonIcon={"simple-line-icons:plus"}
            buttonName={"Add another link"}
            ariaLabel={"hidden"}
            className="smallButtonMargin"
          />
        </>
      )}
      <label htmlFor="tag" tabIndex={0}>
        Tags:
      </label>
      <CreatableSelect
        isMulti
        options={defaultTags}
        onChange={handleTagChange}
        onCreateOption={handleCreateTag}
        value={selectedTags}
        theme={(theme) => ({
          ...theme,
          borderRadius: 10,
          colors: {
            ...theme.colors,
            text: "orangered",
            primary25: "var(--light-color)",
            primary: "var(--main-blue)",
            neutral0: "var(--light-color)",
            neutral10: "var(--white)",
          },
        })}
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
  gap: 0.3rem;
`;

const StyledInputName = styled.input`
  border: 2px solid ${(props) => (props.error ? "red" : "initial")};
  height: 2rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
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
  border-radius: 0.5rem;
  background-color: var(--light-color);
`;
const StyledCode = styled.textarea`
  border: 2px solid ${(props) => (props.error ? "red" : "initial")};
  height: 10rem;
  border-radius: 0.5rem;
  margin-bottom: 1rem;
`;

const StyledFormElementOfCrime = styled.textarea`
  height: 2rem;
  border-radius: 0.5rem;
  background-color: var(--light-color);
  border: none;
  width: 100%;
`;

const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 0.5rem;
`;

const Warning = styled.p`
  color: red;
  margin: 0;
`;

const StyledList = styled.ul`
  list-style: none;
  padding: 0;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const StyledListItem = styled.li`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 1rem;
`;

const StyledRequiredMessage = styled.p`
  display: flex;
  align-items: center;
  font-size: 0.9rem;
  margin: 0 0 1rem 0;
  font-weight: 600;
`;
