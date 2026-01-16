import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from './Components/Navbar'
import Footer from './Components/Footer'
import './App.css'

function App() {
  const [loading, SetLoading] = useState(false)
  return !loading ? (
    <>
      <div className="flex flex-col min-h-screen md:min-h-[124dvh] lg:min-h-[100dvh]">
        <Navbar/>
        <main className="flex-grow">
          <Outlet />
        </main>
        <Footer/>
      </div>
    </>
  ) : null
}

export default App