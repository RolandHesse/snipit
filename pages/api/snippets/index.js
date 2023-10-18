import dbConnect from "@/db/connect";
import Snippet from "@/db/models/Snippet";

export default async function handler(request, response) {
  try {
    await dbConnect();

    if (request.method === "GET") {
      const snippets = await Snippet.find();
      return response.status(200).json(snippets);
    }
    if (request.method === "POST") {
      const snippetData = request.body;
      await Snippet.create(snippetData);
      response.status(201).json({ status: "new Snippet created!" });
    }
  } catch (error) {
    console.error("An error occurred:", error);
    response.status(500).json({ error: "Internal Server Error" });
  }
}
