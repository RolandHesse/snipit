import dbConnect from "@/db/connect";
import Snippet from "@/db/models/Snippet";

export default async function handler(request, response) {
  try {
    await dbConnect();

    const { id } = request.query;
    if (!id) {
      return;
    }
    if (request.method === "GET") {
      const snippet = await Snippet.findById(id);
      if (!snippet) {
        return response.status(404).json({ status: "Snippet not found 😔" });
      }
      return response.status(200).json(snippet);
    }
    if (request.method === "PUT") {
      const snippetData = request.body;
      await Snippet.findByIdAndUpdate(id, snippetData);

      response.status(200).json({ status: "Snippet updated!" });
    }

    if (request.method === "DELETE") {
      await Snippet.findByIdAndDelete(id);
      response.status(200).json({ status: "Snippet deleted" });
    }
  } catch (error) {
    console.error("An error occurred:", error);
    response.status(500).json({ error: "Internal Server Error" });
  }
}
