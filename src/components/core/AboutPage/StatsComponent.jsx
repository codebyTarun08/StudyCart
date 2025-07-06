import React from 'react'

const StatsComponent = () => {
    const statsData = [
        {
         count: "5K",
         label: "Active Students"
        },
        {
         count: "10+",
         label: "Mentors"
        },
        {
         count: "200+",
         label: "Courses"
        },
        {
         count: "50+",
         label: "Awards"
        }
    ]

    return (
        <div className='flex w-full justify-evenly'>
            {
                statsData.map((data,index)=>{
                    return (
                        <div key={index} className='px-5 py-3 flex flex-col gap-3 hover:bg-blue-400/20 hover:rounded-lg transition-all duration-200 text-center'>
                            <h4 className='text-3xl font-bold text-white'>{data.count}</h4>
                            <p  className='text-richblack-300'>{data.label}</p>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default StatsComponent