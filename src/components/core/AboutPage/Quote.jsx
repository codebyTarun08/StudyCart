import React from 'react'
import { FaQuoteLeft , FaQuoteRight } from "react-icons/fa";
import HighlightText from '../HomePage/HighlightText'
export const Quote = () => {
  return (
    <p className='font-bold text-4xl text-richblack-400 text-center px-2'>
           <FaQuoteLeft className='translate-x-10 translate-y-5'/> We are passionate about revolutionizing the way we learn. Our innovative platform <HighlightText text={"combines technology"}/>, <span className='bg-gradient-to-r from-[#FF512F] to-[#F09819] inline-block text-transparent bg-clip-text'>{" "}expertise</span> , and community to create an <span className='bg-gradient-to-r from-[#FF512F] to-[#F09819] inline-block text-transparent bg-clip-text'>unparalleled educational experience</span>. <FaQuoteRight className='translate-x-[1030px] -translate-y-8'/>
    </p>
  )
}
