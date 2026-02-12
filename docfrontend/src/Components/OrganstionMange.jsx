import React, { useEffect, useState } from 'react'
import { Button, PersonalDoc } from '../Components/index.js'
import { useOutletContext, useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import authdoc from '../auth/authdoc.js'

function OrganstionMange() {
    const { id } = useParams();
    const { data } = useOutletContext()
    const navigate = useNavigate()
    const users = useSelector(state => state.userAuth.users)
    // console.log(users);
    const [alldoc, Setalldoc] = useState([])
    const [sendemail, SetSendemail] = useState("")
    const [senddocid, SetSenddocid] = useState("")
    const [alluers, Setalluers] = useState([])
    const [showdoc, SetShowdoc] = useState(false)
    const [invitedall, Setinvitedall] = useState([])

    const handleinvite = async() =>{
        const getdefaultdoc = alldoc.find(item => (item._id == senddocid))
        const sendinvite = await authdoc.createinvite({invitedemail:sendemail,
            docname:getdefaultdoc?.Docname || alldoc[0].Docname,docid:senddocid || alldoc[0]._id,orgid:id})
        if (sendinvite) {
            SetSendemail("")
            SetSenddocid("")
            const getinvite = await authdoc.getinvite(id)
            Setalluers(getinvite.data.data)
        }    
    }

    const hanlderesofinvite = async(ID,userresponse)=>{
        const invitedresuser = await authdoc.responseofinvite({inviteID:ID,acceptorreject:userresponse})
        console.log(invitedresuser);
    }

    const handledeleteorg = async()=>{
        const deleteorg = await authdoc.orgnamedelete(id)
        console.log(deleteorg);
        if (deleteorg) {
            navigate('/dashboard')
        }
    }

    useEffect(() => {
        authdoc.orgnamedocget(id).then((data) => {
            Setalldoc(data.data.data)
        })
            .catch((err) => {
                console.log(err);
            })
            //skip test
        authdoc.getinvite(id).then((data) => {
            console.log(data);
            Setalluers(data.data.data)
        })
            .catch((err) => {
                console.log(err);
            })
        authdoc.getorgname({id:id}).then((data) => {
            if (data.data.createuserid === users._id) {
                SetShowdoc(true)
              }
            })
              .catch((err) => {
                SetShowdoc(false)
                console.log(err);
            })
            //skip test
        authdoc.userinviteget().then((data) => {
            // console.log(data)
            Setinvitedall(data.data.data)
            })
              .catch((err) => {
                console.log(err);
            })    
    }, [])

    return (
        <div>
            {data === "Personal" ? <PersonalDoc data={data} />
                : <div className="p-10 max-w-6xl">
                  {showdoc === true &&  <div className="mb-10">
                        <h1 className="text-xl font-medium mb-2">Send Invite</h1>
                        <label className="text-sm text-gray-600 block mb-1">
                            Enter email:
                        </label>
                        <textarea onChange={(e)=>SetSendemail(e.target.value)} value={sendemail} 
                        className="w-[340px] h-[90px] border border-blue-900 p-2 outline-none" />
                        <div className='mt-2 mb-2'>
                            <select onClick={(e)=>SetSenddocid(e.target.value)} className="block w-30 px-2 py-1 mt-2 border border-gray-300 
                                    focus:outline-none focus:ring-blue-500 focus:border-gray-500 sm:text-sm">
                                {alldoc?.map((item, index) => (
                                    <option key={index} value={item._id}>
                                        {item.Docname}
                                    </option>
                                    ))}
                            </select>
                        </div>
                        <Button onClick={handleinvite} className="bg-blue-800 text-white text-sm px-4 py-2 rounded hover:bg-blue-900">
                            Send Invite
                        </Button>
                    </div>}
                   {showdoc === true && <div className="mb-12">
                        <p className="text-indigo-500 text-xl mb-4 cursor-pointer">All send invite people</p>
                        <div className="grid grid-cols-4 text-sm font-medium mb-3">
                            <p>Email</p>
                            <p>Send at</p>
                            <p>Accepted or reject</p>
                        </div>
                        {alluers?.map((data) => (
                            <div key={data._id} className="grid grid-cols-4 text-sm mb-2">
                                <p>{data.invitedemail}</p>
                                <p>  {new Date(data.createdAt).toLocaleString()}</p>
                                {data.invitedaccpetreject === true && <p className="text-green-600">Accept</p>}
                                {data.invitedaccpetreject === false && <p className="text-red-600">Reject</p>}
                                {data.invitedaccpetreject === null && <p className="text-blue-700">Pending</p>}
                            </div>
                        ))}
                    </div>}
                    {showdoc === false && <div className="mb-12">
                        <h1 className="text-lg font-medium mb-3">Accept Invite</h1>
                        <div className="bg-blue-100 p-4">
                            <div className="grid grid-cols-4 bg-blue-800 text-white text-sm px-3 py-2">
                                <p>Name</p>
                                <p>Email</p>
                                <p>send at</p>
                                <p>Accepted or reject</p>
                            </div>
                            {invitedall?.map((data) => (
                                <div key={data._id} className="grid grid-cols-4 items-center text-sm px-3 py-2">
                                    <p>{data?.createrdoc?.username}</p>
                                    <p>{data.senderemail}</p>
                                    <p>{data.CreateAt}</p>
                                    <div className="flex gap-2">
                                        <Button onClick={()=>hanlderesofinvite(data._id,true)} className="bg-green-600 text-white px-2 py-1 rounded text-xs hover:bg-green-700">
                                            Accept
                                        </Button>
                                        <Button onClick={()=>hanlderesofinvite(data._id,false)} className="bg-red-600 text-white px-2 py-1 rounded text-xs hover:bg-red-700">
                                            Reject
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>}
                   {showdoc === true && <div>
                        <h1 className="text-lg font-medium mb-2">Delete this organisation</h1>
                        <Button onClick={handledeleteorg} className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                            Delete
                        </Button>
                    </div>}
                </div>}
        </div>
    )
}

export default OrganstionMange
