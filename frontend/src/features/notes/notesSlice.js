import { createSlice } from "@reduxjs/toolkit";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getNotesAPI } from "./notesAPI";

const initialState = {
    notes: [],
    isLoading: false,
    error: null
};

export const fetchNotes = createAsyncThunk(
    "notes/fetchNotes",
    async (_, { rejectWithValue }) => {
        try {
            const response = await getNotesAPI();
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to fetch notes"
            );
        }
    }
);