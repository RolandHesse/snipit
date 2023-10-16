import SnippetCard from "./SnippetCard";

export default function SnippetCardList({ data }) {
  return (
    <>
      <h1>List of Snippets</h1>
      {data.map((snippet) => (
        <p key={snippet._id}>
          <SnippetCard
            snippetData={snippet}
            name={snippet.name}
            description={snippet.description}
          />
        </p>
      ))}
    </>
  );
}
