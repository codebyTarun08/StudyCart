import React, { useEffect, useState } from "react"
import { BiInfoCircle } from "react-icons/bi"
import { HiOutlineGlobeAlt } from "react-icons/hi"
import { useDispatch, useSelector } from "react-redux"
import { useNavigate, useParams } from "react-router-dom"

import ConfirmationModal from "../components/core/common/ConfirmationModal"
import Footer from "../components/core/common/Footer"
import RatingStars from "../components/core/common/RatingStars"
import CourseAccordionBar from "../components/course/CourseAccordionBar"
import CourseDetailsCard from "../components/course/CourseDetailsCard"
import { formatDate } from "../services/formatDate"
import { fetchCourseDetails } from "../services/operations/courseDetailsAPI"
import { buyCourse } from "../services/operations/studentFeaturesAPI"
import GetAvgRating from "../utils/avRating"
import ReactMarkdown from "react-markdown"

const CoursePage = () => {
  const { user } = useSelector((state) => state.profile)
  const { token } = useSelector((state) => state.auth)
  const { loading } = useSelector((state) => state.profile)
  const { paymentLoading } = useSelector((state) => state.course)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const { courseId } = useParams()

  const [response, setResponse] = useState(null)
  const [confirmationModal, setConfirmationModal] = useState(null)

  const [avgReviewCount, setAvgReviewCount] = useState(0)
  const [isActive, setIsActive] = useState([])
  const [totalNoOfLectures, setTotalNoOfLectures] = useState(0)

  useEffect(() => {
    ;(async () => {
      try {
        const res = await fetchCourseDetails(courseId)
        setResponse(res?.data)
      } catch (error) {
        console.error("Could not fetch Course Details")
      }
    })()
  }, [courseId])

  useEffect(() => {
    if (response?.ratingAndreviws) {
      const count = GetAvgRating(response.ratingAndreviws)
      setAvgReviewCount(count)
    }
  }, [response])

  useEffect(() => {
    if (response?.courseContent) {
      let lectures = 0
      response.courseContent.forEach((sec) => {
        lectures += sec.subSection?.length || 0
      })
      setTotalNoOfLectures(lectures)
    }
  }, [response])

  const handleActive = (id) => {
    setIsActive(
      isActive.includes(id)
        ? isActive.filter((e) => e !== id)
        : isActive.concat(id)
    )
  }

  const handleBuyCourse = () => {
    if (token) {
      buyCourse(token, [courseId], user, navigate, dispatch)
      return;
    }
    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to Purchase Course.",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    })
  }

  if (loading || !response) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

  const {
    _id: course_id,
    courseName,
    courseDescription,
    thumbnail,
    price,
    whatYouwillLearn,
    courseContent,
    ratingAndreviws,
    instructor = [],
    studentsEnrolled,
    createdAt,
  } = response

  const instructorData = instructor[0]

  if (paymentLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner"></div>
      </div>
    )
  }

  return (
    <>
      <div className="relative w-full bg-richblack-800">
        <div className="mx-auto box-content px-4 lg:w-[1260px] 2xl:relative ">
          <div className="mx-auto grid min-h-[450px] max-w-maxContentTab justify-items-center py-8 lg:mx-0 lg:justify-items-start lg:py-0 xl:max-w-[810px]">
            <div className="relative block max-h-[30rem] lg:hidden">
              <div className="absolute bottom-0 left-0 h-full w-full shadow-[#161D29_0px_-64px_36px_-28px_inset]"></div>
              <img
                src={thumbnail}
                alt="course thumbnail"
                className="aspect-auto w-full"
              />
            </div>
            <div className="z-30 my-5 flex flex-col justify-center gap-4 py-5 text-lg text-richblack-5">
              <p className="text-4xl font-bold sm:text-[42px]">{courseName}</p>
              <p className="text-richblack-200">{courseDescription}</p>
              <div className="text-md flex flex-wrap items-center gap-2">
                <span className="text-yellow-25">{avgReviewCount}</span>
                <RatingStars Review_Count={avgReviewCount} Star_Size={24} />
                <span>({ratingAndreviws?.length || 0} reviews)</span>
                <span>{studentsEnrolled?.length || 0} students enrolled</span>
              </div>
              <p>
                Created By{" "}
                {`${instructorData?.firstName || ""} ${instructorData?.lastName || ""}`}
              </p>
              <div className="flex flex-wrap gap-5 text-lg">
                <p className="flex items-center gap-2">
                  <BiInfoCircle /> Created at {formatDate(createdAt)}
                </p>
                <p className="flex items-center gap-2">
                  <HiOutlineGlobeAlt /> English
                </p>
              </div>
            </div>
            <div className="flex items-center w-full flex-col gap-4 border-y border-y-richblack-500 py-4 lg:hidden">
              <p className="pb-4 text-3xl font-semibold text-richblack-5">
                Rs. {price}
              </p>
              <button className="w-[30%] bg-yellow-100 py-2 rounded-lg text-richblack-900" onClick={handleBuyCourse}>
                Buy Now
              </button>
              <button className="w-[30%]  bg-richblack-200 py-2 rounded-lg text-richblack-900">Add to Cart</button>
            </div>
          </div>
          <div className="right-[1rem] top-[60px] mx-auto hidden min-h-[600px] w-1/3 max-w-[410px] translate-y-24 md:translate-y-0 lg:absolute lg:block">
            <CourseDetailsCard
              course={response}
              setConfirmationModal={setConfirmationModal}
              handleBuyCourse={handleBuyCourse}
            />
          </div>
        </div>
      </div>

      <div className="mx-auto box-content px-4 text-start text-richblack-5 lg:w-[1260px]">
        <div className="mx-auto max-w-maxContentTab lg:mx-0 xl:max-w-[810px]">
          <div className="my-8 border border-richblack-600 p-8">
            <p className="text-3xl font-semibold">What you'll learn</p>
            <div className="mt-5">
              <ReactMarkdown>{whatYouwillLearn}</ReactMarkdown>
            </div>
          </div>

          <div className="max-w-[830px]">
            <div className="flex flex-col gap-3">
              <p className="text-[28px] font-semibold">Course Content</p>
              <div className="flex flex-wrap justify-between gap-2">
                <div className="flex gap-2">
                  <span>{courseContent?.length || 0} section(s)</span>
                  <span>{totalNoOfLectures} lecture(s)</span>
                  <span>{response?.totalDuration || "N/A"} total length</span>
                </div>
                <div>
                  <button
                    className="text-yellow-25"
                    onClick={() => setIsActive([])}
                  >
                    Collapse all sections
                  </button>
                </div>
              </div>
            </div>

            <div className="py-4">
              {courseContent?.map((course, index) => (
                <CourseAccordionBar
                  course={course}
                  key={index}
                  isActive={isActive}
                  handleActive={handleActive}
                />
              ))}
            </div>

            <div className="mb-12 py-4">
              <p className="text-[28px] font-semibold">Author</p>
              <div className="flex items-center gap-4 py-4">
                <img
                  src={
                    instructorData?.image
                      ? instructorData.image
                      : `https://api.dicebear.com/5.x/initials/svg?seed=${instructorData?.firstName || "A"} ${instructorData?.lastName || "I"}`
                  }
                  alt="Author"
                  className="h-14 w-14 rounded-full object-cover"
                />
                <p className="text-lg">{`${instructorData?.firstName || ""} ${instructorData?.lastName || ""}`}</p>
              </div>
              <p className="text-richblack-50">
                {instructorData?.additionalDetails?.about}
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  )
}

export default CoursePage
