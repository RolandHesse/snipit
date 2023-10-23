import { useRouter } from "next/router";

function BackButton() {
  const router = useRouter();

  return (
    <button type="button" onClick={() => router.back()}>
      <span aria-hidden="true">⬅️ </span>Click here to go back
    </button>
  );
}

export default BackButton;
