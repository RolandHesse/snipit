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
          <article>
            <p>{message}</p>
            <div $isCenter>
              <button
                type="button"
                onClick={() => handleFunction(snippetId)}
                $isDeleteButton
              >
                Confirm
              </button>
              <button type="button" onClick={hideModal}>
                Cancel
              </button>
            </div>
          </article>
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

export default ConfirmModal;
