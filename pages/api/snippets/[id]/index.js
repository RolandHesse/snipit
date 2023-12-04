import dbConnect from "@/db/connect";
import Snippet from "@/db/models/Snippet";

export default async function handler(request, response) {
  try {
    await dbConnect();

    const { id } = request.query;
    if (!id) {
      return response.status(400).json({ error: "ID is required" });
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
      const updatedSnippet = await Snippet.findByIdAndUpdate(id, snippetData, {
        new: true,
      });
      if (!updatedSnippet) {
        return response.status(404).json({ status: "Snippet not found 😔" });
      }
      return response.status(200).json({ status: "Snippet updated!" });
    }

    if (request.method === "DELETE") {
      const deletedSnippet = await Snippet.findByIdAndDelete(id);
      if (!deletedSnippet) {
        return response.status(404).json({ status: "Snippet not found 😔" });
      }
      return response.status(200).json({ status: "Snippet deleted" });
    }

    return response.status(405).json({ error: "Method not allowed" });
  } catch (error) {
    console.error("An error occurred:", error);
    response.status(500).json({ error: "Internal Server Error" });
  }
}
