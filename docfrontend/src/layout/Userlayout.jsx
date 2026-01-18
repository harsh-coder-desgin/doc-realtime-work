import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import UserNavbar from './UserNavbar'
import { Footer } from '../Components/index.js' 

function Userlayout() {
  const [loading, SetLoading] = useState(false)
  return !loading ? (
    <>
      <div className="flex flex-col min-h-screen md:min-h-[124dvh] lg:min-h-[100dvh]">
        <UserNavbar/>
        <main className="flex-grow">
          <Outlet/>
        </main>
        <Footer />
      </div>
    </>
  ) : null
}

export default Userlayout
 