import React from 'react'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import { VscSignOut } from 'react-icons/vsc';
import {sidebarLinks} from '../../../data/dashboard-links'
import SideBarLink from './SideBarLink';
import { useSelector } from 'react-redux';
import { logout } from '../../../Services/Operations/authAPI';
import { useState } from 'react';
import ConfirmationModal from '../../Common/ConfirmationModal';

const Sidebar = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user} = useSelector((state) => state.profile);
    const [confirmationModal, setConfirmationModal] = useState(null);
  return (
    <div>
     <div className="flex h-[calc(100vh-4rem)] min-w-[210px] flex-col border-r-[1px] border-r-richblack-700 bg-richblack-800 py-10">
        <div className="flex flex-col gap-1 text-richblack-300 ">
          {sidebarLinks.map((link) => {
            if (link.type && user?.accountType !== link.type) return null
            return (
              <SideBarLink key={link.id} link={link} iconName={link.icon} />
            )
          })}
        </div>
        <div className="mx-auto my-6 h-[1px] w-10/12 bg-richblack-700" />
         
         <div className="flex flex-col gap-2 text-richblack-300">
          <SideBarLink
            link={{ name: "Settings", path: "/dashboard/settings" }}
            iconName="VscSettingsGear"
          />
          <button
            onClick={() =>
              setConfirmationModal({
                text1: "Are you sure?",
                text2: "You will be logged out of your account.",
                btn1Text: "Logout",
                btn2Text: "Cancel",
                btn1Handler: () => (logout(navigate,dispatch)),
                btn2Handler: () => setConfirmationModal(null),
              })
            }
            className="text-sm font-medium text-richblack-300"
          >
            <div className="flex items-center gap-x-3 px-4">
              <VscSignOut className="text-lg" />
              <span>Logout</span>
            </div>
          </button>

        </div>
      </div>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}

    </div>
  )
}

export default Sidebar
