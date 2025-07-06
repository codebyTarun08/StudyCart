import React from "react"
import copy from "copy-to-clipboard"
import { toast } from "react-hot-toast"
import { BsFillCaretRightFill } from "react-icons/bs"
import { FaShareSquare } from "react-icons/fa"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"

import { addToCart } from "../../slices/cartSlice"
import { ACCOUNT_TYPE } from "../../utils/constants"


function CourseDetailsCard({ course, setConfirmationModal, handleBuyCourse }) {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {
    thumbnail: ThumbnailImage,
    price: CurrentPrice,
    _id: courseId,
  } = course

  const handleShare = () => {
    copy(window.location.href)
    toast.success("Link copied to clipboard")
  }

  const handleAddToCart = () => {
    if (user && user?.accountType === ACCOUNT_TYPE.INSTRUCTOR) {
      toast.error("You are an Instructor. You can't buy a course.")
      return
    }
    if (token) {
      dispatch(addToCart(course))
      return
    }
    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to add To Cart",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    })
  }

  // console.log("Student already enrolled ", course?.studentsEnroled, user?._id)

  return (
    <div
      className="flex flex-col gap-4 rounded-md bg-richblack-700 p-4 text-richblack-5 max-w-full md:max-w-[400px] w-full mx-auto"
    >
      {/* Course Image */}
      <img
        src={ThumbnailImage}
        alt={course?.courseName}
        className="w-full max-h-[180px] md:max-h-[300px] min-h-[120px] md:min-h-[180px] overflow-hidden rounded-2xl object-cover"
      />

      <div className="px-0 md:px-4">
        <div className="space-x-2 md:space-x-3 pb-2 md:pb-4 text-xl md:text-3xl font-semibold text-center md:text-left">
          Rs. {CurrentPrice}
        </div>
        <div className="flex flex-col gap-3 md:gap-4">
          <button
            className="bg-yellow-100 py-2 rounded-lg text-richblack-900 text-sm md:text-base"
            onClick={
              user && course?.studentsEnrolled.includes(user?._id)
                ? () => navigate("/dashboard/enrolled-courses")
                : handleBuyCourse
            }
          >
            {user && course?.studentsEnrolled.includes(user?._id)
              ? "Go To Course"
              : "Buy Now"}
          </button>
          {(!user || !course?.studentsEnrolled.includes(user?._id)) && (
            <button
              onClick={handleAddToCart}
              className="bg-richblack-100 py-2 rounded-lg text-richblack-900 text-sm md:text-base"
            >
              Add to Cart
            </button>
          )}
        </div>
        <div>
          <p className="pb-2 md:pb-3 pt-4 md:pt-6 text-center text-xs md:text-sm text-blue-50">
            30-Day Money-Back Guarantee
          </p>
        </div>

        <div>
          <p className="my-2 text-base md:text-xl font-semibold text-center md:text-left">
            This Course Includes :
          </p>
          <div className="flex flex-col gap-2 md:gap-3 text-xs md:text-sm text-caribbeangreen-100">
            {course?.instructions?.map((item, i) => (
              <p className="flex gap-2 items-center" key={i}>
                <BsFillCaretRightFill />
                <span>{item}</span>
              </p>
            ))}
          </div>
        </div>
        <div className="text-center">
          <button
            className="mx-auto flex items-center gap-2 py-4 md:py-6 text-yellow-100 text-sm md:text-base"
            onClick={handleShare}
          >
            <FaShareSquare size={15} /> Share
          </button>
        </div>
      </div>
    </div>
  )
}

export default CourseDetailsCard