import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Input, Button } from './index.js'
import { useForm } from "react-hook-form"
import { useDispatch } from 'react-redux'
import { userLogin as authlogin } from '../store/userAuthslice.js'
import authuser from '../auth/authuser.js'

function Login() {
    const navigate = useNavigate()
    const { register, handleSubmit } = useForm()
    const dispatch = useDispatch()
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("")

    const login = async (data) => {
        setError("")
        try {
            const session = await authuser.login(data)
            if (session) {
                const users = await authuser.getuser()
                if (users) {
                    dispatch(authlogin(users.data))
                }
                navigate('/dashboard')
            }
        } catch (error) {
            setError(error.response.data.message)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white shadow-md p-8 border border-blue-900">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-15">
                    Login
                </h2>
                {error && (
                    <p className="text-red-500 text-base sm:text-lg text-center mb-4">
                        {error}
                    </p>
                )}
                <form onSubmit={handleSubmit(login)} className="space-y-7">
                    <Input label="Email"
                        {...register("email", {
                            required: true,
                            validate: {
                                matchPatern: (value) =>
                                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) ||
                                    "Invalid email address",
                            },
                        })}
                        placeholder="Enter your email" type="email" className='px-3 py-3 mt-2 bg-white text-black outline-none duration-200 border border-blue-900 w-full' />
                    <Input label="Password"  {...register("password", { required: true })}
                        type="password" placeholder="Enter your password" 
                        className='px-3 mt-2 py-3 bg-white text-black outline-none duration-200 border border-blue-900 w-full' />
                    <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute right-144 -mt-16 mr-3">
                        {showPassword ? (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12s3.75-7.5 9.75-7.5S21.75 12 21.75 12s-3.75 7.5-9.75 7.5S2.25 12 2.25 12z" />
                                <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            </svg>
                        ) : (
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 002.25 12s3.75 7.5 9.75 7.5a9.72 9.72 0 004.65-1.223M6.228 6.228A9.72 9.72 0 0111.25 4.5c6 0 9.75 7.5 9.75 7.5a10.45 10.45 0 01-2.221 3.772M6.228 6.228L3 3m3.228 3.228L3 3m0 0l18 18" />
                            </svg>
                        )}
                    </button>
                    <Button type="submit" className="w-full bg-blue-900 border border-blue-900 py-3 text-white hover:bg-white hover:text-blue-900">
                        Login
                    </Button>
                    <p className="text-center text-gray-600 mb-6 text-sm">
                        Don’t have an account?{" "}
                        <Link to="/signup" className="text-blue-600 hover:underline">
                            Sign up
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Login
