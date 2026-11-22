import Note from "../models/notes.model.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/AsyncHandler.js";

const getAllNotes = asyncHandler(async (req, res) => {
    const notes = await Note.find();
    return res.
        status(200)
        .json(new ApiResponse(200, notes, "Notes Fetched successfully"))
})

const createNote = asyncHandler(async (req, res) => {
    const { title, description } = req.body;
    if (!title || !description) {
        throw new ApiError(401, "Both title and description are required")
    }
    const note = await Note.create({
        title,
        description
    })

    return res
        .status(200)
        .json(new ApiResponse(200, note, "Note created successfully"))
})

const updateNote = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    if (!id) {
        throw new ApiError(400, "Note ID is required");
    }
    if (!title || !description) {
        throw new Error(401, "Both title and description are required");
    }
    const updatedNote = await Note.findByIdAndUpdate(
        id,
        {
            title,
            description
        },
        {
            new: true,
            runValidators: true
        }
    );
    if (!updatedNote) {
        throw new ApiError(404, "User Not Found")
    }
    return res
        .status(200)
        .json(new ApiResponse(200, updatedNote, "Note Updated Successfully"))
})

const deleteNoteById = asyncHandler(async (req, res) => {
    const { id } = req.params;
    if (!id) {
        throw new ApiError(400, "Note ID is required");
    }
    const deletedNote = await Note.findByIdAndDelete(
        id
    )
    if (!deletedNote) {
        throw new ApiError(404, "Note Not Found")
    }
    return res
        .status(200)
        .json(new ApiResponse(200, deletedNote, "Note Deleted Successfully"))

})

const deleteAllNote = asyncHandler(async (req, res) => {
    const deletedNotes = await Note.deleteMany({});
    return res
        .status(200)
        .json(new ApiResponse(200, deletedNotes, "Notes Deleted Successfully"))
})

export { getAllNotes, createNote, updateNote, deleteAllNote, deleteNoteById }