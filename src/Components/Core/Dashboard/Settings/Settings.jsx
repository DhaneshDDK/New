import React from 'react'
import ChangeProfilePicture from './ChangeProfilePicture'
import EditProfile from './EditProfile'
import DeleteAccount from './DeleteAccount'
import ChangePassword from './ChangePassword'

const Settings = () => {
  return (
    <div>
      <h1 className="mb-10 text-3xl font-medium text-richblack-5">
        Edit Profile
      </h1>
      <ChangeProfilePicture/>
      <EditProfile/>
       <ChangePassword/>
      <DeleteAccount/>
    </div>
  )
}

export default Settings
