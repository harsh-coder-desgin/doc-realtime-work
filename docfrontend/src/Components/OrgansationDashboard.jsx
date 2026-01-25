import React from 'react'
import { Button } from './index.js'
import { useNavigate, useOutletContext } from 'react-router-dom'
import { Link } from 'react-router-dom'

function OrgansationDashboard() {
  const { data } = useOutletContext()
  const navigate = useNavigate();
  const alldoc = [{ id: 1, name: "Name", time: "1/1/2023", image: "/featureimg1.png" }, { id: 2, name: "Name", time: "1/1/2023", image: "/featureimg1.png" },
  { id: 3, name: "Name", time: "1/1/2023", image: "/featureimg1.png" }]

  return (
    <div>
      <div className='mb-22'>
        <h1 className='text-xl ml-29 mt-5 mb-5'>All Organstion Document</h1>
        <div className=''>
          {alldoc?.map((item) => (
            <div key={item.id}>
              <div className='flex justify-around'>
                <Link to={`/dashboard/orgdoc`}>
                  <div className='flex mr-190 mt-2 space-x-1'>
                    <p className='text-xl mt-[1px]'>{item.id}.</p>
                    <img src={item.image} className='w-10 h-10 ml-3' />
                    <p className='mt-[3px] ml-3'>{item.name}</p>
                  </div>
                </Link>
                <Button bgColor='' textColor='' className='text-[14px] mb-4 border p-2 rounded-full shadow-md hover:bg-gray-100 hover:hand' onClick={() => { navigate('/dashboard/orgdoc/:id') }}>Manage</Button>
                <p className='mt-1'>{item.time}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default OrgansationDashboard
