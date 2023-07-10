import React from 'react'
import IconButton from '../../../Common/IconButton'
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { buyCourse } from '../../../../Services/Operations/PaymentAPI'
import { resetCart } from '../../../../Redux/Slices/cartSlice'

const TotalCartAmount = () => {

    const { totalPrice, cart , totalItems} = useSelector((state) => state.cart)
    const { token } = useSelector((state) => state.auth)
    const { user } = useSelector((state) => state.profile)
    const navigate = useNavigate()
    const dispatch = useDispatch()


    const handleBuyCourse = async () => {
        const courses = cart.map((course) => course._id)
        buyCourse(token, courses, user, navigate, dispatch);
        // dispatch(resetCart());
      }

  return (
    <div>
       <div className="min-w-[280px] rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-6">
       <p className='text-xl text-richblack-25 my-1'>YOUR CART</p>
       <p className='text-3xl text-richblack-25 font-bold mb-1'>SUMMARY</p>
       <p className='mb-5 text-xl text-richblack-25'>Total Items: <span> {totalItems} </span> </p>
      <p className="mb-6 text-3xl font-medium text-richblack-300">Total Amount: 
      <span className="text-3xl font-medium text-yellow-100"> ₹{totalPrice}</span></p>
      <IconButton
        text="CheckOut Now"
        onclick={handleBuyCourse}
        customClasses="w-full justify-center"
      />
    </div>
    </div>
  )
}

export default TotalCartAmount
