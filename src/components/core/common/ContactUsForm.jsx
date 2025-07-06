import React, { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { apiConnector } from '../../../services/apiConnector';
import { setLoading } from '../../../slices/authSlice';
import { contactUsEndpoints } from '../../../services/apis';
import countryCode from '../../../data/countrycode.json'
const ContactUsForm = () => {
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors, isSubmitSuccessful }
    } = useForm();

    const submitContactForm = async (data) => {
        console.log("DATA: ", data)
        try {
            setLoading(true)
            const response = await apiConnector("POST", contactUsEndpoints.CONTACT_US_API, data);
            console.log("RESPONSE: ", response)
        } catch (error) {
            console.log("ERROR: ", error.message)
            setLoading(false)
        }
    }

    useEffect(() => {
        if (isSubmitSuccessful) {
            reset({
                email: "",
                firstName: "",
                lastName: "",
                message: "",
                phoneNo: ""
            })
        }
    }, [reset, isSubmitSuccessful])
    return (
        <form
            onSubmit={handleSubmit(submitContactForm)}>
            <div className='flex flex-col gap-5'>
                <div className='flex gap-5'>
                    <div className='flex flex-col  w-[50%]'>
                        <label htmlFor='firstName' className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>First Name</label>
                        <input
                            type='text'
                            name='firstName'
                            id='firstName'
                            placeholder='Enter First Name'
                            className='bg-richblack-800 rounded-xl w-auto p-3 text-richblack-5
                            border-b border-richblack-100/35 text-sm'
                            {...register("firstName", { required: true })}
                        />
                        {
                            errors.firstName && (
                                <span>
                                    Please Enter your Name
                                </span>
                            )
                        }
                    </div>
                    <div className='flex flex-col w-[50%]'>
                        <label htmlFor='lastName' className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Last Name</label>
                        <input
                            type='text'
                            name='lastName'
                            id='lastName'
                            className='bg-richblack-800 rounded-xl w-auto p-3 text-richblack-5
                            border-b border-richblack-100/35 text-sm'
                            placeholder='Enter Last Name'
                            {...register("lastName")}
                        />
                    </div>
                </div>
                <div>
                    <label htmlFor='phoneNumber' className='text-richblack-25'>Phone Number</label>
                    <div className='flex gap-x-6'>
                        <select
                            name='dropdown'
                            id='dropdown '
                            {...register("countryCode", { required: true })}
                            className='bg-richblack-800 w-20 py-2 px-3 rounded-lg border-b-[1px] border-richblack-100/30 transition-all duration-200 text-richblack-50'>
                            {
                                countryCode.map((option, index) => (
                                    <option className='bg-richblack-900 scroll-smooth' key={index} >

                                        {option.code} -  {option.country}

                                    </option>
                                ))
                            }
                        </select>

                        <input
                            type="number"
                            name="phoneNumber"
                            id="phoneNumber"
                            placeholder="Enter Phone Number"
                            className="bg-richblack-800 rounded-xl w-full text-sm p-3 text-richblack-5 border-b border-richblack-100/35 appearance-none [&::-webkit-inner-spin-button]:hidden [&::-webkit-outer-spin-button]:hidden [&::-moz-appearance]:textfield"
                            {...register("phoneNumber", 
                                { 
                                required: {value:true,message:"Please Enter Your Phone Number"},
                                maxLength:{value:10,message:"Invalid Phone Number"},
                                minLength:{value:8,message:"Invalid Phone Number"}
                               }
                              )
                            }
                        />
                        {
                            errors.phoneNumber && (
                                <span>
                                    {errors.phoneNumber.message}
                                </span>
                            )
                        }
                    </div>
                </div>

                <div className='flex flex-col'>
                    <label htmlFor='email' className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Email Address</label>
                    <input
                        type='email'
                        name='email'
                        id='email'
                        placeholder='Enter Email Address'
                        className='bg-richblack-800 rounded-xl w-full p-3 text-richblack-5
                            border-b border-richblack-100/35 text-sm'
                        {...register("email", { required: true })}
                    />
                    {
                        errors.email && (
                            <span>
                                Please Enter your Email
                            </span>
                        )
                    }
                </div>

                <div className='flex flex-col'>
                    <label htmlFor='message' className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Message</label>
                    <textarea
                        rows={5}
                        type='text'
                        name='message'
                        id='message'
                        placeholder='Write your Message Here...'
                        className='bg-richblack-800 rounded-xl w-full p-3 text-richblack-5
                            border-b border-richblack-100/35 text-sm'
                        {...register("message", { required: true })}
                    />
                    {
                        errors.message && (
                            <span>
                                Please Enter your Message
                            </span>
                        )
                    }
                </div>

                <button
                    type="submit"
                    className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900">
                    Send Message
                </button>
            </div>
        </form>
   )
}

export default ContactUsForm