import dbConnect from "@/db/connect";
import Snippet from "@/db/models/Snippet";

export default async function handler(request, response) {
  await dbConnect();
  if (request.method === "GET") {
    const snippets = await Snippet.find();
    return response.status(200).json(snippets);
  }
}
