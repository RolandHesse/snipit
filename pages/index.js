import SnippetCardList from "@/components/SnippetCardList";
import useSWR from "swr";

export default function HomePage() {
  const { data, error, isLoading } = useSWR("api/snippets");

  if (error) return <p>failed to load🥶😵‍💫😨😩😢</p>;
  if (isLoading) return <p>wait....wait...wait... still loading...🤓</p>;

  return (
    <div>
      <SnippetCardList data={data} />
    </div>
  );
}
