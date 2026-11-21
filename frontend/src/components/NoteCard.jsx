import React from 'react'
import { useDispatch } from 'react-redux';
import { deleteByIdNote } from '../features/notes/notesSlice';

function NoteCard({ id, title, description, createdAt }) {

    const dispatch = useDispatch();

    function formatDate(dateString) {
        const date = new Date(dateString);
        const today = new Date();

        const yesterday = new Date();
        yesterday.setDate(today.getDate() - 1);

        // Remove time and compare calendar dates
        const format = (d) =>
            `${d.getFullYear()}-${d.getMonth()}-${d.getDate()}`;

        if (format(date) === format(today)) {
            return "Today";
        }

        if (format(date) === format(yesterday)) {
            return "Yesterday";
        }

        return new Intl.DateTimeFormat("en-IN", {
            day: "numeric",
            month: "short",
            year: "numeric",
        }).format(date);
    }


    return (
        <div className='bg-surface gap-space-sm mb-space-md rounded-lg shadow-card p-5 flex flex-col justify-between'>
            <div className='flex flex-col gap-space-sm mb-space-md'>
                <p className='font-headline text-headline-sm'>{title}</p>
                <p className='text-text-muted text-body-md  line-clamp-3'>{description}</p>
            </div>
            <div className='py-space-md px-space-sm  bg-surface-low rounded-button flex justify-between items-center' >
                <span className='text-text-muted text-body-md'>{formatDate(createdAt)}</span>
                <div className=' flex gap-1'>
                    <div className='h-full w-5 flex items-center justify-center'>
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1.5 12H2.56875L9.9 4.66875L8.83125 3.6L1.5 10.9312V12V12M0 13.5V10.3125L9.9 0.43125C10.05 0.29375 10.2156 0.1875 10.3969 0.1125C10.5781 0.0375 10.7688 0 10.9688 0C11.1687 0 11.3625 0.0375 11.55 0.1125C11.7375 0.1875 11.9 0.3 12.0375 0.45L13.0688 1.5C13.2188 1.6375 13.3281 1.8 13.3969 1.9875C13.4656 2.175 13.5 2.3625 13.5 2.55C13.5 2.75 13.4656 2.94062 13.3969 3.12188C13.3281 3.30313 13.2188 3.46875 13.0688 3.61875L3.1875 13.5H0V13.5M12 2.55V2.55L10.95 1.5V1.5L12 2.55V2.55M9.35625 4.14375L8.83125 3.6V3.6L9.9 4.66875V4.66875L9.35625 4.14375V4.14375" fill="#45474C" />
                        </svg>
                    </div>
                    <button className='h-full w-5 flex items-center justify-center' type='button' onClick={() => dispatch(deleteByIdNote(id))}>
                        <svg width="12" height="14" viewBox="0 0 12 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M2.25 13.5C1.8375 13.5 1.48438 13.3531 1.19062 13.0594C0.896875 12.7656 0.75 12.4125 0.75 12V2.25H0V0.75H3.75V0H8.25V0.75H12V2.25H11.25V12C11.25 12.4125 11.1031 12.7656 10.8094 13.0594C10.5156 13.3531 10.1625 13.5 9.75 13.5H2.25V13.5M9.75 2.25H2.25V12V12V12H9.75V12V12V2.25V2.25M3.75 10.5H5.25V3.75H3.75V10.5V10.5M6.75 10.5H8.25V3.75H6.75V10.5V10.5M2.25 2.25V2.25V12V12V12V12V12V12V2.25V2.25" fill="#fb2c36" />
                        </svg>
                    </button>
                </div>
            </div>
        </div >
    )
}

export default NoteCard