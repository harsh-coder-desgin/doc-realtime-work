import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import UserNavbar from './UserNavbar'
import { Footer } from '../Components/index.js' 

function Userlayout() {
  const [loading, SetLoading] = useState(false)
  const [data, SetData] = useState("Personal");

  const outletContextValue = { data };
  const userdata = (name) =>{
    SetData(name)
  }
  return !loading ? (
    <>
      <div className="flex flex-col min-h-screen md:min-h-[124dvh] lg:min-h-[100dvh]">
        <UserNavbar sendfunction={userdata}/>
        <main className="flex-grow">
          <Outlet context={outletContextValue}/>
        </main>
        <Footer />
      </div>
    </>
  ) : null
}

export default Userlayout
 