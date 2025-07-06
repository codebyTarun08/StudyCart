import React from 'react'
import { HiUsers } from "react-icons/hi";
import { ImTree } from "react-icons/im";

const CardComponent = ({currentCard,setCurrentCard,key,cardData}) => {
  return (
    <div key={key} className={`w-[341px] h-[300px] ${currentCard === cardData.heading ?"shadow-[12px_12px_0px_0px] shadow-yellow-50 bg-white text-richblack-900":"bg-richblack-800 text-richblack-5"}`}
    onClick={()=>setCurrentCard(cardData.heading)}>
        <div className='border-b-2 border-dashed border-richblack-200 p-5 h-[250px]'>
            <h4 className='font-semibold font-inter text-lg'>{cardData.heading}</h4>
            <p className='text-richblack-200 my-3'>{cardData.description}</p>
        </div>
        <div className='flex justify-evenly h-[50px]'>
            <div className={`flex jutify-center items-center gap-2 ${currentCard === cardData.heading ? "text-blue-100" : "text-richblack-200"}`}>
                <HiUsers fontSize={"1.5rem"}/>
                <p>{cardData.level}</p>
            </div>
            <div className={`flex jutify-center items-center gap-2 ${currentCard === cardData.heading ? "text-blue-100" : "text-richblack-200"}`}>
                <ImTree fontSize={"1.5rem"}/>
                <p>{cardData.lessonNumber}Lession</p>
             </div>
        </div>
    </div>
  )
}

export default CardComponent