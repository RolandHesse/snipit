import mongoose from "mongoose";

const { Schema } = mongoose;

const snippetSchema = new Schema(
  {
    name: { type: String, required: true },
    code: { type: String, required: true },
    description: { type: String },
    links: [String],
    tag: { type: String },
  },
  { timestamps: true }
);

const Snippet =
  mongoose.models.Snippet || mongoose.model("Snippet", snippetSchema);

export default Snippet;
