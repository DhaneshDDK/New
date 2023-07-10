import React from 'react'
import { FiTrash2 } from "react-icons/fi"
import { deleteProfile } from '../../../../Services/Operations/Settings'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import ConfirmationModal from '../../../Common/ConfirmationModal'
import { useState } from 'react'

const DeleteAccount = () => {
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const { token } = useSelector((state)=> state.auth);

   const [deleteAccount, setDeleteAccount] = useState(null);

  return (
    <div>
      <div className="my-10 flex flex-row gap-x-5 rounded-md border-[1px] border-pink-700 bg-pink-900 p-8 px-4 md:px-12">
        <div className="flex aspect-square h-14 w-14 items-center justify-center rounded-full bg-pink-700">
          <FiTrash2 className="text-2xl text-pink-200" />
        </div>
        <div className="flex flex-col space-y-2">
          <h2 className="text-lg font-semibold text-richblack-5">
            Delete Account
          </h2>
          <div className="sm:w-3/5 text-pink-25 text-sm font-medium">
            <p>Would you like to delete account?</p>
            <p>
              This account may contain Paid Courses. Deleting your account is permanent and will remove all the content associated with it.
            </p>
          </div>
          <button
            type="button"
            className="w-fit text-left cursor-pointer italic text-pink-300"
            onClick={()=>{setDeleteAccount({
                text1: "Are you sure?",
                text2: "Deleting your account is permanent and will remove all the content associated with it.",
                btn1Text: "Delete",
                btn2Text: "Cancel",
                btn1Handler: () => deleteProfile(token,navigate, dispatch),
                btn2Handler: () => setDeleteAccount(null),
              })}}
          >
            I want to delete my account.
          </button>
        </div>
      </div>
      {deleteAccount &&  <ConfirmationModal modalData={deleteAccount} />  }
    </div>
  )
}

export default DeleteAccount
