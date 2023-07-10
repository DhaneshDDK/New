import React from "react";
import ContactUsForm from "../Common/ContactUsForm";

const ContactFormSection = () => {
  return (
    <div className="mx-auto flex flex-col justify-start ">
      <h1 className="text-4xl font-semibold">Got a Idea? We've got the skills. Let's team up</h1>
      <p className=" text-richblack-300 mt-3">
         Tell us more about yourself and what you're got in mind.
      </p>
       <div className=""> <ContactUsForm /></div>
    </div>
  );
};

export default ContactFormSection;