import React from 'react'
import { Link } from 'react-router-dom'

function Template() {
  const doc = [{id:1,name:"Resume"},{id:2,name:"Resume"},{id:3,name:"Resume"},{id:4,name:"Resume"},
        {id:5,name:"Resume"},{id:6,name:"Resume"},{id:7,name:"Resume"},{id:8,name:"Resume"},{id:9,name:"Resume"},{id:10,name:"Resume"}]
  return (
    <div className='mb-50'>
      <h1 className='font-medium text-4xl text-center mt-5'>All Template</h1>
      <div className='grid grid-cols-5 text-center mt-10 w-320 ml-30 gap-y-15 gap-x-10'>
         {doc.map((item)=>(
          <Link to={`/template/doc/id`} key={item.id}>
            <div>
                <div className='border h-80 w-60'>
                </div>
                <h1 className='ml-4'>{item.name}</h1>
            </div>
          </Link>
         ))}
      </div>
    </div>
  )
}

export default Template
