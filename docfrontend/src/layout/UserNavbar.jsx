import React, { useEffect, useState } from 'react'
import { Input, Button } from '../Components/index.js'

function UserNavbar({sendfunction}) {
  const [doc,Setdoc] = useState("")  
  const data = localStorage.getItem("name")

  useEffect(() => {
  sendfunction(data) 
  },[data])

  return (
    <div className='w-full border-b border-gray-200 mt-5'>
      <div className='flex justify-around -mt-2 mb-1'>
        <h1 className='text-xl ml-6 mt-1'>Logo</h1>
        <Input placeholder='Search' className='px-5 py-2 bg-gray-100 w-130 rounded-full ml-110' />
        <div className="relative inline-block mr-19 group w-40">
          <Button bgColor="" textColor="" className={`flex items-center ${data === "Personal" ? 'pl-7' :'pl-5'} py-2 w-41 text-white gap-1 rounded-md bg-blue-900`}>
            {data} Doc
            <svg
              className="w-5 h-5 transition-transform duration-200 transform group-hover:rotate-180"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 640 640"
              fill="currentColor">
              <path d="M297.4 438.6C309.9 451.1 330.2 451.1 342.7 438.6L502.7 278.6C515.2 266.1 515.2 245.8 502.7 233.3C490.2 220.8 469.9 220.8 457.4 233.3L320 370.7L182.6 233.4C170.1 220.9 149.8 220.9 137.3 233.4C124.8 245.9 124.8 266.2 137.3 278.7L297.3 438.7z" />
            </svg>
          </Button>
          <div className="absolute hidden group-hover:block bg-white w-41 border border-gray-200 shadow-lg">
            <Button className='px-4 w-full py-2 hover:bg-blue-200' bgColor='' textColor='' onClick={()=>{Setdoc("Personal")
              localStorage.setItem("name","Personal")
            }}>Personal Doc</Button>
            <Button className='px-4 w-full py-2 hover:bg-blue-200' bgColor='' textColor='' onClick={()=>{Setdoc("Organstion")
              localStorage.setItem("name","Organstion")
            }}>Organstion Doc</Button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default UserNavbar
