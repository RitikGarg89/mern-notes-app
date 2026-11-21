import axiosInstance from "../../utils/axiosInstance.js";

// GET - Fetch all notes
export const getNotesAPI = async () => {
    const response = await axiosInstance.get("/");
    return response.data;
};

// POST - Create a note
export const createNoteAPI = async (noteData) => {
    const response = await axiosInstance.post("/", noteData);
    return response.data;
};

// PATCH - Update a note
export const updateNoteAPI = async (id, noteData) => {
    const response = await axiosInstance.patch(`/${id}`, noteData);
    return response.data;
};

// DELETE - Delete a note
export const deleteNoteAPI = async (id) => {
    const response = await axiosInstance.delete(`/${id}`);
    return response.data;
};

// DELETE - Delete all notes
export const deleteAllNotesAPI = async () => {
    const response = await axiosInstance.delete("/");
    return response.data;
};