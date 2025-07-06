import React from 'react'
import {Link} from 'react-router-dom'
const CTAButton = ({active,children,linkTo}) => {
  return (
    <Link to={linkTo}>
        <div className={`font-inter text-center text-base px-6 py-3 rounded-md hover:scale-95 transition-all duration-200 ${active ? "bg-[#FFD60A] text-black shadow-custom-inset" : "bg-richblack-800 shadow-custom-inset"}`}>
            {children}
        </div>
    </Link>
  )
}

export default CTAButton

