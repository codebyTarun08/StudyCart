import React from 'react'
import Template from '../components/core/Auth/Template'
import LoginImg from '../assets/Images/login.webp'
const Login = () => {
  return (
    <Template
    title="Welcome Back"
    desc1="Build skills for today, tomorrow, and beyond."
    desc2="Education to future-proof your career."
    image={LoginImg}
    formType="login"
    />
  )
}

export default Login