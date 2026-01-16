const express = require("express");
const router = express.Router();
const { getNotes, createNotes, getNotesById, updateNotes, deleteNotes } = require("../../controllers/noteController");
const validateTokenHandler = require("../../middleware/validateTokenHandler");

// protected routes
router.use(validateTokenHandler);

// get, create notes
router.route("/").get(getNotes).post(createNotes)

// get, update, delete notes by id
router.route("/:id").get(getNotesById).patch(updateNotes).delete(deleteNotes);

module.exports = router;

