import React from 'react'
import { useDispatch } from 'react-redux'
import { userLogout } from "../store/userAuthslice"
import { useNavigate } from 'react-router-dom'
import authuser from '../auth/authuser'
import { Button } from './index.js'

function Logoutbtn() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authuser.logout()
            .then(() => { dispatch(userLogout()) })
            .catch((error) => { console.log("❌ Error User Logout:", error) })
        navigate("/")
    }
    return (
        <Button onClick={logoutHandler}
            textColor='text-blue-900' bgColor='bg-white'
            className="hover:cursor-pointer px-6 py-2 bg-blue-900 rounded-full border border-blue-900 hover:bg-blue-50">
            Logout
        </Button>
    )
}


export default Logoutbtn
