import React from 'react'
import Header from '../components/Header'
import AddNote from '../components/AddNote'
import NoteCard from '../components/NoteCard'

function Home() {

    const sampleNotes = [
        {
            id: 1,
            title: "Weekly Grocery Run",
            description:
                "Almond milk, sourdough loaf, organic eggs, fresh spinach, cherry tomatoes, and ground coffee beans for morning pour-overs.",
            createdAt: "2026-11-19",
        },
        {
            id: 2,
            title: "Project Ideas",
            description:
                "Build a personal expense tracker using React. Include monthly spending summaries, category-wise expenses, and interactive charts.",
            createdAt: "2026-11-18",
        },
        {
            id: 3,
            title: "Learning JavaScript",
            description:
                "Revise closures, promises, async/await, array methods, event loop, and JavaScript execution context.",
            createdAt: "2026-11-17",
        },
        {
            id: 4,
            title: "Weekend Plans",
            description:
                "Clean the room, organize the workspace, finish pending tasks, watch a movie, and spend some time relaxing.",
            createdAt: "2026-11-16",
        },
        {
            id: 5,
            title: "React Concepts",
            description:
                "Understand useState, useEffect, useCallback, Context API, component lifecycle, props drilling, and state management.",
            createdAt: "2026-11-15",
        },
        {
            id: 6,
            title: "Important Reminders",
            description:
                "Complete the project documentation, review the backend APIs, test all CRUD operations, and update the GitHub repository.",
            createdAt: "2026-11-14",
        },
    ];

    return (
        <div className='flex flex-col gap-gutter-mobile md:gap-gutter '>
            <header>
                <Header />
            </header>
            <main className='!flex flex-col gap-gutter-mobile md:gap-gutter'>
                <AddNote />
                <div className='flex items-center gap-space-md '>
                    <h2 className='text-headline-sm font-headline'>Your Notes</h2>
                    <span className='text-body-sm font-sans bg-border text-text-muted py-0.5 rounded-full px-2'>{sampleNotes.length} notes</span>
                </div>
                <div className='grid-cols-1 gap-space-md md:grid-cols-2 lg:grid-cols-3 grid '>
                    {sampleNotes.map(note => <NoteCard key={note.id} title={note.title} description={note.description} createdAt={note.createdAt} />)}
                </div>
            </main >
        </div >
    )
}

export default Home