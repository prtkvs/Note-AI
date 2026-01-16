const mongoose = require("mongoose");
const Note = require("../models/noteModel");
const { v4: uuidv4 } = require("uuid");

const getNotes = async (req, res) => {
  try {
    const notes = await Note.find();
    res.status(200).json(notes);
  } catch (error) {
    res
      .status(500)
      .json({
        success: false,
        message: "Error fetching notes",
        error: error.message,
      });
  }
};

const createNotes = async (req, res) => {
  console.log("New Note Posted");
  try {
    const { title, content } = req.body;
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
  } catch (e) {
    res.status(500).json({
      success: false,
      message: "Notes creation failed",
      error: e.message,
    });
  }
};

const getNotesById = async (req, res) => {
  const { id } = req.params;
  try {
    const note = await Note.findOne({ noteId: id });
    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }
    res.status(200).json({
      success: true,
      note: note,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching note",
      error: error.message,
    });
  }
};

const updateNotes = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedNote = await Note.findOneAndUpdate(    // using findByIdAndUpdate leads to casting object into _id but we're using noteId therefore use findOneAndUpdate 
      { noteId: id },
      { $set: req.body },  // Update only the fields provided in the request body and leave others unchanged
      { new: true, runValidators: true } 
    );

    if (!updatedNote) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    res.status(200).json({
      success: true,
      note: updatedNote,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating note",
      error: error.message,
    });
  }
};

const deleteNotes = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedNote = await Note.findOneAndDelete({ noteId: id }); // here also not using findByIdAndDelete for same reason as above (since it takes mongodb _id not out custom noteId)
        if (!deletedNote) {
            return res.status(404).json({
                success: false,
                message: "Note not found",
            });
        }   
        res.status(200).json({
            success: true,
            message: "Note deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Error deleting note",
            error: error.message,
        });
    }
};

module.exports = {
    getNotes,
    createNotes,
    getNotesById,
    updateNotes,
    deleteNotes
}
