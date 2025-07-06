import React from 'react'
import HighlightText  from './HighlightText'
import knowYourProgress from '../../../assets/Images/Know_your_progress.png'
import compareWithOthers from '../../../assets/Images/Compare_with_others.png'
import plan_your_lessons from '../../../assets/Images/Plan_your_lessons.png'
import CTAButton from './CTAButton'
const LearningLanguageSection = () => {
  return (
    <div className='flex flex-col items-center mb-20'>

        <div className='mt-40 w-fit text-center lg:w-3/4 flex flex-col items-center'>
            <div className=' text-3xl font-semibold'>
                Your swiss knife for <HighlightText text={"learning any language"}/>
            </div>
            <p className='text-base lg:text-lg font-medium text-center mt-4'>
            Using spin making learning multiple languages easy. with 20+ languages realistic voice-over, progress tracking, custom schedule and more.
            </p>
        </div>

        <div className='mx-auto w-3/4 lg:flex items-center justify-center mt-10'>
          <img 
          src={knowYourProgress} alt=""
          className='object-contain  lg:-mr-32'/>
          <img 
          src={compareWithOthers} alt=""
          className='object-contain -mt-7 lg:mt-0 '/>
          <img 
          src={plan_your_lessons} alt=""
          className='object-contain -mt-12 lg:mt-0 lg:-ml-44'/>
        </div>


        <div className='mt-10 lg:mt-0'>
            <CTAButton active={true}>
                <div>
                    Learn more
                </div>
            </CTAButton>
        </div>
    </div>
  )
}

export default LearningLanguageSection