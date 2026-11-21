import express from "express";
import {
    getAllNotes,
    createNote,
    updateNote,
    deleteAllNote,
    deleteNoteById
} from "../controllers/notes.controller.js";

const router = express.Router();

router.route("/")
    .get(getAllNotes)
    .post(createNote)
    .delete(deleteAllNote);

router.route("/:id")
    .patch(updateNote)
    .delete(deleteNoteById);

export default router;