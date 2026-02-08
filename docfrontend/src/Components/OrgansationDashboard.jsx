import React, { useEffect, useState } from 'react'
import { Button } from './index.js'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import authdoc from '../auth/authdoc.js'

function OrgansationDashboard() {
  const navigate = useNavigate();
  const [orgalldoc, Setorgalldoc] = useState([])

  const createnewdoc = async () => {
    const craetenew = await authdoc.orgname( {organstionname:"New Organstion"})
    console.log(craetenew);
    if (craetenew) {
      // if userid match to Orgnstion then load data and if in organstion alluserworking have my userid then load data
      const alldoc = await authdoc.oneorgdocall()
      if (alldoc) {
        Setorgalldoc(alldoc.data.data)
      }
    }
  }

  useEffect(() => {
    authdoc.oneorgdocall().then((data) => {
      console.log(data);
      Setorgalldoc(data.data.data)
    })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  return (
    <div>
      <div className='mb-22'>
        <h1 className='text-xl ml-29 mt-5 mb-5'>All Organstion Document</h1>
        <Button bgColor='' textColor='' onClick={createnewdoc}
          className='ml-29 px-4 py-2 bg-blue-200 hover:bg-blue-300 rounded-md mb-2'>Create New Organstion</Button>
        <div className=''>
          {orgalldoc?.map((item,index) => (
            <div key={item._id}>
              <div className='flex justify-around'>
                <Link to={`/dashboard/orgdoc/${item._id}`}>
                  <div className='flex mr-190 mt-2 space-x-1'>
                    <p className='text-xl mt-[1px]'>{index+1}.</p>
                    <img src="/featureimg1.png" className='w-10 h-10 ml-3' />
                    <p className='mt-[3px] ml-3'>{item.organstionname}</p>
                  </div>
                </Link>
                <Button bgColor='' textColor='' className='text-[14px] mb-4 border p-2 rounded-full shadow-md hover:bg-gray-100 hover:hand' 
                onClick={() => { navigate(`/dashboard/orgdocmange/${item._id}`) }}>Manage</Button>
                <p className='mt-1'>{item.createdAt.split("T")[0]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default OrgansationDashboard
