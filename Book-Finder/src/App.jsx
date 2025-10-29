


function App() {

    return (
        <div className='min-h-screen bg-slate-50 text-slate-900'>
            <header className='bg-white shadow-sm'>
                <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
                    <h1 className="text-xl font-semibold">Book Finder</h1>
                    <p className='text-sm text-gray-600'>Search book by title - Open Library API</p>

                </div>
            </header>
            <main className='max-w-5xl mx-auto px-4 py-6'>

            </main>
            <footer className='max-w-5xl mx-auto px-4 pb-8 text-xs text-gray-500'>
                <hr className='my-6'/>
                <div className='flex justify-between'>
                <div>Built with React + Vite + Tailwind</div>
                <div>Data from Open Library</div>
                </div>
            </footer>
        </div>
    )

}


export default App;