import React from 'react'
import { RiEditBoxLine } from "react-icons/ri"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { formattedDate } from '../../../utils/dataFormatter'
import IconBtn from '../../Common/IconButton'

const MyProfile = () => {
  const { user } = useSelector((state) => state.profile)
  const navigate = useNavigate();

  return (
    <div>
      <div className='flex items-center justify-between mb-10 '>
      <h1 className="text-3xl font-bold text-richblack-5">
        My Profile    
      </h1>
      <div className='md:hidden'>
      <IconBtn 
          text="Edit"
          onclick={() => {
            navigate("/dashboard/settings")
          }}
        >
          <RiEditBoxLine />
        </IconBtn>
        </div>
      </div>
     
     
     
      <div className='border-[1px] border-richblack-700 rounded-md'>
      <div className="flex items-center justify-center sm:justify-between rounded-md bg-richblack-800 p-4 px-4 sm:px-12">
        <div className="flex flex-col sm:flex-row justify-center sm:justify-start items-center gap-x-4">
          <img
            src={(user?.image) ?? `https://api.dicebear.com/5.x/initials/svg?seed=${user.firstName} ${user.lastName}`}
            alt={`profile-${user?.firstName}`}
            className="aspect-square w-[60px] rounded-full object-cover"
          />
          <div className="space-y-1 flex flex-col items-center justify-center md:items-start">
            <p className="text-lg font-semibold text-richblack-5">
              {user?.firstName + " " + user?.lastName}
            </p>
            <p className="text-sm font-medium text-richblack-300">{user?.email}</p>
          </div>
        </div>
        <div className='hidden md:block'>
        <IconBtn 
          text="Edit"
          onclick={() => {
            navigate("/dashboard/settings")
          }}
        >
          <RiEditBoxLine />
        </IconBtn></div>
      </div>
      <div className="my-4 flex flex-col gap-y-2 rounded-md bg-richblack-800 p-4 sm:px-12">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-richblack-5">About</p>
          <div  className='hidden md:block'>
          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings")
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
          </div>
        </div>
        <p
          className={`${
            user?.additionalDetails?.about
              ? "text-richblack-5"
              : "text-richblack-400"
          } text-sm font-medium`}
        >

          {user?.additionalDetails?.about ?? "Write Something About Yourself"}
        </p>
      </div>
      <div className="mt-4 flex flex-col gap-y-4 rounded-md bg-richblack-800 py-8 px-4 sm:px-12">
        <div className="flex w-full items-center justify-between">
          <p className="text-lg font-semibold text-richblack-5">
            Personal Details
          </p>
          <div  className='hidden md:block'>
          <IconBtn
            text="Edit"
            onclick={() => {
              navigate("/dashboard/settings")
            }}
          >
            <RiEditBoxLine />
          </IconBtn>
          </div>
        </div>
        <div className="flex flex-col md:flex-row max-w-[500px] justify-between">
          <div className="flex flex-col gap-y-5">
            <div>
              <p className="mb-2 text-sm text-richblack-600 hidden md:block">First Name</p>
              <p className="mb-2 text-sm text-richblack-600 md:hidden"> Name</p>
              <p className="hidden md:block text-sm font-medium text-richblack-5">
                {user?.firstName}
              </p>
              <p className="md:hidden text-sm font-medium text-richblack-5">
                {user?.firstName} {" "} {user?.lastName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Email</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.email}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Gender</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.additionalDetails?.gender ?? "Add Gender"}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-y-5">
            <div className='hidden md:block'>
              <p className="mb-2 text-sm text-richblack-600">Last Name</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.lastName}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Phone Number</p>
              <p className="text-sm font-medium text-richblack-5">
                {user?.additionalDetails?.contactNumber ?? "Add Contact Number"}
              </p>
            </div>
            <div>
              <p className="mb-2 text-sm text-richblack-600">Date Of Birth</p>
              <p className="text-sm font-medium text-richblack-5">
                {formattedDate(user?.additionalDetails?.dateOfBirth) ??
                  "Add Date Of Birth"}
              </p>
            </div>
          </div>
        </div>
      </div>  
      </div>
    </div>
  )
}

export default MyProfile
