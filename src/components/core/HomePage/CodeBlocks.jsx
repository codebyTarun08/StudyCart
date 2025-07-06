import React from 'react'
import CTAButton from './CTAButton'
import { FaArrowRight } from 'react-icons/fa'
import { TypeAnimation } from 'react-type-animation'
const CodeBlocks = ({ position, heading, subheading, ctabtn1, ctabtn2, codeblock, backgroundGradient, codeColor }) => {
    return (
        <div className={`flex ${position} my-20 max-w-11/12 justify-between flex-col lg:gap-10 gap-10`}>
            
            {/* Section 1 */}
            <div className='w-[100%] lg:w-[50%] flex flex-col gap-8 items-center'>
                <div className='text-right w-[90%]'>{heading}</div>
                <div className='mt-5 text-richblack-200 text-sm w-[85%]'>
                    {subheading}
                </div>
                <div className='flex gap-4 my-8'>
                    <CTAButton active={ctabtn1.active} linkTo={ctabtn1.linkTo}>
                        <div className='flex gap-2 items-center'>
                            {ctabtn1.text}
                            <FaArrowRight />
                        </div>
                    </CTAButton>
                    <CTAButton active={ctabtn2.active} linkTo={ctabtn2.linkTo}>
                        {ctabtn2.text}
                    </CTAButton>
                </div>
            </div>

            {/* Section 2 */}
            <div className='h-fit code-border flex flex-row py-3 text-[10px] sm:text-sm leading-[18px] sm:leading-6 relative w-[100%] lg:w-[470px] text-richblack-400'>
                {backgroundGradient}
                <div className='flex flex-col text-center w-[10%]'>
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                    <p>4</p>
                    <p>5</p>
                    <p>6</p>
                    <p>7</p>
                    <p>8</p>
                    <p>9</p>
                    <p>10</p>
                    <p>11</p>
                </div>
                
                <div className={`w-[90%] flex flex-col gap-2 pr-2 ${codeColor}`}>
                    <TypeAnimation
                        sequence={[codeblock, 200, ""]}
                        repeat={Infinity}
                        cursor={true}
                        style={{
                            whiteSpace: "pre-line",
                            display: "block",
                        }}
                        omitDeletionAnimation={true}
                    />
                </div>
            </div>


        </div>
    )
}

export default CodeBlocks