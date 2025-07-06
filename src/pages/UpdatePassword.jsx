import React, { useState } from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom';
import { AiFillEyeInvisible,AiFillEye } from 'react-icons/ai';
import { BiArrowBack } from 'react-icons/bi';
import { resetPassword } from '../services/operations/authAPI';
import { Link } from 'react-router-dom';
const UpdatePassword = () => {
    const location = useLocation();
    const dispatch = useDispatch();
    const [formData,setFormData]=useState({
        password:'',
        confirmPassword:''
    });

    const { loading } = useSelector((state) => state.auth);
    const [showPassword, setShowPassword] = useState(false);
    const [showCnfPassword, setShowCnfPassword] = useState(false);

    const changeHandler = (event)=>{
        setFormData((prevData)=>{
            return {
                ...prevData,
                [event.target.name]: event.target.value
            };
        });
    }
    const {password,confirmPassword} = formData;
    const submitHandler = (event)=>{
       event.preventDefault();
       let token=location.pathname.split('/').at(-1);
       dispatch(resetPassword(password,confirmPassword,token))
    }                                                                                                                                                                                                                                                                                                                                                                                                               
    return (
        <div 
        className='text-white flex justify-center items-center min-h-[calc(100vh-3.5rem)] '
        >
            {
                loading ? (
                    <div className="spinner"></div>
                ) : (
                    <div
                    className='w-[500px] flex flex-col space-y-9 p-8 transition-all duration-300 hover:bg-richblue-700/50 Hover:backdrop-blur-xl hover:rounded-xl'>
                        <div className='flex flex-col text-center gap-1'>
                            <h1 className='text-3xl'>Choose Your Password</h1>
                            <p className='text-richblack-100 text-base'>Almost done. Enter your new password and you're all set.</p>
                        </div>
                        <form
                         onSubmit={submitHandler}
                         className='flex flex-col gap-2'
                         >
                            <label
                            className='flex flex-col gap-2'
                            >
                                <p className='text-sm text-richblack-100'>New Password <sup className='text-pink-300'>*</sup></p>
                                <input
                                    type={`${showPassword ? 'password':'text'}`}
                                    name='password'
                                    placeholder='Enter Password'
                                    value={formData.password}
                                    onChange={changeHandler}
                                    className="bg-richblack-800 rounded-xl w-full p-3 text-richblack-5
                        border-b border-richblack-100/35"
                                />
                                <span
                                    className="absolute right-3 top-[45px] cursor-pointer z-10"
                                    onClick={() => { setShowPassword(!showPassword) }}>
                                    {
                                        showPassword ? <AiFillEyeInvisible /> : <AiFillEye />
                                    }
                                </span>
                            </label>
                            <label>
                                <p className='text-sm text-richblack-100'>Confirm New Password <sup className='text-pink-300'>*</sup></p>
                                <input
                                    type={`${showCnfPassword ? 'password':'text'}`}
                                    name='confirmPassword'
                                    placeholder='Enter Confirm Password'
                                    value={formData.confirmPassword}
                                    onChange={changeHandler}
                                    className="bg-richblack-800 rounded-xl w-full p-3 text-richblack-5
                        border-b border-richblack-100/35"
                                />
                                <span
                                    className="absolute right-3 top-[45px] cursor-pointer z-10"
                                    onClick={() => { setShowCnfPassword(!showCnfPassword) }}>
                                    {
                                        showCnfPassword ? <AiFillEyeInvisible /> : <AiFillEye />
                                    }
                                </span>
                            </label>
                            <button
                            type='submit'
                            className='mt-6 transition-all duration-200 hover:scale-95 w-full rounded-[8px] bg-yellow-50 py-[12px] px-[12px] font-medium text-richblack-900'
                            >
                                Reset Password
                            </button>
                        </form>
                        <div >
                            <Link to="/login" className='flex gap-1 items-center'>
                              <BiArrowBack />
                              <p className='font-inter text-white items-center text-sm hover:text-blue-100 transition-all duration-200 hover:scale-100'>Back to login</p>
                            </Link>
                        </div>
                    </div>

                )
            }
        </div>
    )
}

export default UpdatePassword