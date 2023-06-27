const mongoose = require('mongoose');

const noteSchema = mongoose.Schema(
  {
    title: {
      type: "string",
      required: true,
    },
    category: {
      type: "string",
      required: true,
    },
    content: {
      type: "string",
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    }
  },
  {
    timestamps: true,
  }
);

const Note = mongoose.model("Note", noteSchema);

module.exports = Note;