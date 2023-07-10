import React from 'react'
import ContactUsForm from '../../Common/ContactUsForm'

const ContactForm = () => {

  return (
    <div>

    <div className="mx-auto">
      <h1 className="text-center text-4xl font-semibold">Get in Touch</h1>
      <p className="text-center text-richblack-300 mt-3">
        We&apos;d love to here for you, Please fill out this form.
      </p>
      <div className="relative mx-auto">
        <div className=' sm:w-[500px] mx-auto'><ContactUsForm /></div>
      </div>
   
    </div>

    
      
    </div>
  )
}

export default ContactForm
