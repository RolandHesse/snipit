import { useState } from "react";
import Button from "./Button";
import styled from "styled-components";

function ConfirmModal({ message, handleFunction, snippetId }) {
  const [showModal, setShowModal] = useState(false);

  function handleOuterClick(event) {
    if (event.target === event.currentTarget) {
      hideModal();
    }
  }

  function handleModal() {
    setShowModal(!showModal);
  }

  function hideModal() {
    setShowModal(!showModal);
  }

  return (
    <>
      <Button
        onClick={handleModal}
        buttonName="Delete"
        buttonIcon="line-md:remove"
        aria-label="Delete Snippet"
      />
      {showModal && (
        <StyledBackdrop onClick={handleOuterClick}>
          <StyledModal aria-live="assertive">
            <StyledModalMessage>{message}</StyledModalMessage>
            <StyledButtonContainer>
              <Button
                type="button"
                onClick={() => handleFunction(snippetId)}
                buttonName="Confirm"
                $backgroundColor="red"
              />
              <Button type="button" onClick={hideModal} buttonName="Cancel" />
            </StyledButtonContainer>
          </StyledModal>
        </StyledBackdrop>
      )}
    </>
  );
}

const StyledBackdrop = styled.div`
  height: 100dvh;
  width: 100dvw;
  position: fixed;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.4);
  backdrop-filter: blur(3px);
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 40px 80px 150px 100px rgba(0, 0, 0, 0.1) inset;
`;

const StyledModal = styled.article`
  max-width: 70dvw;
  padding: 1rem;
  color: var(--primary-color);
  background-color: var(--white);
  border-radius: 0.5rem;
  border: solid var(--primary-color) 1px;
`;

const StyledModalMessage = styled.h3`
  color: var(--primary-color);
  text-align: center;
`;

const StyledButtonContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

export default ConfirmModal;
