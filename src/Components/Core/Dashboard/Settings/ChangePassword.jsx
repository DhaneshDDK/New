import React from 'react'
import {useForm} from 'react-hook-form'
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useState } from 'react'
import IconButton from '../../../Common/IconButton'
import { useSelector } from 'react-redux'
import { updatePassword } from '../../../../Services/Operations/Settings'

const ChangePassword = () => {
  const {register, handleSubmit , reset, formState : {errors}} = useForm();
  const [showOldPassword, setShowOldPassword] = useState(false)
  const [showNewPassword, setShowNewPassword] = useState(false)

  const {token} = useSelector((state)=>state.auth);

  const submitPasswordForm = async (data) => {
    try {
      await updatePassword(token, data)
    } catch (error) {
      console.log("ERROR MESSAGE - ", error.message)
    }
  }
  
  return (
    <div>
        <form  onSubmit={handleSubmit(submitPasswordForm)}>
             <div className="my-10 flex flex-col gap-y-5 rounded-md border-[1px] border-richblack-700 bg-richblack-800 pt-5 pb-8 px-4 md:px-12">
              <h2 className="text-lg font-semibold text-richblack-5">Password</h2>
                
                <div className='flex gap-5 items-start flex-col'>
               
                <div  className="relative flex flex-col gap-2 w-[100%] lg:w-[48%]">
                <label htmlFor="oldPassword" className="lable-style">
                Current Password
                </label>

                <input
                type={showOldPassword ? "text" : "password"}
                name="oldPassword"
                id="oldPassword"
                placeholder="Enter Current Password"
                className="form-style"
                {...register("oldPassword", { required: true })}
              />

                  <span
                onClick={() => setShowOldPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              >
                {showOldPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>

              {errors.oldPassword && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your Current Password.
                </span>
              )}

                </div>

                <div className='flex items-center flex-col lg:flex-row gap-5 w-[100%]'>

                <div className='relative flex flex-col gap-2 w-[100%] lg:w-[48%]'>
                  <label htmlFor="newPassword" className="lable-style">
                  New Password
                  </label>
                    <input
                      type={showNewPassword ? "text" : "password"}
                      name="newPassword"
                      id="newPassword"
                      placeholder="Enter New Password"
                      className="form-style"
                      {...register("newPassword", { required: true })}
                    />  
                    <span
                onClick={() => setShowNewPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              >
                {showNewPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>

              {errors.newPassword && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your New Password.
                </span>
              )}
                </div>
                <div className='relative flex flex-col gap-2 w-[100%] lg:w-[48%]'>
                  <label htmlFor="newPassword" className="lable-style">
                 Confirm New Password
                  </label>
                    <input
                      type={showNewPassword ? "text" : "password"}
                      name="confirmNewPassword"
                      id="confirmNewPassword"
                      placeholder="Enter Confirm New Password"
                      className="form-style"
                      {...register("confirmNewPassword", { required: true })}
                    />  
                    <span
                onClick={() => setShowNewPassword((prev) => !prev)}
                className="absolute right-3 top-[38px] z-[10] cursor-pointer"
              >
                {showNewPassword ? (
                  <AiOutlineEyeInvisible fontSize={24} fill="#AFB2BF" />
                ) : (
                  <AiOutlineEye fontSize={24} fill="#AFB2BF" />
                )}
              </span>

              {errors.newPassword && (
                <span className="-mt-1 text-[12px] text-yellow-100">
                  Please enter your Confirm New Password.
                </span>
              )}
                </div>

                </div>

                </div>

              </div>
 


             <div className="flex justify-end gap-2">
             <div
            onClick={() => {
              reset();
            }}
            className="cursor-pointer rounded-md bg-richblack-700 py-2 px-5 font-semibold text-richblack-50"
          >
            Cancel
          </div>
          <IconButton type="submit" text="Update" />
             </div>
        </form>
    </div>
  )
}

export default ChangePassword;
