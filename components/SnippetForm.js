import styled from "styled-components";
import Button from "./Button";
import { useState } from "react";

function SnippetForm({ onSubmit, formName, defaultData }) {
  const [inputValue, setInputValue] = useState("");
  const [valueLength, setValueLength] = useState(false);

  function checkRequiredFields(event) {
    const value = event.target.value;
    setInputValue(value);

    if (value.length > 0) {
      setValueLength(true);
    } else {
      setValueLength(false);
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const snippetData = Object.fromEntries(formData);

    onSubmit(event, snippetData);
  }

  return (
    <StyledForm aria-labelledby={formName} onSubmit={handleSubmit}>
      <h2> {defaultData ? "Update Snippet" : "Add new Snippet"}</h2>

      <Warning>
        {valueLength ? "‼️ Please fill in the required field" : ""}
      </Warning>
      <p>ℹ️ Fields marked with an * are required</p>
      <label htmlFor="name">Name*</label>
      <StyledInputName
        type="text"
        id="name"
        name="name"
        placeholder="Code name"
        defaultValue={defaultData?.name}
      />
      <label htmlFor="code">Code*</label>

      <StyledCode
        // value={inputValue}
        onChange={checkRequiredFields}
        type="text"
        id="code"
        name="code"
        rows="5"
        placeholder="your code"
        defaultValue={defaultData?.code}
      ></StyledCode>

      <label htmlFor="description">Description</label>
      <StyledDescription
        type="text"
        id="description"
        name="description"
        rows="5"
        placeholder="description of the code"
        defaultValue={defaultData?.description}
      ></StyledDescription>
      <label htmlFor="link">Link</label>
      <StyledInputLink
        type="text"
        id="link"
        name="link"
        placeholder="type your link here"
        defaultValue={defaultData?.link}
      />
      <label htmlFor="tag">Tag</label>
      <StyledTag
        id="tag"
        name="tag"
        placeholder="tag"
        defaultValue={defaultData?.tag}
      >
        <option value=""></option>
        <option value="html">html</option>
        <option value="javaScript">javaScript</option>
        <option value="next">next</option>
      </StyledTag>
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
  padding: 3rem;
`;

const StyledInputName = styled.input`
  height: 2rem;
  border-radius: 0.3rem;
  background-color: var(--light-color);
  border: none;
`;
const StyledCode = styled.textarea`
  height: 10rem;
  border-radius: 0.3rem;
  background-color: var(--primary-color);
  border: none;
  color: var(--white);
`;

const StyledDescription = styled.textarea`
  height: 2rem;
  border-radius: 0.3rem;
  background-color: var(--light-color);
  border: none;
`;
const StyledInputLink = styled.input`
  height: 2rem;
  border-radius: 0.3rem;
  background-color: var(--light-color);
  border: none;
`;

const StyledTag = styled.select`
  height: 2rem;
  border-radius: 0.3rem;
  background-color: var(--light-color);
  border: none;
`;
const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
`;

const Warning = styled.p`
  color: red;
`;
