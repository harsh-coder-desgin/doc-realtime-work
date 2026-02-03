import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import authuser from '../auth/authuser'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { userLogin as authlogin } from '../store/userAuthslice'

export default function userauthlayout() {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const users = useSelector(state => state.userAuth.users)
    // console.log(users);

    const dispatch = useDispatch()
    const location = useLocation();
    // console.log(location);

    useEffect(() => {
        authuser.verifyauth()
            .then((data) => {
                if (users === null) {
                    dispatch(authlogin(data.data))
                }
                if (
                    location.pathname === "/login" ||
                    location.pathname === "/signup" 
                ) {
                    navigate("/dashboard");
                }
            })
            .catch(async (err) => {
                if (err.response?.status === 401) {
                    try {
                        const newAccessToken = await authuser.refreshtoken()
                        if (newAccessToken) {
                            await authuser.verifyauth();
                            navigate("/dashboard")
                        } else {
                            navigate("/login");
                        }
                    } catch {
                        console.log("error");
                    }
                }
            })
            .finally(() => {
                setLoading(false)
            });
    }, []);
    if (loading) return null
    return children;
}
