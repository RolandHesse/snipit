import SnippetCardList from "@/components/SnippetCardList";

export default function HomePage({ data }) {
  return (
    <div>
      <SnippetCardList data={data} />
    </div>
  );
}
