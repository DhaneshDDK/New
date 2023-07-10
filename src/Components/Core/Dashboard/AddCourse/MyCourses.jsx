import React from 'react'
import { useEffect, useState } from "react"
import { VscAdd } from "react-icons/vsc"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { fetchInstructorCourses } from '../../../../Services/Operations/CourseAPI'
import IconButton from '../../../Common/IconButton'
import CoursesTable from '../InstructorCourses/CoursesTable'
import { ScaleLoader } from 'react-spinners';

const MyCourses = () => {

  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const [courses, setCourses] = useState([])

  useEffect(() => {
    const fetchCourses = async () => {
      const result = await fetchInstructorCourses(token)
      if (result) {
        setCourses(result)
      }
    }
    fetchCourses()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // console.log('Courses',courses); 


  return (
    <div>

      <div className="mb-14 flex items-center justify-between">
        <h1 className="text-3xl font-semibold text-richblack-5">My Courses</h1>
        <IconButton
          text="Add Course"
          onclick={() => navigate("/dashboard/add-course")}
        >
          <VscAdd />
        </IconButton>
      </div>

      { 
        
        (courses)? <CoursesTable courses={courses} setCourses={setCourses} />
       : (<div className='min-h-[calc(100vh-25rem)] flex items-center justify-center'><ScaleLoader color='lime'/></div>)
      }
      
    </div>
  )
}

export default MyCourses
