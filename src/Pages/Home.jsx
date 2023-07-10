import React from "react";
import { Link } from "react-router-dom";
import {FaArrowRight} from "react-icons/fa"
import HighlightText from "../Components/Core/HomePage/HighLightText";
import Button from "../Components/Core/HomePage/Button";
import Banner from '../assets/Images/banner.mp4'
import CodeBlocks from "../Components/Core/HomePage/CodeBlocks";
import TimeLineSection from "../Components/Core/HomePage/TimeLineSection";
import LearningLanguageSection from "../Components/Core/HomePage/LearningLanguageSection";
import InstructorSection from "../Components/Core/HomePage/InstructorSection";
import ExploreMore from "../Components/Core/HomePage/ExploreMore";
import Footer from '../Components/Common/Footer'
import ReviewSlider from "../Components/Common/ReviewSlider";

const Home = () => {

  return (
    <div className="">
      {/* section 1 */}

      <div
        className="relative mx-auto flex flex-col w-11/12 max-w-maxContent items-center 
      text-white justify-between"
      >
          <div
            className=" group mt-12 p-1 mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200
            transition-all duration-200 hover:scale-95 w-fit"
          >
             <Link to={"/signup"}>
            <div
              className="flex flex-row items-center gap-2 rounded-full px-10 py-[5px]
                transition-all duration-200 group-hover:bg-richblack-900 shadow-md hover:text-white shadow-richblack-700 hover:shadow-none" 
            >
              <p>Become an Instructor</p>
              <FaArrowRight />
            </div>
            </Link>

          </div>

        <div className='md:text-center text-4xl font-semibold mt-7'>
            Empower Your Future with
            <HighlightText text={"Coding Skills"} />
        </div>

        <div className=' mt-4 w-[100%] md:w-[90%] md:text-center text-md md:text-lg font-bold text-richblack-100'>
            With our online coding courses, you can learn at your own pace, from anywhere in the world, and get access to a wealth of resources, including hands-on projects, quizzes, and personalized feedback from instructors. 
        </div>

        <div className='flex flex-row gap-7 mt-8'>
            <Button active={true} linkto={"/signup"}> 
                Learn More
            </Button>

            <Button active={false} linkto={"/login"}> 
                Book a Demo
            </Button>
        </div>

        <div className='mx-3 my-14 shadow-[-10px_-5px_40px_5px] shadow-blue-200'>
            <video className="shadow-[20px_20px_rgba(255,255,255)]"
            muted
            loop
            autoPlay
            >
            <source  src={Banner} type="video/mp4" />
            </video>
        </div>

        {/* Code section 1 */}
        <CodeBlocks
         position={"lg:flex-row"}
                heading={
                    <div className='text-4xl font-semibold'>
                        Unlock Your
                        <HighlightText text={"coding potential"}/>  {" "}
                        with our online courses
                    </div>
                }
                subheading = {
                    "Our courses are designed and taught by industry experts who have years of experience in coding and are passionate about sharing their knowledge with you."
                }
                ctabtn1={
                    {
                        btnText: "Try it yourself",
                        linkto: "/signup",
                        active: true,
                    }
                }
                ctabtn2={
                    {
                        btnText: "Learn More",
                        linkto: "/login",
                        active: false,
                    }
                }

                codeblock={
                  `<!DOCTYPE html>\n<html lang="en">\n<head>\n<title>This is my Page</title>\n<linkrel="stylesheet"href="styles.css">\n/head>
                <body>\n <h1><a href="/">Header</a></h1>\n <nav><a href="/one">One</a>
                  <a href="/Two">Two</a>  <a href="/Three">Three</a>
                </nav> \n  </body>`
                }
                bgNumber = {"1"}
                codeColor={"text-yellow-25"}
        />

        {/* Code section 2 */}
        <CodeBlocks
         position={"lg:flex-row-reverse"}
                heading={
                    <div className='text-4xl font-semibold'>
                        Start 
                        <HighlightText text={"coding in seconds"}/>
                    </div>
                }
                subheading = {
                    "Go ahead, give it a try. Our hands-on learning environment means you'll be writing real code from your very first lesson."
                }
                ctabtn1={
                    {
                        btnText: "Continue Lesson",
                        linkto: "/signup",
                        active: true,
                    }
                }
                ctabtn2={
                    {
                        btnText: "Learn More",
                        linkto: "/login",
                        active: false,
                    }
                }

                codeblock={
                  `import React from "react";
                   import CTAButton from "./Button";
                  import TypeAnimation from "react-type";
                  import { FaArrowRight } from "react-icons/fa";

                  const Home = () => {
                  return (
                  <div>Home</div>
                  )
                  }
                  export default Home;`
                }
                bgNumber = {"2"}
                codeColor={"text-richblue-5"}
        />

        <div>

        </div>

        <ExploreMore/>


      </div>


      {/* section 2 */}

      <div className="bg-pure-greys-5 text-richblack-700 ">
           <div className="homepage_bg h-[310px]">

           <div className='w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-5 mx-auto'>
                    <div className=' h-[120px] md:h-[180px]'></div>
                        <div className='flex flex-col md:flex-row gap-7 text-white '>
                        <Button active={true} linkto={"/signup"}>
                            <div className='flex items-center gap-3' >
                                Explore Full Catalog
                                <FaArrowRight />
                            </div>
                            
                        </Button>
                        <Button active={false} linkto={"/signup"}>
                            <div>
                                Learn more
                            </div>
                        </Button>
                    </div>

                </div>

           </div>
    
    
           <div className='mx-auto w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-7'>

       <div className='flex flex-col md:flex-row gap-10 mb-10 mt-[95px]'>
         <div className='text-4xl font-semibold '>
        Get the Skills you need for a
        <HighlightText text={"Job that is in demand"} />
    </div>

    <div className='flex flex-col gap-6 items-center md:items-start'>
    <div className='text-[16px]'>
    The modern StudyNotion dictates its own terms. Nowadays, being a competitive specialist requires more than just professional skills
    </div>
    <Button active={true} linkto={"/signup"}>
        <div>
            Learn more
        </div>
    </Button>
    </div>

</div>

   <TimeLineSection/>
<LearningLanguageSection/>

           </div>
           
      </div>


      {/* section 3 */}

      {/*Section 3 */}
      <div className='w-11/12 mx-auto max-w-maxContent flex-col items-center justify-between gap-8 first-letter bg-richblack-900 text-white'>

            <InstructorSection />

            <h2 className='text-center text-4xl font-semobold mt-24'>Reviews from other learners</h2>
            {/* Review Slider here */}
            <ReviewSlider/>
            
      </div>

      <Footer/>
      

    </div>
  );
};

export default Home;
