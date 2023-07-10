import React from 'react'
import HighlightText from '../HomePage/HighLightText'

const Quote = () => {
  return (
    <div className=" text-xl md:text-3xl font-semibold mx-auto py-5 pb-20 text-center text-white">
        We are passionate about revolutionizing the way we learn. Our
        innovative platform <HighlightText text={"combines technology"} />,{" "}
        <span className="textbg1 font-bold">
            {" "}
            expertise
        </span>
        , and community to create an
        <span className="textbg2 font-bold">
            {" "}
            unparalleled educational
        experience.
        </span> 
    </div>
  )
}

export default Quote