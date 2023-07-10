import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { Outlet, useParams } from 'react-router-dom';
import Hamburger from 'hamburger-react'

import { setSideBar } from '../Redux/Slices/authSlice';
import VideoDetailsSidebar from '../Components/Core/ViewCourse/VideoDetailsSidebar';
import CourseReviewModal from '../Components/Core/ViewCourse/CourseReviewModal';
import { setCompletedLectures, setCourseSectionData, setEntireCourseData, setTotalNoOfLectures } from '../Redux/Slices/ViewCourseSlice';
import { getFullDetailsOfCourse } from '../Services/Operations/CourseAPI';

const ViewCourse = () => {
  
  const [reviewModal, setReviewModal] = useState(false);
  const {courseId} = useParams();
  const {token,sidebar } = useSelector((state)=>state.auth);
  const dispatch = useDispatch();
  const [isOpen, setOpen] = useState(false)

  useEffect(()=> {
    const setCourseSpecificDetails = async() => {
          const courseData = await getFullDetailsOfCourse(courseId, token);
          dispatch(setCourseSectionData(courseData.courseDetails.courseContent));
          dispatch(setEntireCourseData(courseData.courseDetails));
          dispatch(setCompletedLectures(courseData.completedVideos));
          let lectures = 0;
          courseData?.courseDetails?.courseContent?.forEach((sec) => {
            lectures += sec.subSection.length
          })  
          dispatch(setTotalNoOfLectures(lectures));
    }
    setCourseSpecificDetails();
},[]);

  return (
     <div>
             <div className="relative flex min-h-[calc(100vh-3.5rem)]">
              <div className={`${ sidebar? "block" : "hidden" } md:block absolute z-[100] md:z-0 md:relative`}> <VideoDetailsSidebar setReviewModal={setReviewModal} /> </div> 
        <div className="h-[calc(100vh-3.5rem)] flex-1 overflow-auto">
          <div className="mx-6">
          <div className={`md:hidden ${isOpen? "ml-[300px]" : "-ml-3"} mb-3 w-fit`} onClick={()=>dispatch(setSideBar(!isOpen))}> <Hamburger color='white' size={20}  toggled={isOpen} toggle={setOpen} /> </div>
            <Outlet />
          </div>
        </div>
      </div>
      {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
        </div>
        
  )
}

export default ViewCourse
