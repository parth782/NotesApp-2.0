const asyncHandler = require('express-async-handler');
const Note = require('../models/noteModel');

const getNotes = asyncHandler(async (req, res) => {
  // console.log(req.user._id);
  const notes = await Note.find({ user: req.user._id });
  // console.log(notes);
  res.json(notes);
});

const createNote = asyncHandler(async (req, res) => {
    const { title, category, content } = req.body;
    if (!title || !content || !category) {
      res.status(400);
      throw new Error("Please Fill all the feilds");
      return;
    } else {
      const note = new Note({ title, category, content, user: req.user._id });

      const createdNote = await note.save();

      res.status(201).json(createdNote);
    }
});

const deleteNote = asyncHandler(async (req, res) => {
  const note = await Note.find({ _id: req.params.id });
  if (note) {
    if (note[0].user.toString() !== req.user._id.toString()) {
      res.status(400);
      throw new Error("Invalid action");
    }
    await note[0].remove();
    res.json({ message: "Note Removed" });
  } else {
    res.status(404);
    throw new Error("Note not found");
  }
});

const getNotesById = asyncHandler(async (req, res) => {
  const note = await Note.findOne({_id:req.params.id});
  if (note) {
    res.status(201).json(note);
  } else {
    res.status(400);
    throw new Error('Note not found');
  }
});

const updateNote = asyncHandler(async (req, res) => {
  const note = await Note.find({ _id: req.params.id });
  if (note) {
    if (note[0].user.toString() !== req.user._id.toString()) {
      res.status(400);
      throw new Error("Invalid action");
    }
    // console.log(note);
    // console.log(req.user._id.toString());
    note[0].title = req.body.title;
    note[0].category = req.body.category;
    note[0].content = req.body.content;
    const updatedNote = await note[0].save();
    res.json(updatedNote);
  } else {
    res.status(404);
    throw new Error("Note not found");
  }
});


module.exports = { getNotes, createNote, deleteNote, getNotesById, updateNote };