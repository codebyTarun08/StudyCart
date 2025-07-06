import React from 'react'
import HighlightText from '../components/core/HomePage/HighlightText'
import BannerImage1 from '../assets/Images/aboutus1.webp'
import BannerImage2 from '../assets/Images/aboutus2.webp'
import BannerImage3 from '../assets/Images/aboutus3.webp'
import { Quote } from '../components/core/AboutPage/Quote'
import FoundingStory from '../assets/Images/FoundingStory.png'
import StatsComponent from '../components/core/AboutPage/StatsComponent'
import LearningGrid from '../components/core/AboutPage/LearningGrid'
import ContactFormSection from '../components/core/AboutPage/ContactFormSection'
import Footer from '../components/core/common/Footer'
import ReviewSlider from '../components/core/common/ReviewSlider'
const About = () => {
    return (
        <div className='text-white'>
            {/* Section 1 */}
            <div className='bg-richblue-900'>
                <section className='w-11/12 max-w-maxContent mx-auto flex flex-col justify-center items-center'>
                    <span className='my-10 bg-richblack-900 transition-all duration-200 hover:scale-95 text-richblack-300 px-4 py-2 rounded-lg hover:text-richblack-25 border-b-[1px] border-richblack-300'>
                        About Us
                    </span>
                    <div className='w-full md:w-3/5'>
                        <header>
                            <h2 className='text-2xl md:text-4xl font-bold text-center'>
                                Driving Innovation in Online Education for a <HighlightText text={"Brighter Future"} />
                            </h2>
                            <p className='text-sm md:text-base mt-5 text-richblack-300 text-center'>
                                StudyCart is at the forefront of driving innovation in online education. We're passionate about creating a brighter future by offering cutting-edge courses, leveraging emerging technologies, and nurturing a vibrant learning community.
                            </p>
                        </header>
                    </div>
                    <div className='flex flex-col md:flex-row gap-6 md:gap-10 md:translate-y-20 mt-10 md:mt-0'>
                        <img src={BannerImage1} alt='aboutusimage1' className='w-full md:w-auto max-w-xs mx-auto' />
                        <img src={BannerImage2} alt='aboutusimage2' className='w-full md:w-auto max-w-xs mx-auto' />
                        <img src={BannerImage3} alt='aboutusimage3' className='w-full md:w-auto max-w-xs mx-auto' />
                    </div>
                </section>
            </div>

            {/* section 2 */}
            <section className='my-20 md:my-40'>
                <div className='w-11/12 max-w-maxContent mx-auto my-10'>
                    <Quote />
                </div>
            </section>

            {/* section 3 */}
            <section className='w-11/12 max-w-maxContent mx-auto'>
                <div className='flex flex-col md:flex-row justify-between'>
                    <div className='w-full md:w-[45%] p-4 flex flex-col gap-4'>
                        <h1 className='text-2xl md:text-4xl font-semibold bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCB045] inline-block text-transparent bg-clip-text'>Our Founding Story</h1>
                        <p className='text-richblack-300'>Our e-learning platform was born out of a shared vision and passion for transforming education. It all began with a group of educators, technologists, and lifelong learners who recognized the need for accessible, flexible, and high-quality learning opportunities in a rapidly evolving digital world.</p>
                        <p className='text-richblack-300'>As experienced educators ourselves, we witnessed firsthand the limitations and challenges of traditional education systems. We believed that education should not be confined to the walls of a classroom or restricted by geographical boundaries. We envisioned a platform that could bridge these gaps and empower individuals from all walks of life to unlock their full potential.</p>
                    </div>
                    <img src={FoundingStory} alt="FoundingStory" className='w-full md:w-[45%] p-4 mt-6 md:mt-0' />
                </div>
                <div className='flex flex-col md:flex-row justify-between my-20 md:my-40 gap-8 md:gap-0'>
                    <div className='w-full md:w-[45%] p-4 flex flex-col gap-4'>
                        <h1 className='font-bold text-2xl md:text-4xl bg-gradient-to-r from-[#E65C00] to-[#F9D423] inline-block text-transparent bg-clip-text'>Our Vision</h1>
                        <p className='text-richblack-300'>With this vision in mind, we set out on a journey to create an e-learning platform that would revolutionize the way people learn. Our team of dedicated experts worked tirelessly to develop a robust and intuitive platform that combines cutting-edge technology with engaging content, fostering a dynamic and interactive learning experience.</p>
                    </div>
                    <div className='w-full md:w-[45%] p-4 flex flex-col gap-4'>
                        <h1 className='font-bold text-2xl md:text-4xl bg-gradient-to-r from-[#1FA2FF] via-[#12D8FA] to-[#A6FFCB] inline-block text-transparent bg-clip-text'>Our Mission</h1>
                        <p className='text-richblack-300'>our mission goes beyond just delivering courses online. We wanted to create a vibrant community of learners, where individuals can connect, collaborate, and learn from one another. We believe that knowledge thrives in an environment of sharing and dialogue, and we foster this spirit of collaboration through forums, live sessions, and networking opportunities.</p>
                    </div>
                </div>
            </section>

            {/* section 4 */}
            <section className='bg-richblue-900 py-10 md:py-20'>
                <div className='w-11/12 max-w-maxContent mx-auto'>
                  <StatsComponent/>
                </div>
            </section>

            {/* Section 5 */}
            <section className='my-20 md:my-40'>
                <div className='w-11/12 max-w-maxContent mx-auto'>
                  <LearningGrid/>
                </div>
            </section>

            {/* Section 6 */}
            <section className='my-20 md:my-40'>
                <div className='w-11/12 max-w-maxContent mx-auto'>
                  <ContactFormSection/>
                </div>
            </section>

            {/* section 7 */}
            <section>
                <div className='w-11/12 max-w-maxContent mx-auto'>
                    <h2 className='text-2xl md:text-4xl font-bold text-center'>Reviews from Other Learners</h2>
                    <ReviewSlider/>
                </div>
            </section>
            <Footer/>
        </div>
    )
}

export default About