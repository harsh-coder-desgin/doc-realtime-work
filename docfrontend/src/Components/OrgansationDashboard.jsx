import React, { useEffect, useState } from 'react'
import { Button } from './index.js'
import { useNavigate } from 'react-router-dom'
import { Link } from 'react-router-dom'
import authdoc from '../auth/authdoc.js'
import { useSelector } from 'react-redux'
import { socket } from '../../socket.js'

function OrgansationDashboard() {
  const navigate = useNavigate();
  const users = useSelector(state => state.userAuth.users)
  const [orgalldoc, Setorgalldoc] = useState([]);
  const [ownerdoc, Setownerdoc] = useState(false)

  const createnewdoc = async () => {
    const craetenew = await authdoc.orgname({ organstionname: "New Organstion" })
    if (craetenew) {
      const alldoc = await authdoc.oneorgdocall()
      if (alldoc) {
        Setorgalldoc(alldoc.data.data)
      }
    }
  }

  const checkownerdoc = async (orgID) => {
    const check = await authdoc.getorgname({ id: orgID })
    if (check.data.data.createuserid === users.data._id) {
      Setownerdoc(true)
      navigate(`/dashboard/orgdoc/${orgID}`)
    }
  }

  useEffect(() => {
    const rejoindoc = localStorage.getItem('docnamesaveid');
    if (rejoindoc) {
      socket.emit("join-room", rejoindoc);
    }
    authdoc.oneorgdocall().then((data) => {
      Setorgalldoc(data.data.data)
    })
      .catch((err) => {
        console.log(err);
      })
  }, [])

  return (
    <div>
      <div className='mb-22'>
        <h1 className='text-xl ml-49 mt-5 mb-5'>All Organstion Document</h1>
        <Button bgColor='' textColor='' onClick={createnewdoc}
          className='ml-49 px-4 py-2 bg-blue-200 hover:bg-blue-300 rounded-md mb-2'>Create New Organstion</Button>
        <div className=''>
          {orgalldoc?.map((item, index) => (
            <div key={item._id} className="flex justify-between" >
              {ownerdoc === true ? <Link to={`/dashboard/orgdoc/${item._id}`}>
                <div className="flex mt-2 ml-32 space-x-1">
                  <p className="text-xl w-12 text-right">{index + 1}.</p>
                  <img src="/featureimg1.png" className="w-10 h-10 ml-3" />
                  <p className="mt-[3px] ml-3">{item.organstionname}</p>
                </div>
              </Link> :
                <div onClick={() => checkownerdoc(item._id)} className="flex mt-2 ml-32 space-x-1 cursor-pointer">
                  <p className="text-xl w-12 text-right">{index + 1}.</p>
                  <img src="/featureimg1.png" className="w-10 h-10 ml-3" />
                  <p className="mt-[3px] ml-3">{item.organstionname}</p>
                </div>}
              <div className="flex mt-1">
                <Button bgColor='' textColor='' className="mt-0 mr-12 px-3 h-7 text-sm text-white bg-blue-600 rounded hover:bg-blue-700"
                  onClick={() => { navigate(`/dashboard/orgdocmange/${item._id}`) }}>View Detail</Button>
                <p className='mr-23'>{item.createdAt.split("T")[0]}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default OrgansationDashboard
