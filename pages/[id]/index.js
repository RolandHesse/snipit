import LinkLayout from "@/components/LinkLayout";
import SnippetDetails from "@/components/SnippetDetails";
import { useRouter } from "next/router";
import styled from "styled-components";
import { mutate } from "swr";
import toast from "react-hot-toast";
import StyledToaster from "@/components/StyledToaster";

const notify = () =>
  toast.success("Deleted successfully!", {
    ariaProps: {
      role: "status",
      "aria-live": "polite",
    },
  });

function SnippetDetailsPage({ onToggleFavorite, favorites }) {
  const router = useRouter();

  const { id } = router.query;
  console.log(id, "hey");

  async function handleDelete() {
    try {
      await fetch(`/api/snippets/${id}`, { method: "DELETE" });
      mutate("/api/snippets");
      notify();
      router.push("/");
    } catch (error) {
      console.error("An error occurred:", error);
      response.status(500).json({ error: "Something went wrong" });
    }
  }

  return (
    <StlyedDetailsPage>
      <StyledToaster />
      <LinkLayout
        url={"/"}
        linkName={"Go Back"}
        linkIcon="line-md:arrow-left"
      />
      <SnippetDetails
        onDelete={handleDelete}
        onToggleFavorite={onToggleFavorite}
        favorites={favorites}
      />
    </StlyedDetailsPage>
  );
}

export default SnippetDetailsPage;

const StlyedDetailsPage = styled.div`
  margin: 2rem 1rem 6rem 1rem;
`;
