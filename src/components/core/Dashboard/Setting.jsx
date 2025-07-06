import React from 'react'
import ChangeProfilePicture from './Setting/ChangeProfilePicture'
import EditProfile from './Setting/EditProfile'
import UpdatePassword from './Setting/UpdatePassword'
import DeleteAccount from './Setting/DeleteAccount'
const Setting = () => {
  return (
    <>
      <h1 className="mb-14 text-3xl font-medium text-richblack-5">
        Edit Profile
      </h1>
      {/* Change Profile Picture */}
      <ChangeProfilePicture />
      {/* Profile */}
      <EditProfile />
      {/* Password */}
      <UpdatePassword />
      {/* Delete Account */}
      <DeleteAccount />
    </>
  )
}

export default Setting