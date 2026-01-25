import React from 'react'
import { Link } from 'react-router-dom';

function OrgansationDoc({ data }) {
  const doc = [{ id: 1, name: "Resume" }, { id: 2, name: "Resume" }, { id: 3, name: "Resume" }, { id: 4, name: "Resume" }, { id: 5, name: "Resume" }]
  const alldoc = [{ id: 1, name: "Name", time: "1/1/2023", image: "/featureimg1.png" }, { id: 2, name: "Name", time: "1/1/2023", image: "/featureimg1.png" }, 
    { id: 3, name: "Name", time: "1/1/2023", image: "/featureimg1.png" }]

  return (
    <div>
      <h1 className='ml-30 text-2xl mt-8 text-blue-900'>Create New Oragnation Document</h1>
      <div>
        <div className='grid grid-cols-5 text-center mt-5 w-320 ml-30 gap-y-15 gap-x-10'>
          {doc.map((item) => (
            <Link to={`/dashboard/workingdoc/:id`} key={item.id}>
              <div>
                <div className='border h-80 w-60'>
                </div>
                <h1 className='ml-4'>{item.name}</h1>
              </div>
            </Link>
          ))}
        </div>
        <div className='mb-22'>
          <h1 className='text-xl ml-29 mt-5 mb-5'>All {data} Document</h1>
          <div className=''>
            {alldoc.map((item) => (
              <Link to={`/dashboard/workingdoc/:id`} key={item.id}>
              <div className='flex justify-around'>
                <div className='flex mr-190 mt-2 space-x-1'>
                  <p className='text-xl mt-[1px]'>{item.id}.</p>
                  <img src={item.image} className='w-10 h-10 ml-3' />
                  <p className='mt-[3px] ml-3'>{item.name}</p>
                </div>
                <p>{item.time}</p>
              </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default OrgansationDoc
