import React from 'react'
import {TbLogout} from 'react-icons/tb'
import {CgProfile} from 'react-icons/cg'
import {RxDashboard} from 'react-icons/rx'
import {logout} from '../../../Services/Operations/authAPI'
import { Link } from 'react-router-dom'
import { useState } from 'react'
import ConfirmationModal from '../../Common/ConfirmationModal'

const ProfileDropDown = ({setOpenProfile,navigate,dispatch}) => {
 
  const [confirmationModal, setConfirmationModal] = useState(null);  
  return (
    <div>
        <div className='min-h-[7.5em] absolute text-richblack-25 flex pl-6 flex-col py-4 gap-3 text-sm font-medium top-[40px] right-0 origin-top transition-all duration-200 ease-in-out rounded-md max-w-maxContent w-[15em] z-10 bg-richblack-800 border border-richblue-400 shadow-sm'>
                              
            {/* <Link onClick={()=>setOpenProfile(false)} to={'/'} className='flex items-center gap-3 hover:text-caribbeangreen-200 '> <RxDashboard size={25} color='green'/> <div className='border-b border-dotted border-pure-greys-100 w-[100%]'>My Dashboard</div></Link> */}
            <Link onClick={()=>setOpenProfile(false)} to={'dashboard/my-profile'} className='flex items-center gap-3 hover:text-caribbeangreen-200'> <CgProfile size={25} color='green'/> <div className='border-b border-dotted border-pure-greys-100 w-[100%]'>My Profile</div></Link>
            <div className='flex items-center gap-3 hover:text-caribbeangreen-200'  onClick={() =>
              {setConfirmationModal({
                text1: "Are you sure?",
                text2: "You will be logged out of your account.",
                btn1Text: "Logout",
                btn2Text: "Cancel",
                btn1Handler: () => (logout(navigate,dispatch)),
                btn2Handler: () => setConfirmationModal(null),
              }); }
            }> 
            <TbLogout size={25} color='green'/> <div className='border-b border-dotted border-pure-greys-100 w-[100%]'>Logout</div></div>
          </div>  
          {confirmationModal && <ConfirmationModal modalData={confirmationModal} />
          }

    </div>
  )
}

export default ProfileDropDown
