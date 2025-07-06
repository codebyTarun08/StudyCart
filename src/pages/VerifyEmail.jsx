import React, { useState,useEffect } from 'react'
import { useSelector,useDispatch } from 'react-redux';
//npm i react-otp-input
import OTPInput from 'react-otp-input';
import { RxCountdownTimer } from "react-icons/rx";
import { sendOtp, signUp } from '../services/operations/authAPI';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
const VerifyEmail = () => {
    const {signupData,loading} = useSelector((state)=>(state.auth))
    const [otp,setOtp] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    useEffect(()=>{
         if(!signupData){
            navigate('/signup')
         }
    },[]);
    const submitHandler=(event)=>{
        event.preventDefault();
        
        const {
            accountType,
            firstName,
            lastName,
            email,
            password,
            confirmPassword
        } = signupData;
        dispatch(signUp(accountType,firstName,lastName,email,password,confirmPassword ,otp,navigate))
    }
  return (
    <div className='text-white flex justify-center items-center min-h-[calc(100vh-3.5rem)] '>
        {
            loading?(
                <div className='flex justify-content items-content w-screen h-screen spinner'></div>
            ):(
                <div
                className='w-[500px] flex flex-col space-y-9 p-8 transition-all duration-300 hover:bg-richblue-700/50 Hover:backdrop-blur-xl hover:rounded-xl'>
                    <div className='flex flex-col text-center gap-1'>
                    <h1>Verify Email</h1>
                    <p>A verification code has been sent to you. Enter the code below</p>
                    </div>

                    <form
                    onSubmit={submitHandler}
                    className='flex flex-col' 
                    >
                        <OTPInput
                         inputStyle={{width:"40px" , height:"50px" , borderRadius: "5px", borderBottom: "1px solid" , borderColor: "#6E727F"}}
                         value={otp}
                         onChange={setOtp}
                         numInputs={6}
                         renderSeparator={<span>.........</span>}
                         renderInput={(props)=><input {...props} className='bg-richblack-800'
                         /> }
                        />

                        <button
                        type='submit'
                        className='mt-6 transition-all duration-200 hover:scale-95 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900'>
                            Verify Email
                        </button>
                    </form>
                    <div className='flex justify-between'>
                        <Link to="/login" className='flex gap-1 items-center'>
                                <BiArrowBack />
                                <p className='font-inter text-white items-center text-sm hover:text-blue-100 transition-all duration-200 hover:scale-100'>Back to login</p>
                        </Link>
                        <button 
                        onClick={()=>dispatch(sendOtp(signupData.email , navigate))}
                        className='text-blue-300 flex items-center gap-2'>
                            <RxCountdownTimer />
                            Resend it
                        </button>
                    </div>
                </div>
            )
        }
    </div>
  )
}

export default VerifyEmail