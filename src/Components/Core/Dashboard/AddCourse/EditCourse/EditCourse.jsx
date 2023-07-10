import React from 'react'
import RenderSteps from '../RenderSteps'
import { ScaleLoader } from 'react-spinners';
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { useParams } from "react-router-dom"
import { fetchCourseDetails } from '../../../../../Services/Operations/CourseAPI';
import { setCourse, setEditCourse , setCategoryVal} from '../../../../../Redux/Slices/CourseSlice';

const EditCourse = () => {

    const dispatch = useDispatch()
    const { courseId } = useParams()
    const [loading, setLoading] = useState(false)

    
    useEffect(()=>{
       const fetchCourseDetailsFunc = async ()=>{
           setLoading(true);
           const result = await fetchCourseDetails(courseId);
        //    console.log(result.category._id);
           if (result) {
               dispatch(setEditCourse(true))
               dispatch(setCourse(result))
               dispatch(setCategoryVal(result.category._id))
             }
             setLoading(false);
        }
        fetchCourseDetailsFunc();
        
   },[])


  return (
    loading ?  
    <div className="grid flex-1 place-items-center">
    <div className='min-h-[calc(100vh-25rem)] flex items-center justify-center'><ScaleLoader color='lime'/></div>
    </div>
      : 
    <div>
      <h1 className="mb-14 text-3xl font-medium text-richblack-5">
        Edit Course
      </h1>
      <div className="mx-auto max-w-[600px]">
        {1? (
          <RenderSteps />
        ) : (
          <p className="mt-14 text-center text-3xl font-semibold text-richblack-100">
            Course not found
          </p>
        )}
      </div>
    </div>
  )
}

export default EditCourse
