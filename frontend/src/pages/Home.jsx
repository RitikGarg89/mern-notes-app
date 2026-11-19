import React from 'react'
import Header from '../components/Header'
import AddNote from '../components/AddNote'
import NoteCard from '../components/NoteCard'

function Home() {
    return (
        <div className='flex flex-col gap-gutter-mobile md:gap-gutter '>
            <header>
                <Header />
            </header>
            <main className='!flex flex-col gap-gutter-mobile md:gap-gutter'>
                <AddNote />
                <div className='flex items-center gap-space-md '>
                    <h2 className='text-headline-sm font-headline'>Your Notes</h2>
                    <span className='text-body-sm font-sans bg-border text-text-muted py-0.5 rounded-full px-2'>4 notes</span>
                </div>
                <div className='grid-cols-1 gap-space-md md:grid-cols-2 lg:grid-cols-3 grid '>
                    <NoteCard />
                    <NoteCard />
                    <NoteCard />
                    <NoteCard />
                    <NoteCard />
                    <NoteCard />
                </div>
            </main >
        </div >
    )
}

export default Home