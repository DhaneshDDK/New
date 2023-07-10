import React from 'react'
import { RiDeleteBin6Line } from "react-icons/ri"
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import GetAvgRating from '../../../../utils/avgRating'
import RatingStars from '../../../Common/RatingStars'
import { removeItemsFromCart } from '../../../../Redux/Slices/cartSlice'
import { useNavigate } from 'react-router-dom'

const CartCourses = () => {

    const {cart, removeFromCart} = useSelector((state)=>state.cart)
    const dispatch = useDispatch();
    const navigate = useNavigate();
  return (
    <div>

<div className="flex flex-1 flex-col">
      {cart.map((course, indx) => {
        const avgReviewCount = GetAvgRating(course?.ratingAndReviews)
        return <div
          key={course._id}
          className={`flex w-full flex-wrap items-start justify-between gap-6 ${
            indx !== cart.length - 1 && "border-b border-b-richblack-400 pb-6"
          } ${indx !== 0 && "mt-6"} `}
        >
          <div className="flex flex-1 flex-col gap-4 xl:flex-row">
            <img
              src={course?.thumbnail}
              alt={course?.courseName}
              className="h-[148px] w-[220px] rounded-lg object-cover cursor-pointer"
              onClick={()=> navigate(`/courses/${course._id}`)}
            />
            <div className="flex flex-col space-y-1">
              <p className="text-lg font-medium text-richblack-5 cursor-pointer"
              onClick={()=> navigate(`/courses/${course._id}`)}>
                {course?.courseName}
              </p>
              <p className="text-sm text-richblack-300">
                {course?.category?.name}
              </p>
              <div className="flex items-center gap-2">
                <span className="text-yellow-5">{avgReviewCount}</span>
                <RatingStars Review_Count={avgReviewCount} Star_Size={20} />
                <span className="text-richblack-400">
                  {course?.ratingAndReviews?.length} Ratings
                </span>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center  space-y-2">
            <button
              onClick={ () => dispatch(removeItemsFromCart(course._id)) }
              className="flex items-center gap-x-1 rounded-md border border-richblack-600 bg-richblack-700 py-2 px-[10px] text-pink-200"
            >
              <RiDeleteBin6Line />
              <span>Remove</span>
            </button>
            <p className="mb-6 text-3xl font-medium text-yellow-100">
              ₹ {course?.price}
            </p>
          </div>
        </div>
      })}
    </div>
      
    </div>
  )
}

export default CartCourses
