import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { createNoteAPI, deleteAllNotesAPI, deleteNoteAPI, getNotesAPI, updateNoteAPI } from "./notesAPI";

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

export const addNote = createAsyncThunk(
    "notes/createNotes",
    async (noteData, { rejectWithValue }) => {
        try {
            const response = await createNoteAPI(noteData);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to add note"
            )
        }
    }
)

export const updateNote = createAsyncThunk(
    "notes/updateNotes",
    async ({ id, noteData }, { rejectWithValue }) => {
        try {
            const response = await updateNoteAPI(id, noteData);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to update note"
            )
        }
    }
)

export const deleteByIdNote = createAsyncThunk(
    "notes/deleteNote",
    async (id, { rejectWithValue }) => {
        try {
            const response = await deleteNoteAPI(id);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to Delete Note"
            )
        }
    }
)

export const deleteAllNotes = createAsyncThunk(
    "notes/deleteNotes",
    async (_, { rejectWithValue }) => {
        try {
            const response = await deleteAllNotesAPI();
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error.response?.data?.message || "Failed to Delete All Note"
            )
        }
    }
)


const noteSlice = createSlice({
    name: "notes",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder

            .addCase(fetchNotes.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })

            .addCase(fetchNotes.fulfilled, (state, action) => {
                state.isLoading = false;
                state.notes = action.payload;
            })

            .addCase(fetchNotes.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })

            .addCase(addNote.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(addNote.fulfilled, (state, action) => {
                state.isLoading = false;
                state.notes.push(action.payload)
            })
            .addCase(addNote.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(updateNote.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(updateNote.fulfilled, (state, action) => {
                state.isLoading = false;

                const index = state.notes.findIndex(
                    note => note._id === action.payload._id
                );

                if (index !== -1) {
                    state.notes[index] = action.payload;
                }
            })
            .addCase(updateNote.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(deleteByIdNote.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteByIdNote.fulfilled, (state, action) => {
                state.isLoading = false;
                state.notes = state.notes.filter(
                    note => note._id !== action.payload._id
                );
            })
            .addCase(deleteByIdNote.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(deleteAllNotes.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(deleteAllNotes.fulfilled, (state) => {
                state.isLoading = false;
                state.notes = []
            })
            .addCase(deleteAllNotes.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
    }
});

export default noteSlice.reducer;