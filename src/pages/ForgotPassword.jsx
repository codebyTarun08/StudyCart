import React, { useState } from 'react'
import { useDispatch, useSelector } from "react-redux"
import {BiArrowBack} from "react-icons/bi"
import { Link } from 'react-router-dom'
import { getPasswordResetToken } from '../services/operations/authAPI'
const ForgotPassword = () => {
    const [emailSent, setEmailSent] = useState(false);
    const [email, setEmail] = useState("");
    const dispatch = useDispatch();
    const {loading} = useSelector((state) => state.auth);

    const submitHandler = (event)=>{
        event.preventDefault();
        dispatch(getPasswordResetToken(email,setEmailSent))
    }
    return (
        <div className='text-white flex justify-center items-center min-h-[calc(100vh-3.5rem)] '>
            {
                loading ? (
                    <div className="spinner"></div>
                ) : (
                    <div className='w-[500px] flex flex-col space-y-9 p-8 transition-all duration-300 hover:bg-richblue-700/50 Hover:backdrop-blur-xl hover:rounded-xl'>
                        <div className='flex flex-col gap-3'>
                            <h1 className='text-3xl'>
                                {
                                    !emailSent ? "Reset Your Password" : "Check Your Email"
                                }
                            </h1>
                            <p className='text-base text-richblack-100'>
                                {
                                    !emailSent ? "Have no fear. We’ll email you instructions to reset your password. If you dont have access to your email we can try account recovery" : `We have sent the reset email to ${email}`
                                }
                            </p>
                        </div>
                        <form
                        onSubmit={submitHandler}
                        >
                            {
                                !emailSent && (
                                    <label className='flex flex-col gap-2'>
                                        <p className='text-sm text-richblack-100'>Email Address<sup className='text-pink-300'>*</sup></p>
                                        <input
                                        required
                                        type='email'
                                        name='email'
                                        placeholder="Enter Email Address"
                                        onChange={(e)=>{setEmail(e.target.value)}}
                                        className="bg-richblack-800 rounded-xl w-full p-3 text-richblack-5
                        border-b border-richblack-100/35"
                                        />
                                    </label>
                                    
                                )
                            }
                            <button 
                            type='submit'
                            className='mt-6 transition-all duration-200 hover:scale-95 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900'>
                                {
                                    !emailSent ? "Reset Password" : "Resend Email"
                                }
                            </button>
                        </form>
                        <div>
                            <Link to="login">
                                 <p className='flex gap-1 font-inter text-white items-center text-sm hover:text-blue-100 transition-all duration-200 hover:scale-100'>
                                    <BiArrowBack />
                                    Back to login
                                 </p>
                            </Link>
                        </div>
                    </div>
                )
            }

        </div>
    )
}

export default ForgotPassword