import { useState } from "react";
// import { StyledBackdrop } from "@/design-system/StyledBackdrop";
import { Icon } from "@iconify/react";
// import { StyledButton } from "@/design-system/StyledButton";
// import { StyledModal } from "@/design-system/StyledModal";
// import { StyledIconButton } from "@/design-system/StyledIconButton";
// import { StyledContainer } from "@/design-system/StyledContainer";
import Button from "./Button";
import styled from "styled-components";

function ConfirmModal({ message, handleFunction, iconName, snippetId }) {
  const [showModal, setShowModal] = useState(false);

  function handleOuterClick(event) {
    if (event.target === event.currentTarget) {
      hideModal();
    }
  }

  function handleModal() {
    setShowModal(!showModal);
    document.body.style.overflow = "hidden";
  }

  function hideModal() {
    setShowModal(false);
    document.body.style.overflow = "auto";
  }

  return (
    <>
      <Button
        onClick={handleModal}
        buttonName="Delete"
        buttonIcon="line-md:remove"
      />
      {/* <StyledIconButton>
        <Icon
          type="button"
          onClick={handleModal}
          icon={iconName}
          width="24"
          height="24"
        />
      </StyledIconButton> */}
      {showModal && (
        <StyledBackdrop onClick={handleOuterClick}>
          <StyledModal>
            <StyledModalMessage>{message}</StyledModalMessage>
            <SytledButtonContainer>
              <Button
                type="button"
                onClick={() => handleFunction(snippetId)}
                buttonName="Confirm"
                // $backgroundColor="var(--white)"
                // $shadowColor="orange"
              />
              <Button
                type="button"
                onClick={hideModal}
                buttonName="Cancel"
                // $backgroundColor="var(--white)"
                // $shadowColor="grey"
              />
            </SytledButtonContainer>
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
  cursor: auto;
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
  /* font-size: 2rem; */
`;

const SytledButtonContainer = styled.div`
  display: flex;
  justify-content: space-evenly;
`;

const StyledConfirmButton = styled(Button)`
  background-color: var(--white);
`;

export default ConfirmModal;
