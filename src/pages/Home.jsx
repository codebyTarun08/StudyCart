import React from 'react'
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom'
import HighlightText from '../components/core/HomePage/HighlightText'
import CTAButton from '../components/core/HomePage/CTAButton';
import Banner from '../assets/Images/banner.mp4'
import CodeBlocks from '../components/core/HomePage/CodeBlocks';
import TimeLineSection from '../components/core/HomePage/TimeLineSecton'
import LearningLanguageSection from '../components/core/HomePage/LearningLanguageSection'
import InstructorSection from '../components/core/HomePage/InstructorSection';
import Footer from '../components/core/common/Footer'
import Exploremore from '../components/core/HomePage/Exploremore';
import ReviewSlider from '../components/core/common/ReviewSlider';

const Home = () => {
    return (
        <div>
        {/* Section 1 */}
        <div className=' relative flex flex-col justify-between items-center text-white w-11/12 max-w-maxContent mx-auto'>

            <Link to={"/signup"}>
                <div className='group mt-16 p-1 mx-auto font-bold text-richblack-100 bg-richblack-800 rounded-full transition-all duration-200 hover:scale-95 w-fit border-b-[1px] border-richblack-400/30'>
                    <div className='flex gap-2 items-center rounded-full text-sm px-10 py-[10px] group-hover:bg-richblack-900 shadow-xl shadow-blue-400/70 z-10'>
                        <p>Become an Instructor</p>
                        <FaArrowRight />
                    </div>
                </div>
            </Link>

            <div className='mt-10 font-semibold text-4xl text-center'>
                Empower Your Future with {" "}
                <HighlightText text={"Coding Skills"} />
            </div>

            <div className=' w-4/6 mt-5 text-richblack-200 text-sm text-center'>
                With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors.
            </div>

            <div className='flex gap-4 my-8'>
                <CTAButton active={true} linkTo={"/signup"}>
                    Learn More
                </CTAButton>
                <CTAButton active={false} linkTo={"/login"}>
                    Book a Demo
                </CTAButton>
            </div>


            <div className='my-20 mx-5 lg:w-[1035px] lg:h-[515px] shadow-[0px_0px_50px_-5px] shadow-blue-200'>
                <video
                    className='shadow-[20px_20px_0px_0px_rgb(255,255,255)]'
                    muted
                    loop
                    autoPlay
                >
                    <source src={Banner} type='video/mp4' />
                </video>
            </div>
           
            {/* code Section 1 */}
            <div>
                <CodeBlocks

                    position={"lg:flex-row"}
                    heading={
                        <div className='font-semibold text-4xl text-center'>
                            Unlock Your <HighlightText text={"Coding Potential"} /> with our online courses.
                        </div>
                    }
                    subheading={
                        "With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors."
                    }
                    ctabtn1={
                        {
                            text: "Try it yourself",
                            active: true,
                            linkTo: "/signup"
                        }
                    }
                    ctabtn2={
                        {
                            text: "Learn More",
                            active: false,
                            linkTo: "/login"
                        }
                    }
                    codeColor={"text-yellow-200"}

                    codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>>This is myPage<span></title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}

                    backgroundGradient={<div className="codeblock1 absolute"></div>}
                />

            </div>

            {/* Section 2 */}

            <div>
                <CodeBlocks
                    position={"lg:flex-row-reverse"}
                    heading={
                        <div className='font-semibold text-4xl text-center'>
                            Start <HighlightText text={"Coding in Courses"} />
                        </div>
                    }
                    subheading={
                        "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
                    }
                    ctabtn1={
                        {
                            text: "Continue Lessons",
                            active: true,
                            linkTo: "/signup"
                        }
                    }
                    ctabtn2={
                        {
                            text: "Learn More",
                            active: false,
                            linkTo: "/login"
                        }
                    }
                    codeColor={"text-pink-300"}

                    codeblock={`<!DOCTYPE html>\n <html lang="en">\n<head>\n<title>This is myPage</title>\n</head>\n<body>\n<h1><a href="/">Header</a></h1>\n<nav> <a href="/one">One</a> <a href="/two">Two</a> <a href="/three">Three</a>\n</nav>\n</body>`}

                    backgroundGradient={<div className="codeblock2 absolute"></div>}
                />
            </div>
            <Exploremore/>
        </div>

        {/*eSction 2 */}
        <div className='bg-pure-greys-5 text-richblack-700 '>
                <div className='homepage_bg h-auto lg:h-60'>
                    <div className='w-11/12 max-w-maxContent flex items-center flex-col justify-between mx-auto'>
                        <div className='h-80 lg:h-[150px]'></div>
                        <div className='flex gap-7 text-white'>
                            <CTAButton active={true} linkTo={"/signup"}>
                                <div className='flex items-center gap-3'>
                                    Explore Full Catalog
                                    <FaArrowRight/>
                                </div>
                            </CTAButton>
                            <CTAButton active={false} linkTo={"/signup"}>
                                <div className='flex items-center gap-3'>
                                    Learn More
                                    <FaArrowRight/>
                                </div>
                            </CTAButton>
                        </div>
                    </div>

                </div>

                <div className='mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between '>
                    <div className='flex gap-5 justify-evenly mt-20 mb-10 flex-col sm:flex-row'>
                        <div className='text-3xl sm:text-4xl font-semibold'>
                            Get the skills you need a 
                            <HighlightText text={"Job that is in demand"}/>
                        </div>
                        <div className='flex flex-col gap-7 items-start'>
                            <p>The modern StudyNotion is the dictates its own terms. Today, to be a competitive specialist requires more than professional skills.</p>
                            <CTAButton active={true}>Learn More</CTAButton>
                        </div>
                    </div>

                    <TimeLineSection/>
                    <LearningLanguageSection/>


                </div>

            </div>
        {/* Section 3 */}

        <div className='w-11/12 max-w-maxContent mx-auto flex flex-col justify-between gap-5'>
                    <InstructorSection/>

                    <h2 className='font-semibold text-center text-4xl text-white mt-36 font-inter'>Review from other Sections</h2>
                    <ReviewSlider/>
        </div>
        {/* Footer */}

        <Footer/>
    </div>
    )
}

export default Home