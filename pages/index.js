import SnippetCardList from "@/components/SnippetCardList";
import useSWR from "swr";

export default function HomePage() {
  const { data, error, isLoading } = useSWR("api/snippets");

  if (error) return <div>failed to load🥶😵‍💫😨😩😢</div>;
  if (isLoading) return <div>wait....wait...wait... still loading...🤓</div>;

  return (
    <div>
      <SnippetCardList data={data} />
    </div>
  );
}
