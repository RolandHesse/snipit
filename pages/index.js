import SnippetCardList from "@/components/SnippetCardList";

export default function HomePage({ data }) {
  console.log("data: ", data);

  return (
    <div>
      <SnippetCardList data={data} />
    </div>
  );
}
