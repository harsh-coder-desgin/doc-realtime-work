import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Input, Button } from './index.js'

function Signup() {
    const navigate = useNavigate()
    return (
        <div className="min-h-screen flex items-center justify-center px-4">
            <div className="w-full max-w-md bg-white shadow-md p-8 border border-blue-900">
                <h2 className="text-2xl font-semibold text-center text-gray-800 mb-15">
                    Sign up 
                </h2>
                <form className="space-y-4">
                    <Input label="Username" placeholder="Enter your Username" className='px-3 py-3 mt-2 bg-white text-black outline-none duration-200 border border-blue-900 w-full'/>
                    <Input label="Email" placeholder="Enter your email" type="email" className='px-3 py-3 mt-2 bg-white text-black outline-none duration-200 border border-blue-900 w-full'/>
                    <Input label="Password" type="password" placeholder="Enter your password" className='px-3 mt-2 py-3 bg-white text-black outline-none duration-200 border border-blue-900 w-full'/>
                    <Button type="submit" className="w-full bg-blue-900 border border-blue-900 py-3 text-white hover:bg-white hover:text-blue-900">
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
