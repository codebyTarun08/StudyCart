import React from 'react'
import IconBtn from '../common/IconBtn'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { RiEditBoxLine } from "react-icons/ri";
const MyProfile = () => {
  const { user } = useSelector((state) => state.profile);
  const navigate = useNavigate();
  return (
    <div className="w-full max-w-[792px] mx-auto px-2 sm:px-6">
      <h1 className="mb-8 sm:mb-14 text-2xl sm:text-3xl font-medium text-richblack-5">
        My Profile
      </h1>

      <div className="my-6 sm:my-10 flex sm:flex-row items-center sm:items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-4 sm:p-8 sm:px-12 gap-4 sm:gap-0">
        <div className="flex items-center gap-x-4">
          <img
            src={user?.image}
            alt={`profile-${user?.firstName + " " + user?.lastName}`}
            className="aspect-square w-[60px] sm:w-[70px] rounded-full object-cover"
          />
          <div className="space-y-1">
            <p className="text-base sm:text-lg font-semibold text-richblack-5">
              {user?.firstName + " " + user?.lastName}
            </p>
            <p className="text-xs sm:text-sm text-richblack-300">
              {user?.email}
            </p>
          </div>
        </div>

        <button
          onClick={() => navigate("/dashboard/settings")}
          className="flex gap-x-1 items-center px-4 sm:px-6 py-2 rounded-lg bg-yellow-50 text-richblack-900 text-xs sm:text-sm"
        >
          <RiEditBoxLine />
          <span>Edit</span>
        </button>
      </div>

      <div className="my-6 sm:my-10 flex flex-col rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-4 sm:p-8 sm:px-12 gap-y-2">
        <div className="flex flex-row justify-between gap-2 sm:gap-0">
          <p className="text-base sm:text-lg font-semibold text-richblack-5">
            About
          </p>
          <button
            onClick={() => navigate("/dashboard/settings")}
            className="flex gap-x-1 items-center px-4 sm:px-6 py-2 rounded-lg bg-yellow-50 text-richblack-900 text-xs sm:text-sm"
          >
            <RiEditBoxLine />
            <span>Edit</span>
          </button>
        </div>
        <p className="text-xs sm:text-sm text-richblack-400">
          {user?.additionalDetails?.about ?? "Write Something about you."}
        </p>
      </div>

      <div className="flex flex-col rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-4 sm:p-8 sm:px-12 gap-y-2">
        <div className="flex flex-row justify-between gap-2 sm:gap-0">
          <p className="text-base sm:text-lg font-semibold text-richblack-5">
            Personal Details
          </p>
          <button
            onClick={() => navigate("/dashboard/settings")}
            className="flex gap-x-1 items-center px-4 sm:px-6 py-2 rounded-lg bg-yellow-50 text-richblack-900 text-xs sm:text-sm"
          >
            <RiEditBoxLine />
            <span>Edit</span>
          </button>
        </div>

        <div className="flex flex-col sm:flex-row w-full sm:w-3/5 gap-y-4 sm:gap-x-1 justify-between">
          <div className="flex flex-col justify-between gap-y-1">
            <div className="flex flex-col">
              <p className="text-richblack-500 text-xs sm:text-sm">First Name</p>
              <p className="text-richblack-5 text-xs sm:text-sm">{user?.firstName}</p>
            </div>
            <div className="flex flex-col">
              <p className="text-richblack-500 text-xs sm:text-sm">E-Mail</p>
              <p className="text-richblack-5 text-xs sm:text-sm">{user?.email}</p>
            </div>
            <div className="flex flex-col">
              <p className="text-richblack-500 text-xs sm:text-sm">Gender</p>
              <p className="text-richblack-5 text-xs sm:text-sm">{user?.additionalDetails?.gender}</p>
            </div>
          </div>

          <div className="flex flex-col justify-between gap-y-1">
            <div className="flex flex-col">
              <p className="text-richblack-500 text-xs sm:text-sm">Last Name</p>
              <p className="text-richblack-5 text-xs sm:text-sm">{user?.lastName}</p>
            </div>
            <div className="flex flex-col">
              <p className="text-richblack-500 text-xs sm:text-sm">Phone Number</p>
              <p className="text-richblack-5 text-xs sm:text-sm">
                {user?.additionalDetails?.contactNumber ?? "Not Found"}
              </p>
            </div>
            <div className="flex flex-col">
              <p className="text-richblack-500 text-xs sm:text-sm">Date Of Birth</p>
              <p className="text-richblack-5 text-xs sm:text-sm">
                {user?.additionalDetails?.dateOfBirth ?? "Not Found"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfile