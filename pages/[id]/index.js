import BackLink from "@/components/BackLink";
import SnippetDetails from "@/components/SnippetDetails";
import { useRouter } from "next/router";
import { mutate } from "swr";

function SnippetDetailsPage({ editState }) {
  const router = useRouter();
  // const { isReady } = router;
  const { id } = router.query;

  async function handleDelete() {
    await fetch(`/api/snippets/${id}`, { method: "DELETE" });
    mutate(`/api/snippets`);
    router.push("/");
  }

  return (
    <>
      <BackLink url={"/"} />
      {editState && <p>Editted successfully</p>}
      <SnippetDetails onDelete={handleDelete} />
    </>
  );
}

export default SnippetDetailsPage;
