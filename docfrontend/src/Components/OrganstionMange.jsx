import React from 'react'
import { Button, PersonalDoc } from '../Components/index.js'
import { useOutletContext } from 'react-router-dom'

function OrganstionMange() {
    const { data } = useOutletContext()
    const allusers = [{ id: 1, email: "123&gmail.com", name: "user1", invited: "accepted" },
    { id: 2, email: "xyz&gmail.com", name: "user2", invited: "accepted" }, { id: 3, email: "abc&gmail.com", name: "user3", invited: "Deline" }]
    const invitedall = [{ id: 1, emails: "123@gmail.com", names: "user1" }, { id: 2, emails: "123@gmail.com", names: "user1" }, { id: 3, emails: "123@gmail.com", names: "user1" }]
    return (
        <div>
            { data === "Personal" ? <PersonalDoc data={data} />
                    : <div className="p-10 max-w-6xl">
                        <div className="mb-10">
                            <h1 className="text-xl font-medium mb-2">Send Invite</h1>
                            <label className="text-sm text-gray-600 block mb-1">
                                Enter email:
                            </label>
                            <textarea className="w-[340px] h-[90px] border border-blue-900 p-2 outline-none"/>
                            <div>
                            <Button className="bg-blue-800 text-white text-sm px-3 py-1 rounded hover:bg-blue-900">
                                Send Invite
                            </Button>
                            </div>
                        </div>
                        <div className="mb-12">
                            <p className="text-indigo-500 text-xl mb-4 cursor-pointer">All send invite people</p>
                            <div className="grid grid-cols-4 text-sm font-medium mb-3">
                                <p>Name</p>
                                <p>Email</p>
                                <p>Send at</p>
                                <p>Accepted or reject</p>
                            </div>
                            {allusers.map((data) => (
                                <div key={data.id} className="grid grid-cols-4 text-sm mb-2">
                                    <p>{data.name}</p>
                                    <p>{data.email}</p>
                                    <p>22/2/2022</p>
                                    <p className="text-gray-600">{data.invited}</p>
                                </div>
                            ))}
                        </div>
                        <div className="mb-12">
                            <h1 className="text-lg font-medium mb-3">Accept Invite</h1>
                            <div className="bg-blue-100 p-4">
                                <div className="grid grid-cols-4 bg-blue-800 text-white text-sm px-3 py-2">
                                    <p>Name</p>
                                    <p>Email</p>
                                    <p>send at</p>
                                </div>
                                {invitedall.map((data) => (
                                    <div key={data.id} className="grid grid-cols-4 items-center text-sm px-3 py-2">
                                        <p>{data.names}</p>
                                        <p>{data.emails}</p>
                                        <p>{data.sentAt}</p>
                                        <div className="flex gap-2">
                                            <Button className="bg-green-600 text-white px-2 py-1 rounded text-xs hover:bg-green-700">
                                                Accept
                                            </Button>
                                            <Button className="bg-red-600 text-white px-2 py-1 rounded text-xs hover:bg-red-700">
                                                Reject
                                            </Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div>
                            <h1 className="text-lg font-medium mb-2">Delete this organisation</h1>
                            <Button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">
                                Delete
                            </Button>
                        </div>
                    </div>}
        </div>
    )
}

export default OrganstionMange
