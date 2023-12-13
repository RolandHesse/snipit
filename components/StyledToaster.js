import { Toaster } from "react-hot-toast";

function StyledToaster() {
  return (
    <Toaster
      toastOptions={{
        style: {
          border: "1px solid var(--primary-color)",
          padding: "16px",
          color: "var(--text-color)",
          fontWeight: 600,
          background: "var(--light-color)",
        },
      }}
    />
  );
}

export default StyledToaster;
