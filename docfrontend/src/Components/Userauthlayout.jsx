import React, { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom';
import authuser from '../auth/authuser'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { userLogin as authlogin } from '../store/userAuthslice'

export default function userauthlayout({ children }) {
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();
    const users = useSelector(state => state.userAuth.users)

    const dispatch = useDispatch()
    const location = useLocation();

    useEffect(() => {
        authuser.verifyuserauth()
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
                            await authuser.verifyuserauth()
                            navigate("/dashboard")
                        } else {
                            navigate("/login");
                        }
                    } catch {
                        if (location.pathname === "/login") {
                            navigate("/login");
                        } else {
                            navigate("/signup");
                        }
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
