export default function SnippetCard({ snippetData, name, description }) {
  if (!snippetData) return <div>No snippets yet 😭</div>;
  return (
    <div>
      <h2>{name}</h2>
      <p>{description}</p>
    </div>
  );
}
