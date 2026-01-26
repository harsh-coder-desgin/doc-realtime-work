import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import UserNavbar from './UserNavbar'
import { Footer } from '../Components/index.js' 

function Userlayout() {
  const [loading, SetLoading] = useState(false)
  const [data, SetData] = useState("");

  const userdata = (name) =>{
    SetData(name)
  }
  
  const maindata = localStorage.getItem("name")

  if (!data) {
    SetData(maindata)
  }
  
  const outletContextValue = { data };
  
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
 