import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { buyCourse } from '../Services/Operations/PaymentAPI';
import { ScaleLoader } from 'react-spinners';
import { useState, useEffect } from 'react';
import { fetchCourseDetails } from '../Services/Operations/CourseAPI';
import GetAvgRating from '../utils/avgRating';
import RatingStars from '../Components/Common/RatingStars';
import { formatDate } from '../Services/FormatDate';
import { BiInfoCircle } from "react-icons/bi"
import { HiOutlineGlobeAlt } from "react-icons/hi"
import CourseBuyCard from '../Components/Core/Course/CourseBuyCard';
import { formatTime } from '../Services/FormatDate';
import { durationCalc } from '../Services/CourseDurationCalculator';
import CourseAccordionBar from '../Components/Core/Course/CourseAccordionBar';
import Footer from '../Components/Common/Footer'
import ConfirmationModal from '../Components/Common/ConfirmationModal'

const CourseDetails = () => {
  
  const { user } = useSelector((state) => state.profile)
  const {token} = useSelector((state)=>state.auth);
  const { paymentLoading } = useSelector((state) => state.course)
  // const { loading } = useSelector((state) => state.profile)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const {courseId} = useParams();


  const [confirmationModal, setConfirmationModal] = useState(null)
  const [course, setCourse] = useState(null)

  useEffect(()=>{
    ;(async () => {
      try {
        const res = await fetchCourseDetails(courseId)
        // console.log("course details res: ", res)
        setCourse(res);
      } catch (error) {
        console.log("Could not fetch Course Details")
      }
    })()
  },[courseId])


   // Calculating Avg Review count
   const [avgReviewCount, setAvgReviewCount] = useState(0)
   useEffect(() => {
     const count = GetAvgRating(course?.ratingAndReviews)
     setAvgReviewCount(count)
   }, [course])

  //  console.log(course);

   // // Collapse all
  // const [collapse, setCollapse] = useState("")
  const [isActive, setIsActive] = useState(Array(0))
  const handleActive = (id) => {
    // console.log("called", id)
    setIsActive(
      !isActive.includes(id)
        ? isActive.concat([id])
        : isActive.filter((e) => e != id)
    )
  }

   // Total number of lectures
   const [totalNoOfLectures, setTotalNoOfLectures] = useState(0)
   useEffect(() => {
     let lectures = 0
      course?.courseContent?.forEach((sec) => {
       lectures += sec.subSection.length || 0
     })
     setTotalNoOfLectures(lectures)
   }, [course])


  const handleBuyCourse = async ()=>{
    if (token) {
      buyCourse(token, [courseId], user, navigate, dispatch)
      return
    }

    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to Purchase Course.",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    })
  }

  if (!course) {
    // console.log("payment loading")
    return (
      <div className='min-h-[calc(100vh-4rem)] flex items-center justify-center'><ScaleLoader color='lime'/></div>
    )
  }


  const {
    _id: course_id,
    courseName,
    courseDescription,
    thumbnail,
    price,
    whatYouWillLearn,
    courseContent,
    ratingAndReviews,
    instructor,
    studentsEnrolled,
    createdAt,
  } = course;

  // console.log(ratingAndReviews)

  // console.log(instructor);

  const totalCourseDuration = formatTime(durationCalc(course));
  

  return (
    <div>
        <div className={`relative w-full bg-richblack-800`}>
                    {/* Hero Section */}
        <div className="mx-auto box-content px-4 lg:w-[1260px] xl:relative ">
          <div className="mx-auto grid min-h-[450px] max-w-maxContentTab justify-items-center py-8 lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-[810px]">
            <div className="relative block max-h-[30rem] lg:hidden">
              <div className="absolute bottom-0 left-0 h-full w-full shadow-[#161D29_0px_-64px_36px_-28px_inset]"></div>
              <img
                src={thumbnail}
                alt="course thumbnail"
                className="aspect-auto w-full"
              />
            </div>
            <div
              className={`my-5 flex flex-col justify-center gap-4 py-5 text-lg text-richblack-5`}
            >
              <div>
                <p className="text-4xl font-bold text-richblack-5 sm:text-[42px]">
                  {courseName}
                </p>
              </div>
              <p className={`text-richblack-200`}>{courseDescription}</p>
              <div className="text-md flex flex-wrap items-center gap-2">
                <span className="text-yellow-25">{avgReviewCount}</span>
                <RatingStars Review_Count={avgReviewCount} Star_Size={24} />
                <span>{`(${ratingAndReviews.length} review${ratingAndReviews.length == 1 ? "" : "s"})`}  </span>
                <span>{`${studentsEnrolled.length} student${studentsEnrolled.length == 1 ? "" : "s"} enrolled`}</span>
              </div>
              <div>
                <p className="">
                  Created By {`${instructor?.firstName} ${instructor?.lastName}`}
                </p>
              </div>
              <div className="flex flex-wrap gap-5 text-lg">
                <p className="flex items-center gap-2">
                  {" "}
                  <BiInfoCircle /> Created at {formatDate(createdAt)}
                </p>
                <p className="flex items-center gap-2">
                  {" "}
                  <HiOutlineGlobeAlt /> English
                </p>
              </div>  
            </div>
            <div className="flex w-full flex-col gap-4 border-y border-y-richblack-500 py-4 lg:hidden">
              <p className="space-x-3 pb-4 text-3xl font-semibold text-richblack-5  ">
                Rs. {price}
              </p>
              <button className="cursor-pointer rounded-md bg-yellow-50 px-[20px] py-[8px] font-semibold text-richblack-900" onClick={handleBuyCourse}>
                Buy Now
              </button>
              <button className="cursor-pointer rounded-md bg-richblack-800 px-[20px] py-[8px] font-semibold text-richblack-5">Add to Cart</button>
            </div>
          </div>
          {/* Courses Card */}
          <div className="right-[1rem] top-[60px] mx-auto hidden min-h-[600px] w-1/3 max-w-[410px] translate-y-24 md:translate-y-0 lg:absolute  lg:block">
            <CourseBuyCard
              course={course}
              setConfirmationModal={setConfirmationModal}
              handleBuyCourse={handleBuyCourse}
            />
          </div>
        </div>
        </div>

          
          <div  className="mx-auto box-content px-4 text-start text-richblack-5 lg:w-[1260px]">
            <div className="mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px]">

              {/* What will you learn section */}
          <div className="my-8 border border-richblack-600 p-8">
            <p className="text-3xl font-semibold">What you'll learn</p>
            <div className="mt-5">
              {/* <ReactMarkdown> */}
              {whatYouWillLearn}
              {/* </ReactMarkdown> */}
            </div>
          </div>

          {/* Course Content Section */}

          <div className="max-w-[830px] ">
          <div className="flex flex-col gap-3">
              <p className="text-[28px] font-semibold">Course Content</p>
              <div className="flex flex-wrap justify-between gap-2">
                <div className="flex gap-2">
                  <span>
                    {courseContent.length} {`section(s)`}
                  </span>
                  <span>
                    {totalNoOfLectures} {`lecture(s)`}
                  </span>
                  <span>{totalCourseDuration} total length</span>
                </div>
                <div>
                  <button
                    className="text-yellow-25"
                    onClick={() => setIsActive([])}
                  >
                    Collapse all sections
                  </button>
                </div>
              </div>
            </div>



          </div>

             {/* Course Details Accordion */}
             <div className="py-4">
              {courseContent?.map((course, index) => (
                <CourseAccordionBar
                  course={course}
                  key={index}
                  isActive={isActive}
                  handleActive={handleActive}
                />
              ))}
            </div>

               {/* Author Details */}
            <div className="mb-12 py-4">
              <p className="text-[28px] font-semibold">Author</p>
              <div className="flex items-center gap-4 py-4">
                <img
                  src={
                    instructor.image
                      ? instructor.image
                      : `https://api.dicebear.com/5.x/initials/svg?seed=${instructor.firstName} ${instructor.lastName}`
                  }
                  alt="Author"
                  className="h-14 w-14 rounded-full object-cover"
                />
                <p className="text-lg">{`${instructor.firstName} ${instructor.lastName}`}</p>
              </div>
              <p className="text-richblack-50">
                {instructor?.additionalDetails?.about}
              </p>
            </div>

            </div>

          </div>

          <Footer />
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}

    </div>
  )
}

export default CourseDetails
