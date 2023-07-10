import React from 'react'
import Logo1 from '../../../assets/TimeLineLogo/Logo1.svg'
import Logo2 from '../../../assets/TimeLineLogo/Logo2.svg'
import Logo3 from '../../../assets/TimeLineLogo/Logo3.svg'
import Logo4 from '../../../assets/TimeLineLogo/Logo4.svg'
import timelineImage from "../../../assets/Images/TimelineImage.png"

const timeline = [
    {
        Logo: Logo1,
        heading: "Leadership",
        Description:"Fully committed to the success company",
    },
    {
        Logo: Logo2,
        heading: "Responsibility",
        Description:"Students will always be our top priority",
    },
    {
        Logo: Logo3,
        heading: "Flexibility",
        Description:"The ability to switch is an important skills",
    },
    {
        Logo: Logo4,
        heading: "Solve the problem",
        Description:"Code your way to a solutiony",
    },
];

const TimeLineSection = () => {
  return (
    <div className='w-[100%]'>
        <div className='flex flex-col lg:flex-row gap-[4rem] lg:gap-15 items-center justify-between'>

        <div className=' lg:w-[45%] flex flex-col'>
            {
                timeline.map( (element, index) => {
                    return (

                        <div key={index} className='flex flex-col items-start justify-center'>

                        <div className='flex flex-row items-center gap-10 my-2' key={index}>
                            <div className='w-[60px] h-[60px] bg-white rounded-full flex justify-center shadow-[#00000012] shadow-[0_0_62px_0] items-center'>
                                <img src={element.Logo} alt="element logo"/>
                            </div>
    
                            <div>
                                <h2 className='font-semibold text-[20px]'>{element.heading}</h2>
                                <p className='text-base'>{element.Description}</p>
                            </div>
                        </div>

                     { (index+1 < timeline.length) &&   <div className='block pl-[1.9em] h-4  lg:h-14 border-dotted border-r border-richblack-100 bg-richblack-400/0 w-[26px]'></div>
                     }
                        </div>
                    )
                } )
            }
        </div>

        <div className='relative shadow-[-10px_-5px_40px_5px] shadow-blue-200 '>

             <img  src={timelineImage}             
                alt="timelineImage"
               className='object-cover h-fit shadow-[20px_20px_rgba(255,255,255)]' 
             />
             
             <div className='absolute bg-caribbeangreen-700 flex flex-row text-white uppercase py-7
                             left-[50%] translate-x-[-50%] translate-y-[-50%]'>
                 <div className='flex flex-row gap-5 items-center border-r border-caribbeangreen-300 px-7'>
                     <p className='text-3xl font-bold'>10</p>
                     <p className='text-caribbeangreen-300 text-sm'>Years of Experience</p>
                 </div>
             
                 <div className='flex gap-5 items-center px-7'>
                 <p className='text-3xl font-bold'>250</p>
                     <p className='text-caribbeangreen-300 text-sm'>TYpe of Courses</p>
                 </div>
             
</div>

</div>


       

        </div>
    </div>
  )
}

export default TimeLineSection
