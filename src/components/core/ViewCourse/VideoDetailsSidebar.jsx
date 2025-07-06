import React, { useEffect, useState } from 'react'
import {useSelector} from 'react-redux'
import {useLocation,useNavigate} from 'react-router-dom'
import { BsChevronDown } from "react-icons/bs"
import { IoIosArrowBack } from "react-icons/io"
import { useParams } from 'react-router-dom'
import IconBtn from "../../core/common/IconBtn"
const VideoDetailsSidebar = ({ setReviewModal }) => {

  const [activeStatus,setActiveStatus] = useState("");
  const [videoBarActive,setVideoBarActive] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const {sectionId,subSectionId} = useParams();

  const {
    courseSectionData,
    courseEntireData,
    totalNoOfLectures,
    completedLectures
  } = useSelector((state)=>state.viewCourse)

  useEffect(()=>{
    const setActiveFlags= ()=>{
      if(!courseSectionData.length){
        return ;
      }
      const currentSectionIndex = courseSectionData.findIndex(
        (data)=>data._id===sectionId
      )
      const currentSubSectionIndex=
      courseSectionData?.[currentSectionIndex]?.subSection.findIndex(
        (data)=> data._id === subSectionId
      );

      const activeSubSectionId = courseSectionData?.[currentSectionIndex]?.subSection?.[currentSubSectionIndex]?._id;

      setActiveStatus(courseSectionData?.[currentSectionIndex]?._id)
      setVideoBarActive(activeSubSectionId);
    }
    setActiveFlags();
  },[courseSectionData, courseEntireData, location.pathname]);
  // Responsive sidebar with hamburger menu for mobile view
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Close sidebar on route change (mobile)
  useEffect(() => {
  setIsSidebarOpen(false);
  }, [location.pathname]);

  return (
  <>
    {/* Hamburger for mobile (hide when sidebar is open) */}
    {!isSidebarOpen && (
    <div className="md:hidden absolute top-6 left-6 z-50">
      <button
      onClick={() => setIsSidebarOpen((prev) => !prev)}
      className="p-2 rounded bg-richblack-700 text-richblack-25"
      aria-label="Open sidebar"
      >
      <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
        <rect y="4" width="24" height="2" rx="1" fill="currentColor" />
        <rect y="11" width="24" height="2" rx="1" fill="currentColor" />
        <rect y="18" width="24" height="2" rx="1" fill="currentColor" />
      </svg>
      </button>
    </div>
    )}

    {/* Sidebar */}
    <div
    className={`
      fixed top-0 left-0 z-40 h-full w-[80vw] max-w-[350px] bg-richblack-800 border-r border-richblack-700
      transition-transform duration-300
      ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"}
      md:static md:translate-x-0 md:h-[calc(100vh-3.5rem)] md:w-[320px] md:max-w-[350px]
      flex flex-col
    `}
    >
    {/* Close button for mobile */}
    <div className="md:hidden flex justify-end p-4">
      <button
      onClick={() => setIsSidebarOpen(false)}
      className="p-2 rounded bg-richblack-700 text-richblack-25"
      aria-label="Close sidebar"
      >
      <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
        <line x1="6" y1="6" x2="18" y2="18" stroke="currentColor" strokeWidth="2"/>
        <line x1="6" y1="18" x2="18" y2="6" stroke="currentColor" strokeWidth="2"/>
      </svg>
      </button>
    </div>
    <div className="mx-5 flex flex-col items-start justify-between gap-2 gap-y-4 border-b border-richblack-600 py-5 text-lg font-bold text-richblack-25">
      <div className="flex w-full items-center justify-between ">
      <div
        onClick={() => {
        navigate(`/dashboard/enrolled-courses`)
        }}
        className="flex h-[35px] w-[35px] items-center justify-center rounded-full bg-richblack-100 p-1 text-richblack-700 hover:scale-90"
        title="back"
      >
        <IoIosArrowBack size={30} />
      </div>
      <IconBtn
        text="Add Review"
        customClasses="ml-auto"
        onclick={() => setReviewModal(true)}
      />
      </div>
      <div className="flex flex-col">
      <p>{courseEntireData?.courseName}</p>
      <p className="text-sm font-semibold text-richblack-500">
        {completedLectures?.length} / {totalNoOfLectures}
      </p>
      </div>
    </div>

    <div className="h-[calc(100vh - 5rem)] overflow-y-auto">
      {courseSectionData.map((course, index) => (
      <div
        className="mt-2 cursor-pointer text-sm text-richblack-5"
        onClick={() => setActiveStatus(course?._id)}
        key={index}
      >
        {/* Section */}
        <div className="flex flex-row justify-between bg-richblack-600 px-5 py-4">
        <div className="w-[70%] font-semibold">
          {course?.sectionName}
        </div>
        <div className="flex items-center gap-3">
          <span
          className={`${
            activeStatus === course?.sectionName
            ? "rotate-0"
            : "rotate-180"
          } transition-all duration-500`}
          >
          <BsChevronDown />
          </span>
        </div>
        </div>

        {/* Sub Sections */}
        {activeStatus === course?._id && (
        <div className="transition-[height] duration-500 ease-in-out">
          {course.subSection.map((topic, i) => (
          <div
            className={`flex gap-3  px-5 py-2 ${
            videoBarActive === topic._id
              ? "bg-yellow-200 font-semibold text-richblack-800"
              : "hover:bg-richblack-900"
            } `}
            key={i}
            onClick={() => {
            navigate(
              `/view-course/${courseEntireData?._id}/section/${course?._id}/sub-section/${topic?._id}`
            )
            setVideoBarActive(topic._id)
            }}
          >
            <input
            type="checkbox"
            checked={completedLectures.includes(topic?._id)}
            onChange={() => {}}
            />
            {topic.title}
          </div>
          ))}
        </div>
        )}
      </div>
      ))}
    </div>
    </div>

    {/* Overlay for mobile when sidebar is open */}
    {isSidebarOpen && (
    <div
      className="fixed inset-0 z-30 bg-black bg-opacity-40 md:hidden"
      onClick={() => setIsSidebarOpen(false)}
    />
    )}
  </>
  )
}

export default VideoDetailsSidebar