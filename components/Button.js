function Button({ onDelete, buttonName, buttonEmoji }) {
  return (
    <button onClick={onDelete}>
      <span role="img" aria-label="hidden">
        {buttonEmoji}
      </span>
      {buttonName}
    </button>
  );
}

export default Button;

// const StyledButton = styled.button`
//   background-color: #c1d2d7;
//   border: none;
//   border-radius: 0.3rem;
//   width: 10%;
// `;
