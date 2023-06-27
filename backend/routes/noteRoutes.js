const express = require('express');
const { createNote, deleteNote, getNotesById, updateNote, getNotes} = require('../controllers/notesController');
const protect= require('../middlewares/authMiddleware');

const router = express.Router();

router.route('/').get(protect, getNotes);
router.route('/create').post(protect, createNote);
router.route('/:id').get(getNotesById);
router.route('/:id').get(getNotesById).put(protect, updateNote);
router.route("/:id").get(getNotesById).delete(protect, deleteNote);

module.exports = router;