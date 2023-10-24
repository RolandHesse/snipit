import Link from "next/link";

function BackLink({ url }) {
  return (
    <Link href={url}>
      <span aria-hidden="true">⬅️ </span>Click here to go back
    </Link>
  );
}

export default BackLink;
