import { useEffect, useState } from 'react'
import Header from '../components/Header'
import AddNote from '../components/AddNote'
import NoteCard from '../components/NoteCard'
import { deleteAllNotes, deleteByIdNote, fetchNotes } from '../features/notes/notesSlice.js';
import { useSelector, useDispatch } from 'react-redux';
import ConfirmBox from '../components/ConfirmBox.jsx';

function Home() {
    const dispatch = useDispatch();
    const [showConfirm, setShowConfirm] = useState(false);
    const [confirmData, setConfirmData] = useState(null)

    const [selectedId, setSelectId] = useState(null)

    const { notes, isLoading, error } = useSelector(state => state.notes)
    useEffect(() => {
        dispatch(fetchNotes())
    }, [])
    console.log("Redux Notes:", notes);
    const total = notes.length

    const handleDeleteAll = () => {
        setConfirmData({
            title: "Delete All Notes?",
            message: "Are you sure you want to delete all your notes?",
            onConfirm: () => {
                dispatch(deleteAllNotes());
                setShowConfirm(false);
            },
            onCancel: () => setShowConfirm(false)
        });

        setShowConfirm(true);
    };



    return (
        <div className='flex flex-col gap-gutter-mobile md:gap-gutter '>
            <header>
                <Header />
            </header>
            <main className='!flex flex-col gap-gutter-mobile md:gap-gutter'>
                <AddNote selectedId={selectedId} setConfirmData={setConfirmData} setShowConfirm={setShowConfirm} />
                <div className='flex items-center justify-between'>
                    <div className='flex items-center gap-space-md '>
                        <h2 className='text-headline-sm font-headline'>Your Notes</h2>
                        <span className='text-body-sm font-sans bg-border text-text-muted py-0.5 rounded-full px-2'>{notes.length} notes</span>
                    </div>
                    <button type="button" onClick={handleDeleteAll} className='flex items-center gap-space-sm bg-red-500 px-space-md py-space-sm text-white text-headline-md font-headline font-bold rounded-button'>
                        <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.25 13.5C1.8375 13.5 1.48438 13.3531 1.19062 13.0594C0.896875 12.7656 0.75 12.4125 0.75 12V2.25H0V0.75H3.75V0H8.25V0.75H12V2.25H11.25V12C11.25 12.4125 11.1031 12.7656 10.8094 13.0594C10.5156 13.3531 10.1625 13.5 9.75 13.5H2.25V13.5M9.75 2.25H2.25V12V12V12H9.75V12V12V2.25V2.25M3.75 10.5H5.25V3.75H3.75V10.5V10.5M6.75 10.5H8.25V3.75H6.75V10.5V10.5M2.25 2.25V2.25V12V12V12V12V12V12V2.25V2.25" fill="#fff" />
                        </svg>
                        Delete All
                    </button>
                </div>
                <div className='grid-cols-1 gap-space-md md:grid-cols-2 lg:grid-cols-3 grid '>
                    {notes.map(note => <NoteCard key={note._id} id={note._id} title={note.title} description={note.description} createdAt={note.createdAt} setSelectId={setSelectId} setShowConfirm={setShowConfirm} setConfirmData={setConfirmData} />)}
                </div>
                {showConfirm && <ConfirmBox
                    title={confirmData.title}
                    message={confirmData.message}
                    onCancel={confirmData.onCancel}
                    onConfirm={confirmData.onConfirm}
                />}
            </main >
        </div >
    )
}

export default Home