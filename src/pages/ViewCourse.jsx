import React,{useState,useEffect} from 'react'
import { useSelector } from 'react-redux';
import { Outlet,useParams} from 'react-router-dom';
import {getFullDetailsOfCourse} from "../services/operations/courseDetailsAPI"
import { useDispatch } from 'react-redux';
import{
    setCompletedLectures,
    setCourseSectionData,
    setEntireCourseData,
    setTotalNoOfLectures,
} from '../slices/viewCourseSlice'
import CourseReviewModal from '../components/core/ViewCourse/CourseReviewModal'
import VideoDetailsSidebar from '../components/core/ViewCourse/VideoDetailsSidebar'
const ViewCourse = () => {
    const {courseId} = useParams();
    const {token} = useSelector((state)=>state.auth);
    const dispatch = useDispatch();
    const [reviewModal,setReviewModal] = useState(false);

    useEffect(()=>{
        const setCourseSpecificDetails = async()=>{
            const courseData = await getFullDetailsOfCourse(courseId,token);
            console.log(courseData);
            dispatch(setCourseSectionData(courseData.courseDetails.courseContent))
            dispatch(setEntireCourseData(courseData.courseDetails))
            dispatch(setCompletedLectures(courseData.completedVideos))

            let lectures=0;
            courseData?.courseDetails?.courseContent?.forEach((sec)=>{
              lectures+=sec.subSection.length
            })
            dispatch(setTotalNoOfLectures(lectures));
        }
        setCourseSpecificDetails();
    },[])
  return (
    <>
      <div className="relative flex flex-col lg:flex-row min-h-[calc(100vh-3.5rem)]">
        <VideoDetailsSidebar setReviewModal={setReviewModal} />
        <div className="h-[calc(100vh-3.5rem)] mt-20 lg:mt-0 flex-1 overflow-auto">
          <div className="mx-6">
            <Outlet />
          </div>
        </div>
      </div>
      {reviewModal && <CourseReviewModal setReviewModal={setReviewModal} />}
    </>
  )
}

export default ViewCourse