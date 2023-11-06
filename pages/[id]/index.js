import LinkLayout from "@/components/LinkLayout";
import SnippetDetails from "@/components/SnippetDetails";
import { useRouter } from "next/router";
import styled from "styled-components";
import { mutate } from "swr";

function SnippetDetailsPage() {
  const router = useRouter();

  const { id } = router.query;

  async function handleDelete() {
    try {
      await fetch(`/api/snippets/${id}`, { method: "DELETE" });
      mutate(`/api/snippets`);
      router.push("/");
    } catch (error) {
      console.error("An error occurred:", error);
      response.status(500).json({ error: "Something went wrong" });
    }
  }

  return (
    <StlyedDetailsPage>
      <LinkLayout url={"/"} linkName={"Go Back"} linkEmoji="⬅️ " />
      <SnippetDetails onDelete={handleDelete} />
    </StlyedDetailsPage>
  );
}

export default SnippetDetailsPage;

const StlyedDetailsPage = styled.div`
  margin: 3.6rem 0 0 0;
`;
