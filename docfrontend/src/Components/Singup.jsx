import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Input, Button } from './index.js'
import { useForm } from "react-hook-form"
import { useDispatch } from 'react-redux'
import { userLogin as authlogin } from '../store/userAuthslice.js'
import authuser from "../auth/authuser"

function Signup() {
    const navigate = useNavigate()
    const { register, handleSubmit,formState: { errors }  } = useForm()
    const dispatch = useDispatch()
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("")

    const create = async (data) => {
        setError("")
        try {
            const res = await authuser.register(data)
            if (res) {
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
                    Sign up
                </h2>
                {error && (
                    <p className="text-red-500 text-base sm:text-lg text-center mb-4">
                        {error}
                    </p>
                )}
                <form onSubmit={handleSubmit(create)} className="space-y-4">
                    <Input label="Username" err={errors?.username?.message}
                        {...register("username", {
                            required: "Enter your Username",
                            maxLength: {
                                value: 30,
                                message: "Username cannot exceed 30 characters",
                            }, minLength: { value: 3, message: "Username cannot less than 3 characters", }
                        })}
                        placeholder="Enter your Username"
                        className={`${errors.username ? "border-pink-500 text-pink-600" : "border-black"} px-3 py-3 mt-2 bg-white text-black outline-none duration-200 border border-blue-900 w-full`} />
                    <Input label="Email" err={errors?.email?.message}
                        {...register("email", {
                            required: "Enter your email",
                            validate: {
                                matchPatern: (value) =>
                                    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value) ||
                                    "Invalid email address",
                            },
                        })}
                        placeholder="Enter your email" type="email" className={`${errors.email ? "border-pink-500 text-pink-600" : "border-black"} px-3 py-3 mt-2 bg-white text-black outline-none duration-200 border border-blue-900 w-full`} />
                    <Input label="Password" err={errors?.password?.message}
                        {...register("password", {
                            required: "Enter your password",
                            validate: {
                                matchPatern: (value) =>
                                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(value) || 
                                "Password needs 8 length upper, lower, digit & symbol"
                            },
                        })}
                        type={showPassword ? "text" : "password"} placeholder="Enter your password"
                        className={`${errors.password ? "border-pink-500 text-pink-600" : "border-black"} px-3 mt-2 py-3 bg-white text-black outline-none duration-200 border border-blue-900 w-full`} />
                    <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className={`${errors.password?.message ? "-mt-19" : "-mt-13"} absolute right-144 mr-3`}>
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
                    <Button type="submit" className="hover:cursor-pointer w-full bg-blue-900 border border-blue-900 py-3 text-white hover:bg-white hover:text-blue-900">
                        Create Account
                    </Button>
                    <p className="text-center text-gray-600 mb-6 text-sm">
                        Already have an account?{" "}
                        <Link to="/login" className="text-blue-600 hover:underline">
                            Log in
                        </Link>
                    </p>
                </form>
            </div>
        </div>
    )
}

export default Signup
