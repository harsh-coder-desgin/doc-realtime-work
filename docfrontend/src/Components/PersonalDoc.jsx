import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import authdoc from '../auth/authdoc'

function PersonalDoc({ data }) {
  const [alldoc,Setalldoc]=useState([])
  const doc = [{ id: 11, name: "Create new", img: "" }, { id: 1, name: "Letter", img: "/coverimage-1.png" }, { id: 2, name: "Resume", img: "/coverimage-2.png" }, { id: 3, name: "Resume Template 2", img: "/coverimage-3.png" }, { id: 4, name: "Project Prosposal", img: "/coverimage-4.png" },
  { id: 5, name: "Brochure", img: "/coverimage-5.png" }, { id: 6, name: "Report", img: "/coverimage-6.png" }]
  
  const createdoc = async() =>{
    const createdoc = await authdoc.createdoc({docname:"new document"})
    console.log(createdoc);
    if (createdoc) {
      localStorage.setItem("Doc",createdoc.data.data._id)
    }
  }

  useEffect(()=>{
    authdoc.alldoc().then((data)=>{
      console.log(data.data.data);
      Setalldoc(data.data.data)
    })
    .catch((err)=>{
      console.log(err);
    })
  },[])

  return (
    <div>
      <h1 className='ml-18 text-2xl mt-8 text-blue-900'>Create New {data} Document</h1>
      <div>
        <div className='grid grid-cols-7 text-center mt-5 w-353 ml-20 gap-y-15 gap-x-7'>
          {doc.map((item) => (
            <Link to={`/dashboard/workingdoc/${item.id}`} key={item.id}>
              <div onClick={createdoc}>
                <div className='border'>
                  {!item.img ? <div className="h-60 w-50 flex items-center justify-center"><p className="text-4xl mr-4">+</p></div> :
                    <img src={item.img} className='h-60 w-50' />}
                </div>
                <h1 className='ml-4'>{item.name}</h1>
              </div>
            </Link>
          ))}
        </div>
        <div className='mb-22'>
          <h1 className='text-xl ml-17 mt-5 mb-5'>All {data} Document</h1>
          <div className='-ml-10'>
            {alldoc?.map((item,index) => (
              <Link to={`/dashboard/workingdoc/${item._id}`} key={item._id}>
                <div className='flex justify-around'>
                  <div className='flex mr-190 mt-2 space-x-1'>
                    <p className='text-xl mt-[1px]'>{index+=1}.</p>
                    <img src="/featureimg1.png" className='w-10 h-10 ml-3' />
                    <p className='mt-[3px] ml-3'>{item.Docname}</p>
                  </div>
                  <p>{item.createdAt.split("T")[0]}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default PersonalDoc
