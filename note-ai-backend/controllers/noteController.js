const mongoose = require("mongoose");
const Note = require("../models/noteModel");
const { v4: uuidv4 } = require("uuid");
const asyncHandler = require("express-async-handler");
const { constants } = require("../errorConstants");

const getNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find();
  if (!notes) {
    res.status(constants.NOT_FOUND);
    throw new Error("Notes not found");
  }
  res.status(200).json({
    success: true,
    notes: notes,
  });
});

const createNotes = asyncHandler(async (req, res) => {
  console.log("New Note Posted");
  const { title, content } = req.body;
    // both of them are caught by express-async-handler but one mongoose throws and other we throw manually
    // if we are not using this below "if" block then the error is coming from mongoose validation in model
    // if we are using this then the error is coming from here and caught by our errorHandler middleware
  if (!title || !content) {
    res.status(constants.VALIDATION_ERROR);
    throw new Error("Title and content are required");
  }

  const newNote = new Note({ title, content });
  const id = uuidv4();
  newNote.noteId = id;
  console.log(newNote);
  await newNote.save();
  res.status(200).json({
    success: true,
    message: "new note created",
    note: newNote,
  });
});

const getNotesById = asyncHandler(async (req, res) => {
  const { id } = req.params;
    const note = await Note.findOne({ noteId: id });
      if (!note) {
    res.status(constants.NOT_FOUND);
    throw new Error("Note not found");
  }
    res.status(200).json({
      success: true,
      note: note,
    });
});

const updateNotes = asyncHandler(async (req, res) => {
  const { id } = req.params;
    const updatedNote = await Note.findOneAndUpdate(
      // using findByIdAndUpdate leads to casting object into _id but we're using noteId therefore use findOneAndUpdate
      { noteId: id },
      { $set: req.body }, // Update only the fields provided in the request body and leave others unchanged
      { new: true, runValidators: true }
    );

    if (!updatedNote) {
      res.status(constants.NOT_FOUND);
      throw new Error("Update failed. Note not found");
    }

    res.status(200).json({
      success: true,
      note: updatedNote,
    });
});

const deleteNotes = asyncHandler(async (req, res) => {
  const { id } = req.params;
    const deletedNote = await Note.findOneAndDelete({ noteId: id }); // here also not using findByIdAndDelete for same reason as above (since it takes mongodb _id not out custom noteId)
    if (!deletedNote) {
      res.status(constants.NOT_FOUND);
      throw new Error("Delete failed. Note not found");
    }
    res.status(200).json({
      success: true,
      message: "Note deleted successfully",
    });
});

module.exports = {
  getNotes,
  createNotes,
  getNotesById,
  updateNotes,
  deleteNotes,
};
