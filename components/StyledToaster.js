import { Toaster } from "react-hot-toast";

function StyledToaster() {
  return (
    <Toaster
      toastOptions={{
        style: {
          border: "1px solid var(--primary-color)",
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
