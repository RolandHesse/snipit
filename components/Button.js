function Button({ onDelete, buttonname, buttonemoji }) {
  return (
    <button onClick={onDelete}>
      <span role="img" aria-label="hidden">
        {buttonemoji}
      </span>
      {buttonname}
    </button>
  );
}

export default Button;
