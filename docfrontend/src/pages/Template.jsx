import React from 'react'
import { Link } from 'react-router-dom'
import { useOutletContext } from 'react-router-dom'

function Template() {
  const { HomeeRef } = useOutletContext()
  const doc = [{id:1,name:"Letter",img:"/coverimage-1.png"},{id:2,name:"Resume",img:"/coverimage-2.png"},{id:3,name:"Resume Template 2",img:"/coverimage-3.png"},{id:4,name:"Project Prosposal",img:"/coverimage-4.png"},
    {id:5,name:"Brochure",img:"/coverimage-5.png"},{id:6,name:"Report",img:"/coverimage-6.png"}]
  return (
    <div className='scroll-mt-50' ref={HomeeRef}>
    <h1 className='font-medium text-4xl text-center mt-5 mr-10 temp-up'>All Template</h1>
    <div className='mb-50'>
      <div className='grid grid-cols-4 text-center mt-10 w-320 ml-30 gap-y-15 gap-x-10 temp-up'>
         {doc.map((item)=>(
           <Link to={`/template/doc/${item.id}`} key={item.id}>
            <div>
                <div className='border h-90 w-60'>
                  <img src={item.img}/>
                </div>
                <h1 className='mr-12'>{item.name}</h1>
            </div>
          </Link>
         ))}
      </div>
    </div>
    </div>
  )
}

export default Template
