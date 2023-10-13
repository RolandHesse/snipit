import mongoose from "mongoose";

const { Schema } = mongoose;

const snippetSchema = new Schema(
  {
    name: { type: String, required: true },
    code: { type: String, required: true },
    description: { type: String, required: false },
    link: { type: String, required: false },
    tag: { type: String, required: false },
  },
  { timestamps: true }
);

const Snippet =
  mongoose.models.Snippet || mongoose.model("Snippet", snippetSchema);

export default Snippet;
