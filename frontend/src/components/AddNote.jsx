import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { addNote, updateNote } from '../features/notes/notesSlice';

function AddNote({ selectedId, setShowConfirm, setConfirmData }) {

    const dispatch = useDispatch();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    const { notes } = useSelector(state => state.notes);

    const selectedNote = notes.find(note => note._id === selectedId);

    useEffect(() => {
        if (selectedNote) {
            setTitle(selectedNote.title);
            setDescription(selectedNote.description);
        } else {
            setTitle("");
            setDescription("");
        }
    }, [selectedNote]);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title.trim() || !description.trim()) {
            return
        }
        const note = {
            title,
            description
        }

        if (selectedNote) {
            setConfirmData({
                title: "Update Note?",
                message: "Are you sure you want to update your notes?",
                onConfirm: () => {
                    dispatch(updateNote({
                        id: selectedId,
                        noteData: note
                    }));
                    setShowConfirm(false);
                },
                onCancel: () => setShowConfirm(false)
            });

            setShowConfirm(true);

        } else {
            dispatch(addNote(note))
                .unwrap()
                .then(() => {
                    setTitle('');
                    setDescription('');
                });
        }
    }

    return (
        <div className='max-w-full bg-surface p-space-lg'>
            <form onSubmit={handleSubmit} className='flex flex-col gap-space-md'>
                <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className='text-headline-sm p-space-sm font-headline outline-none'
                    placeholder='Enter Note Title...'

                />
                <textarea
                    type="text"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className='text-body-lg p-space-sm font-sans resize-none h-20 outline-none'
                    placeholder='Write Your Thoughts Here...'
                />
                <div className='flex justify-between items-center'>
                    <p className='text-body-sm font-sans'>Ready to capture</p>
                    <button
                        type="submit"
                        className='bg-primary text-white px-5 py-2.5 rounded-button'
                    >
                        {selectedId ? "Update Note" : "+ Add Note"}
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddNote