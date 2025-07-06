import React from 'react'
import signup from '../assets/Images/signup.webp'
import Template from '../components/core/Auth/Template';

const Signup = ({setIsLoggedIn}) => {
  return (
    <div>
        <Template
            title="Join the millions learning to code with StudyNotion for free"
            desc1="Build skills for today, tomorrow, and beyond."
            desc2="Education to future-proof your career."
            image={signup}
            formtype="signup"
            setIsLoggedIn={setIsLoggedIn}
        />
    </div>
  )
}
export default Signup;