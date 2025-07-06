import React,{useState} from 'react'
import {HomePageExplore} from '../../../data/homepage-explore';
import HighlightText from './HighlightText';
import CardComponent from './CardComponent';
const tabName = [
    "Free",
    "New to coding",
    "Most popular",
    "Skills paths",
    "Career paths"
]
const Exploremore = () => {
    const [currentTab,setCurrentTab] = useState(tabName[0]);
    const [courses,setCourses] = useState(HomePageExplore[0].courses);
    const [currentCard,setCurrentCard] = useState(HomePageExplore[0].courses[0].heading);

    const setMyCards= (value)=>{
        setCurrentTab(value);
        const result = HomePageExplore.filter((course)=>course.tag===value);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
    }

  return (
    <div className='flex flex-col items-center'>
        <div className='text-2xl lg:text-4xl font-semibold text-center'>
            Unlock the <HighlightText text={"power of code"}/>
        </div>

        <p className='text-center text-richblack-300 text-sm lg:text-base lg:font-medium'>
            Learn to build anything you can imagine.
        </p>

        <div className='mt-10 w-32 h-fit py-10 lg:w-fit lg:flex gap-2 bg-richblack-900 lg:border-b-[1px] lg:border-richblack-100/30 rounded-full lg:px-1 lg:py-1'>
            {
                tabName.map((element,index)=>{
                    return (
                        <div key={index}
                         className={`text-base flex items-center rounded-full transition-all duration-200 cursor-pointer px-7 py-2 ${currentTab === element 
                            ? "bg-richblack-800 text-richblack-50"
                           : "text-richblack-200" }`} 
                           onClick={()=>setMyCards(element)}
                         >
                            {element}
                        </div>
                    )
                })
            }
        </div>

        <div className='lg:h-24'></div>

        <div className='flex flex-col lg:flex-row gap-20 translate-y-[20%]'>        
            {
                courses.map((course,index)=>{
                    return (
                        <CardComponent
                        key={index}
                        cardData={course}
                        currentCard={currentCard}
                        setCurrentCard={setCurrentCard}/>
                    )
                })
            }
        </div>
    </div>
  )
}

export default Exploremore