import { Schema, model, models } from "mongoose";

const noteSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  user: { type: Schema.Types.ObjectId, ref: "User" },
});

const Note = models.Note || model("Note", noteSchema);

export default Note;
