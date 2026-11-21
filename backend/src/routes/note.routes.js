import express from "express";
import {
    getAllNotes,
    createNote,
    updateNote,
    deleteAllNote,
    deleteNoteById
} from "../controllers/notes.controller.js";


const router = express.Router()

router("/").get(getAllNotes).post(createNote).delete(deleteAllNote);
router("/:id").patch(updateNote).delete(deleteNoteById)