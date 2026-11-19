import React from 'react'

function AddNote() {
    return (
        <div className='max-w-full bg-surface p-space-lg'>
            <form className='flex flex-col gap-space-md'>
                <input
                    type="text"
                    className='text-headline-sm p-space-sm font-headline outline-none'
                    placeholder='Enter Note Title...'

                />
                <textarea
                    type="text"
                    className='text-body-lg p-space-sm font-sans resize-none h-20 outline-none'
                    placeholder='Write Your Thoughts Here...'
                />
                <div className='flex justify-between items-center'>
                    <p className='text-body-sm font-sans'>Ready to capture</p>
                    <button
                        type="submit"
                        className='bg-primary text-white px-5 py-2.5 rounded-button'
                    >
                        + Add Note
                    </button>
                </div>
            </form>
        </div>
    )
}

export default AddNote