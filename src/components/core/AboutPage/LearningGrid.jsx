import React from 'react'
import CTAButton from '../HomePage/CTAButton'
import HighlightText  from '../HomePage/HighlightText'
const LearningGrid = () => {
    const LearningGridArray = [
        {
            order:-1,
            heading:"World-Class Learning for",
            highlightText:"Anyone, Anywhere",
            description:
            " Studynotion partners with more than 275+ leading universities and companies to bring flexible, affordable, job-relevant online learning to individuals and organizations worldwide.",
            BtnText:"Learn More",
            BtnLink:"/"
        },
        {
            order:1,
            heading:"Curriculum Based on Industry Needs",
            description:
            "Save time and money! The Belajar curriculum is made to be easier to understand and in line with industry needs.",
        },
        {
            order:2,
            heading:"Our Learning Methods",
            description:
            "The learning process uses the namely online and offline.",
        },
        {
            order:3,
            heading:"Certification",
            description:
            "You will get a certificate that can be used as a certification during job hunting.",
        },
        {
            order:4,
            heading:`Rating "Auto-grading" `,
            description:
            "You will immediately get feedback during the learning process without having to wait for an answer or response from the mentor.",
        },
        {
            order:5,
            heading:"Ready to Work",
            description:
            "Connected with over 150+ hiring partners, you will have the opportunity to find a job after graduating from our program.",
        },
    ]
  return (
    <div className='grid mx-auto grid-cols-1 lg:grid-cols-4 '>
        {
            LearningGridArray.map((card,index)=>{
                return (
                    <div
                    className={
                        `
                        ${index===0 && "lg:col-span-2"}
                        ${
                            (card.order % 2 === 1) ? "bg-richblack-700" : "bg-richblack-800"
                        }
                        ${card.order === 3 && "lg:col-start-2"}
                        ${card.order === -1 && "bg-richblack-900"}
                        `
                    }>
                        {
                            card.order < 0 
                            ? (
                                  <div>
                                    <div className='text-4xl font-bold'>
                                        {card.heading}
                                        <HighlightText text={card.highlightText}/>
                                    </div>
                                    <p className='text-richblack-300 text-base w-4/5 my-5'>
                                        {card.description}
                                    </p>
                                    <div className='w-fit my-10'> 
                                    <CTAButton active={true} linkTo={card.BtnLink}>
                                      {card.BtnText}
                                    </CTAButton>
                                    </div>
                                  </div>
                            ) : (
                               <div className='flex flex-col gap-10 justify-center items-center p-7 h-72'>
                                <h1  className='text-lg font-semibold w-4/5'>{card.heading}</h1>
                                <p className='text-richblack-300 text-xs w-4/5'>{card.description}</p>
                               </div>
                            )
                        }

                    </div>
                )
            })
        }
    </div>
  )
}

export default LearningGrid