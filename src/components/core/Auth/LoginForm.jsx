import React,{useState} from 'react'
import {AiOutlineEyeInvisible,AiOutlineEye} from 'react-icons/ai'
import { useNavigate,Link } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { login } from '../../../services/operations/authAPI'
const LoginForm = () => {
    const navigate = useNavigate();
    const dispatch= useDispatch()

    const [formData,setFormData] = useState({
        email:"",
        password:""
    })
    const changeHandler = (event) =>{
        setFormData((prevFormData)=>{
            return {...prevFormData,
                [event.target.name]:event.target.value
            }
        })
    }
    const {email,password} = formData;

    const [showPassword,setShowPassword]=useState(false);
    const submitHandler = (event)=>{
        event.preventDefault();
        dispatch(login(email,password,navigate));
    }
    return (
        <div>
            <form 
            onSubmit={submitHandler}
            className='flex flex-col w-full gap-y-4 mt-6'>
                <label>
                    <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Email Address<sup className='text-pink-200'>*</sup></p>
                    <input
                    required
                    type='email'
                    name='email'
                    value={formData.email}
                    placeholder='Enter Email Here'
                    onChange={(changeHandler)}
                    className='bg-richblack-800 rounded-xl w-full p-3 text-richblack-5
                        border-b border-richblack-100/35'
                    />
                </label>

                <label className='relative'>
                    <p className='text-[0.875rem] text-richblack-5 mb-1 leading-[1.375rem]'>Password<sup className='text-pink-200'>*</sup></p>
                    <input
                    required
                    type={!showPassword?'password':'text'}
                    name='password'
                    value={formData.password}
                    placeholder='Enter Password'
                    onChange={(changeHandler)}
                    className='bg-richblack-800 rounded-xl w-full p-3 text-richblack-5
                        border-b border-richblack-100/35'
                    />
                    <span 
                     className='absolute right-3 top-[38px] cursor-pointer'
                    onClick={() => { setShowPassword(!showPassword) }}>     
                        {
                            showPassword ? <AiOutlineEyeInvisible fontSize={24} fill='#AFB2BF' /> : <AiOutlineEye fontSize={24} fill='#AFB2BF' />
                        }
                    </span>
                    <Link to='/forgot-password'>
                        <p className='absolute text-blue-100 text-sm italic font-edu-sa right-0'>
                            Forgot Password
                        </p>
                    </Link>
                </label>
                <button
                 type="submit"
                 className="mt-6 rounded-[8px] bg-yellow-50 py-[8px] px-[12px] font-medium text-richblack-900"
                  >
                 Sign In
      </button>
            </form>
        </div>
    )
}

export default LoginForm