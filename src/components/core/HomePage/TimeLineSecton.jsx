import React from 'react'
import Logo1 from '../../../assets/TimeLineLogo/Logo1.svg'
import Logo2 from '../../../assets/TimeLineLogo/Logo2.svg'
import Logo3 from '../../../assets/TimeLineLogo/Logo3.svg'
import Logo4 from '../../../assets/TimeLineLogo/Logo4.svg'
import timelineImage from '../../../assets/Images/TimelineImage.png'

const TimeLineSecton = () => {
    const timeline = [
        {
            Logo: Logo1,
            heading: "LeaderShip",
            description: "Fully committed to the success company"
        },
        {
            Logo: Logo2,
            heading: "Responsibility",
            description: "Students will always be our top priority"
        },
        {
            Logo: Logo3,
            heading: "Flexibility",
            description: "The ability to switch is an important skills"
        },
        {
            Logo: Logo4,
            heading: "Solve the problem",
            description: "Code your way to solution"
        },
    ]
    return (
        <div className='flex flex-col sm:flex-row gap-15 justify-center mx-auto'>
            <div className='flex flex-col gap-5 lg:w-[45%]'>
                {
                    timeline.map((element, index) => {
                        return (
                            <div className='flex flex-col mt-5 lg:mt-0 lg:gap-3'>
                                <div className='flex flex-row gap-6' key={index}>
                                    <div class='w-[50px] h-[50px] bg-white flex justify-center rounded-full items-center shadow-2xl shadow-richblack-900'>
                                        <img src={element.Logo} alt="" />
                                    </div>
                                    <div>
                                        <p className='font-bold'>{element.heading}</p>
                                        <p>{element.description}</p>
                                    </div>

                                </div>

                                <div
                                    className={`hidden ${timeline.length - 1 === index ? "hidden" : "lg:block"
                                        } mt-4  h-7 border-dashed border-r border-richblack-100 bg-richblack-400/0 w-[26px]`}
                                ></div>
                            </div>

                        )
                    })
                }
            </div>

            <div className='relative my-10 lg:my-0'>
                <img src={timelineImage}
                    alt="TimeLineImage"
                    className='h-fit object-cover shadow-xl shadow-blue-200'/>
                <div className='absolute w-3/4 py-5 lg:py-10 bg-caribbeangreen-700 uppercase left-1/2 translate-x-[-50%] translate-y-[-50%]'>
                     <div className='flex justify-evenly'>
                        <div className='flex items-center gap-4 border-r border-caribbeangreen-300 px-2 w-fit lg:w-[170px]'>
                            <p className='text-3xl lg:text-4xl font-bold text-white'>10</p>
                            <p className='text-xs lg:text-sm text-caribbeangreen-300'>Years Experience</p>
                        </div>
                        <div className='flex items-center gap-4 w-fit lg:w-[170px] px-2 '>
                            <p className='text-3xl lg:text-4xl font-bold text-white'>250</p>
                            <p className='text-xs lg:text-sm text-caribbeangreen-300'>types of courses</p>
                        </div> 
                     </div> 
                </div>
            </div>
        </div>
    )
}

export default TimeLineSecton