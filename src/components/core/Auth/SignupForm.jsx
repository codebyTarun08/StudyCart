import React, { useState } from 'react'
import { AiFillEyeInvisible, AiFillEye } from 'react-icons/ai'
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {ACCOUNT_TYPE} from '../../../utils/constants'
import {toast} from 'react-hot-toast'
import {sendOtp} from "../../../services/operations/authAPI"
import {setSignupData} from '../../../slices/authSlice'
const SignupForm = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [accountType, setAccountType] = useState(ACCOUNT_TYPE.STUDENT);

    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        accountType: ""
    });

    const changeHandler = (event) => {
        setFormData((prevFormData) => {
            // console.log(event.target.value)
            return {
                ...prevFormData,
                [event.target.name]: event.target.value
            }
        });
    }

    const [showPassword, setShowPassword] = useState(false);

    const [cnfShowPassword, setcnfShowPassword] = useState(false);

    const { firstName, lastName, email, password, confirmPassword } = formData;

    const submitHandler = (event)=>{
        console.log("Handler Called")
        event.preventDefault();
        if (password !== confirmPassword) {
            toast.error("Passwords do not match");
            return;
        }
        const signupData={
            ...formData,
            accountType
        }
        console.log(signupData)
        // Setting signup data to state
        // To be used after otp verification
        dispatch(setSignupData(signupData));
        // Send OTP to user for verification
        dispatch(sendOtp(formData.email, navigate));
            // Reset
        setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
        accountType:""
       });
       setAccountType(ACCOUNT_TYPE.STUDENT)
       console.log("Handler Called end")
    }

    return (
        <div>
            <div className='flex justify-between  bg-richblack-800 w-fit rounded-full border-b-[1px] border-richblack-100/30 py-1'>
                <button
                    onClick={() => setAccountType(ACCOUNT_TYPE.STUDENT)}
                    className={`${accountType === ACCOUNT_TYPE.STUDENT ? "bg-richblack-900 text-richblack-50" : "text-richblack-200"} transition-all duration-200 rounded-full px-5 py-3`}>Student</button>
                <button
                    onClick={() => setAccountType(ACCOUNT_TYPE.INSTRUCTOR)}
                    className={`${accountType === ACCOUNT_TYPE.INSTRUCTOR ? "bg-richblack-900 text-richblack-50" : "text-richblack-200"} transition-all duration-200 rounded-full px-5 py-3`}>Instructor</button>
            </div>
            {/* <div className="flex bg-richblack-800 p-1 gap-x-1 rounded-full max-w-max mt-4">
                <button
                    onClick={() => setAccountType("student")}
                    className={`${accountType === "student"
                        ? "bg-richblack-900 text-richblack-5"
                        : "bg-transparent text-richblack-200 "
                        } py-2 px-5 rounded-full transition-all`}
                >
                    Student
                </button>
                <button
                    onClick={() => setAccountType("instructor")}
                    className={`${accountType === "instructor"
                        ? "bg-richblack-900 text-richblack-5"
                        : "bg-transparent text-richblack-200 "
                        } py-2 px-5 rounded-full transition-all`}
                >
                    Instructor
                </button>
            </div> */}
            <form 
            onSubmit={submitHandler}
            className='flex flex-col w-full gap-y-4 mt-6'>
                <div className='flex gap-x-6'>
                    <label>
                        <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>First Name<sup className='text-pink-200'>*</sup></p>
                        <input
                            required
                            name='firstName'
                            type='text'
                            value={formData.firstName}
                            placeholder='Enter First Name Here'
                            onChange={changeHandler}
                            className='bg-richblack-800 rounded-xl w-full p-3 text-richblack-5
                            border-b border-richblack-100/35'
                        />
                    </label>
                    <label>
                        <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Last Name<sup className='text-pink-200'>*</sup></p>
                        <input
                            required
                            name='lastName'
                            type='text'
                            value={formData.lastName}
                            placeholder='Enter Last Name Here'
                            onChange={changeHandler}
                            className='bg-richblack-800 rounded-xl w-full p-3 text-richblack-5
                            border-b border-richblack-100/35'
                        />
                    </label>
                </div>
                <label>
                    <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Email Address<sup className='text-pink-200'>*</sup></p>
                    <input
                        required
                        type='email'
                        name='email'
                        value={formData.email}
                        placeholder='Enter Email Here'
                        onChange={changeHandler}
                        className='bg-richblack-800 rounded-xl w-full p-3 text-richblack-5
                        border-b border-richblack-100/35'
                    />
                </label>

                {/* <div>
                    <label>
                        <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Email Address<sup className='text-pink-200'>*</sup></p>
                        <div className='flex gap-x-6'>

                            <select className='bg-richblack-800 w-20 py-2 px-3 rounded-lg border-b-[1px] border-richblack-100/30 transition-all duration-200'>
                                {
                                    countryCode.map((option, index) => (
                                        (
                                            <option className='bg-richblack-900 ' key={index} onClick={() => { setCounteryNumber(option.code) }} >
                                                {
                                                    option.code
                                                }
                                            </option>
                                        )
                                    )
                                    )
                                }
                            </select>

                            <input
                                required
                                type="number"
                                name="phoneNumber"
                                value={formData.phoneNumber}
                                placeholder="Enter Phone Number"
                                onChange={changeHandler}
                                className="bg-richblack-800 rounded-xl w-full p-3 text-richblack-5 border-b border-richblack-100/35 appearance-none [&::-webkit-inner-spin-button]:hidden [&::-webkit-outer-spin-button]:hidden [&::-moz-appearance]:textfield"
                            />
                        </div>

                    </label>

                </div> */}

                <div className='flex justify-between'>
                    <label className='relative'>
                        <p className='text-sm text-richblack-5 mb-1 leading-[1.375rem]'>Create Password<sup>*</sup></p>
                        <input
                            required
                            type={!showPassword ? 'password' : 'text'}
                            name='password'
                            placeholder='Enter password here'
                            value={formData.password}
                            onChange={changeHandler}
                            className="bg-richblack-800 rounded-xl w-full p-3 text-richblack-5"
                        />
                        <span
                            className="absolute right-3 top-[45px] cursor-pointer z-10"
                            onClick={() => { setShowPassword(!showPassword) }}>
                            {
                                showPassword ? <AiFillEyeInvisible /> : <AiFillEye />
                            }
                        </span>
                    </label>

                    <label className='relative'>
                        <p className='text-sm text-richblack-5 mb-1 leading-[1.375rem]'>Confirm password<sup className='text-pink-200'>*</sup></p>
                        <input
                            required
                            type={!cnfShowPassword ? 'password' : 'text'}
                            name='confirmPassword'
                            placeholder='Enter password here'
                            value={formData.confirmPassword}
                            onChange={changeHandler}
                            className="bg-richblack-800 rounded-xl w-full p-3 text-richblack-5"
                        />
                        <span
                            className="absolute right-3 top-[45px] cursor-pointer z-10"
                            onClick={() => { setcnfShowPassword(!cnfShowPassword) }}>
                            {
                                cnfShowPassword ? <AiFillEyeInvisible /> : <AiFillEye />
                            }
                        </span>
                    </label>

                </div>
                <button 
                  type="submit"
                  className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900">
                  Submit
                </button>
            </form>

        </div>
    )

}

export default SignupForm
