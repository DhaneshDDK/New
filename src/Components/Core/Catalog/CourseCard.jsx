import React from 'react'
import { Link } from 'react-router-dom';
import { useState } from 'react';
import RatingStars from '../../Common/RatingStars';
import GetAvgRating from '../../../utils/avgRating';
import { useEffect } from 'react';

const CourseCard = ({course, Height}) => {

    const [avgReviewCount, setAvgReviewCount] = useState(0);

    useEffect(()=> {
        const count = GetAvgRating(course.ratingAndReviews);
        setAvgReviewCount(count);
    },[course])


    
  return (
    <div>
        <Link to={`/courses/${course._id}`}>
        <div className="">
          <div className="rounded-lg mr-8 sm:mr-0">
            <img
              src={course?.thumbnail}
              alt="course thumnail"
              className={` ${Height} w-full rounded-xl object-cover`}
            />
          </div>
          <div className="flex flex-col gap-2 px-1 py-3">
            <p className="text-xl text-richblack-5">{course?.courseName}</p>
            <p className="text-sm font-bold text-richblack-50">
              {course?.instructor?.firstName} {course?.instructor?.lastName}
            </p>
            <div className="flex items-center gap-2">
              {/* <span className="text-yellow-5">{avgReviewCount || 0}</span> */}
              <RatingStars Review_Count={avgReviewCount} />
              <span className="text-richblack-400">
                {course?.ratingAndReviews?.length} Ratings
              </span>
            </div>
            <p className="text-md text-richblack-5">Rs. {course?.price}</p>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default CourseCard
