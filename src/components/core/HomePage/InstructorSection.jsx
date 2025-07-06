import React from 'react'
import Instructor from '../../../assets/Images/Instructor.png'
import HighlightText from './HighlightText'
import CTAButton from './CTAButton'
import { FaArrowRight } from 'react-icons/fa'
const InstructorSection = () => {
  return (
    <div className='lg:flex gap-20 items-center mt-20'>
         <img 
         src={Instructor}
         alt="InstructorImg"
         className='w-4/5 mx-auto shadow-[-20px_-20px_0px_0px_rgb(255,255,255)]'/>

         <div className='mt-20 w-fit lg:mt-0'>
            <p className=' text-white text-4xl font-semibold lg:w-36 '>Become an <HighlightText text={"instructor"}/></p>
            <p className='text-richblack-100 mt-2 lg:w-4/5'>Instructors from around the world teach millions of students on StudyCart. We provide the tools and skills to teach what you love.</p>

            <div className='w-fit mt-10'>
            <CTAButton active={true} linkTo={"/signup"}>
                <div className='flex flex-row gap-2 items-center'>
                  Start Teaching Today
                  <FaArrowRight/>
                </div>
            </CTAButton>
            </div>
         </div>

         
        
    </div>
  )
}

export default InstructorSection