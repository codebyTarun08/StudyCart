import React from 'react'
import { IoIosChatbubbles } from "react-icons/io";
import { FaGlobeEurope } from "react-icons/fa";
import { IoMdCall } from "react-icons/io";
import ContactUsForm from '../components/core/common/ContactUsForm';
import Footer from '../components/core/common/Footer';
import ReviewSlider from '../components/core/common/ReviewSlider'
const Contact = () => {
return (
    <div>
        <div className="w-11/12 mx-auto max-w-maxContent">
            <section className="flex flex-col lg:flex-row gap-10 lg:gap-20 my-10 lg:my-20">
                <div className="w-full lg:w-2/5 bg-richblack-800 h-auto lg:h-96 text-white rounded-xl flex flex-col justify-center items-center gap-5 py-8">
                    <div className="w-11/12 lg:w-4/5 flex gap-5">
                        <IoIosChatbubbles fontSize={"1.4rem"} />
                        <div>
                            <h2 className="text-lg lg:text-xl font-bold">Chat on us</h2>
                            <p className="text-xs lg:text-sm text-richblack-300">
                                Our friendly team is here to help.
                            </p>
                            <p className="text-xs lg:text-sm text-richblack-300">
                                @mail address
                            </p>
                        </div>
                    </div>
                    <div className="w-11/12 lg:w-4/5 flex gap-5">
                        <FaGlobeEurope fontSize={"1.4rem"} />
                        <div>
                            <h2 className="text-lg lg:text-xl font-bold">Visit Us</h2>
                            <p className="text-xs lg:text-sm text-richblack-300">
                                Come and say hello at our office HQ.
                            </p>
                            <p className="text-xs lg:text-sm text-richblack-300">
                                Here is the location/ address
                            </p>
                        </div>
                    </div>
                    <div className="w-11/12 lg:w-4/5 flex gap-5">
                        <IoMdCall fontSize={"1.4rem"} />
                        <div>
                            <h2 className="text-lg lg:text-xl font-bold">Call Us</h2>
                            <p className="text-xs lg:text-sm text-richblack-300">
                                Mon - Fri From 8am to 5pm
                            </p>
                            <p className="text-xs lg:text-sm text-richblack-300">
                                123456789
                            </p>
                        </div>
                    </div>
                </div>
                <div className="w-full lg:w-8/12 p-4 lg:p-10 border-[1px] border-richblack-600/60 rounded-xl z-10 shadow-2xl shadow-white/10">
                    <h2 className="text-2xl lg:text-4xl font-bold text-white">
                        Got a Idea? We’ve got the skills. Let’s team up
                    </h2>
                    <p className="text-sm lg:text-base mb-4">
                        Tall us more about yourself and what you’re got in mind.
                    </p>
                    <div>
                        <ContactUsForm />
                    </div>
                </div>
            </section>
            <section>
                <div className="w-full lg:w-11/12 max-w-maxContent mx-auto text-center my-10 lg:my-20">
                    <h2 className="text-2xl lg:text-5xl font-Inter font-bold bg-gradient-to-br from-yellow-300 via-pink-200 to-pink-100 inline-block text-transparent bg-clip-text">
                        Reviews from Other Learners
                    </h2>
                </div>
                <ReviewSlider />
            </section>
        </div>
        <Footer />
    </div>
)
}

export default Contact