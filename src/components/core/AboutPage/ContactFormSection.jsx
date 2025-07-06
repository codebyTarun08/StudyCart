import React from 'react'
import ContactUsForm from '../common/ContactUsForm'
const ContactFormSection = () => {
  return (
    <div className='flex flex-col justify-center items-center mx-auto '>
        <h1 className='text-4xl font-bold '>Get in Touch</h1>
        <p className='text-richblack-300 text-base mt-5'>We’d love to here for you, Please fill out this form.</p>
        <div className='mt-10'>
            <ContactUsForm/>
        </div>
    </div>
  )
}

export default ContactFormSection