import React from 'react'
import Instructor from "../../../assets/Images/Instructor.png"
import HighlightText from './HighLightText'
import Button from "../HomePage/Button"
import { FaArrowRight } from 'react-icons/fa'

const InstructorSection = () => {
  return (
    <div className='mt-16'>
      <div className='flex flex-col md:flex-row gap-20 items-center'>

        <div className='md:w-[50%]'>
            <img
                src={Instructor}
                alt=""
                className='shadow-[20px_20px_rgba(255,255,255)]'
            />
        </div>

        <div className='md:w-[50%] flex flex-col gap-6'>
            <div className='text-4xl font-bold'>
                Become an
                <HighlightText text={"Instructor"} />
            </div>

            <p className='font-medium text-[16px] md:w-[80%] text-richblack-300'>
            Instructors from around the world teach millions of students on StudyNotion. We provide the tools and skills to teach what you love.
            </p>

            <div className='w-fit'>
                <Button active={true} linkto={"/signup"}>
                    <div className='flex flex-row gap-2 items-center'>
                        Start Learning Today
                        <FaArrowRight />
                    </div>
                </Button>
            </div>


        </div>

      </div>
    </div>
  )
}

export default InstructorSection
