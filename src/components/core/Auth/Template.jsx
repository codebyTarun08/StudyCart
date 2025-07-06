import React from 'react'
import LoginForm from './LoginForm'
import {FcGoogle} from 'react-icons/fc'
import Frame from '../../../assets/Images/frame.png'
import SignupForm from './SignupForm'
import { useSelector } from 'react-redux'
const Template = ({ title, desc1, desc2, formType, image }) => {
    const {loading} = useSelector((state)=>state.auth)
    return (
        <>
        {
        loading ? (
            <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
               <div className="flex justify-center items-center w-screen h-screen spinner"></div>
            </div>
          ) : (
        <div className="flex flex-col-reverse md:flex-row gap-y-12 md:gap-x-12 justify-between text-richblack-100 w-11/12 max-w-maxContent mx-auto py-10 md:py-20">
            <div className="flex flex-col gap-5 max-w-[450px] w-full mx-auto md:mx-0">
                <div className="flex flex-col">
                    <p className="text-3xl font-bold font-inter">{title}</p>
                    <p className="">
                        {desc1} <span className="text-lg font-edu-sa text-blue-100">{desc2}</span>
                    </p>
                </div>

                <div>
                    {
                        formType ? (<LoginForm />) : (<SignupForm />)
                    }
                </div>

                <div className="flex w-full items-center my-4 gap-x-2">
                    <div className="h-[1px] w-full bg-richblack-700"></div>
                    <p className="text-richblack-700 font-medium leading-[1.375rem]">OR</p>
                    <div className="h-[1px] w-full bg-richblack-700"></div>
                </div>

                <button className="w-full flex items-center justify-center rounded-[8px] font-medium text-richblack-100 border-richblack-700 border px-[12px] py-[8px] gap-x-2 mt-6">
                    <FcGoogle />
                    Sign up with Google
                </button>
            </div>
            <div className="relative w-full max-w-[450px] mx-auto md:mx-0 mb-8 md:mb-0">
                <img
                    src={image}
                    alt="LoginImg"
                    className="absolute lg:-top-4 lg:right-4 w-[60%] md:w-auto"
                />
                <img
                    src={Frame}
                    alt="Frame"
                    className="w-[70%] lg:w-full"
                />
            </div>
        </div>
       )
      }
       </>
    )
}

export default Template