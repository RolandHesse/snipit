export default function HomePage({ data }) {
  console.log("data: ", data);

  return (
    <div>
      <h1>Hello from Next.js</h1>
      {data.map((snippet) => (
        <p key={snippet._id}>{snippet.name}</p>
      ))}
    </div>
  );
}
