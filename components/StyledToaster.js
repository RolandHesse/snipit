import { Toaster } from "react-hot-toast";

function StyledToaster() {
  return (
    <Toaster
      toastOptions={{
        style: {
          border: "3px solid var(--main-lila)",
          padding: "16px",
          color: "var(--white)",
          fontWeight: 600,
          background: "var(--main-blue)",
        },
      }}
    />
  );
}

export default StyledToaster;
