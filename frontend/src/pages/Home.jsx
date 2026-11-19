import React from 'react'
import Header from '../components/Header'
import AddNote from '../components/AddNote'

function Home() {
    return (
        <div className='flex flex-col gap-gutter-mobile md:gap-gutter '>
            <header>
                <Header />
            </header>
            <main className='!flex flex-col gap-gutter-mobile md:gap-gutter'>
                <AddNote />
                <div className='flex items-center gap-space-md'>
                    <h2 className='text-headline-sm font-headline'>Your Notes</h2>
                    <span></span>
                </div>
            </main >
        </div >
    )
}

export default Home