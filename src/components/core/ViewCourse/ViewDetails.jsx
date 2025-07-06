import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams, useLocation } from 'react-router-dom'
import { markLectureAsComplete } from '../../../services/operations/courseDetailsAPI';
import { updateCompletedLectures } from '../../../slices/viewCourseSlice';
import ReactPlayer from "react-player"
import IconBtn from "../common/IconBtn"
const VideoDetails = () => {
    const { courseId, sectionId, subSectionId } = useParams();
    const location = useLocation()
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const playerRef = useRef(null);
    const { token } = useSelector((state) => state.auth)
    const { courseSectionData, courseEntireData, completedLectures } = useSelector((state) => state.viewCourse)

    const [videoData, setVideoData] = useState([]);
    const [previewSource, setPreviewSource] = useState("")
    const [videoEnded, setVideoEnded] = useState(false)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const videoSpecificDetails = async () => {
            if (!courseSectionData.length) {
                return;
            }
            if (!courseId && !sectionId && !subSectionId) {
                navigate('/dashboard/enrolled-courses')
            }
            else {
                const filteredData = courseSectionData.filter((course) => course._id === sectionId);

                const filteredVideoData = filteredData?.[0]?.subSection.filter((data) => data._id === subSectionId)

                setVideoData(filteredVideoData[0])
                setPreviewSource(courseEntireData.thumbnail)
                setVideoEnded(false)
            }
        }
        videoSpecificDetails()
    }, [courseSectionData, courseEntireData, location.pathname])

    const isFirstVideo = () => {
        const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId)

        const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection.findIndex((data) => data._id === subSectionId)

        if (currentSectionIndex === 0 && currentSubSectionIndex === 0) {
            return true;
        }
        else {
            return false;
        }
    }

    const isLastVideo = () => {
        const currentSectionIndx = courseSectionData.findIndex(
            (data) => data._id === sectionId
        )

        const noOfSubsections =
            courseSectionData[currentSectionIndx].subSection.length

        const currentSubSectionIndx = courseSectionData[
            currentSectionIndx
        ].subSection.findIndex((data) => data._id === subSectionId)

        if (
            currentSectionIndx === courseSectionData.length - 1 &&
            currentSubSectionIndx === noOfSubsections - 1
        ) {
            return true
        } else {
            return false
        }
    }

    const goToNextVideo = () => {
        const currentSectionIndex = courseSectionData.findIndex((data) => data._id === sectionId)

        const noOfSubSections = courseSectionData?.[currentSectionIndex]?.subSection.length

        const currentSubSectionIndex = courseSectionData?.[currentSectionIndex]?.subSection.findIndex((data) => data._id === subSectionId)

        if (currentSubSectionIndex != noOfSubSections - 1) {
            const nextSubSectionId = courseSectionData[currentSectionIndex].subSection[currentSubSectionIndex + 1]._id
            navigate(`/view-course/${courseId}/section/${sectionId}/sub-section/:${nextSubSectionId}`)
        }
        else {
            const nextSectionId = courseSectionData[currentSectionIndex + 1]._id

            const nextSubSectionId = courseSectionData[currentSectionIndex + 1].subSection[0]._id

            navigate(`/view-course/${courseId}/section/${nextSectionId}/sub-section/:${nextSubSectionId}`)
        }
    }
    const goToPrevVideo = () => {
        const currentSectionIndx = courseSectionData.findIndex(
            (data) => data._id === sectionId
        )

        const currentSubSectionIndx = courseSectionData[
            currentSectionIndx
        ].subSection.findIndex((data) => data._id === subSectionId)
        if (currentSubSectionIndx !== 0) {
            const prevSubSectionId =
                courseSectionData[currentSectionIndx].subSection[
                    currentSubSectionIndx - 1
                ]._id
            navigate(
                `/view-course/${courseId}/section/${sectionId}/sub-section/${prevSubSectionId}`
            )
        } else {
            const prevSectionId = courseSectionData[currentSectionIndx - 1]._id
            const prevSubSectionLength =
                courseSectionData[currentSectionIndx - 1].subSection.length
            const prevSubSectionId =
                courseSectionData[currentSectionIndx - 1].subSection[
                    prevSubSectionLength - 1
                ]._id
            navigate(
                `/view-course/${courseId}/section/${prevSectionId}/sub-section/${prevSubSectionId}`
            )
        }
    }


    const handleLectureCompletion = async () => {
        setLoading(true);
        const res = await markLectureAsComplete({
            courseId: courseId,
            subSectionId: subSectionId,
        },
            token
        )
        if (res) {
            dispatch(updateCompletedLectures(subSectionId))
        }
        setLoading(false)
    }
    return (
        <div className="flex flex-col gap-5 text-white">
            {!videoData ? (
                <img
                    src={previewSource}
                    alt="Preview"
                    className="h-full w-full rounded-md object-cover"
                />
            ) : (

                <div className="relative aspect-video w-full">
                    <ReactPlayer
                        ref={playerRef}
                        url={videoData?.videoUrl}
                        controls
                        playing
                        width="100%"
                        height="100%"
                        onEnded={() => setVideoEnded(true)}
                    />
                    {videoEnded && (
                        <div className="absolute inset-0 z-20 grid place-content-center bg-black bg-opacity-60 font-inter">
                            {!completedLectures.includes(subSectionId) && (
                                <IconBtn
                                    disabled={loading}
                                    onclick={handleLectureCompletion}
                                    text={!loading ? 'Mark As Completed' : 'Loading...'}
                                    customClasses="text-xl max-w-max px-4 mx-auto"
                                />
                            )}
                            <IconBtn
                                disabled={loading}
                                onclick={() => {
                                    if (playerRef?.current) {
                                        playerRef.current.seekTo(0, 'seconds')
                                        setVideoEnded(false)
                                    }
                                }}
                                text="Rewatch"
                                customClasses="text-xl max-w-max px-4 mx-auto mt-2"
                            />
                            <div className="mt-10 flex min-w-[250px] justify-center gap-x-4 text-xl">
                                {!isFirstVideo() && (
                                    <button onClick={goToPrevVideo} className="blackButton" disabled={loading}>
                                        Prev
                                    </button>
                                )}
                                {!isLastVideo() && (
                                    <button onClick={goToNextVideo} className="blackButton" disabled={loading}>
                                        Next
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            )}

            <h1 className="mt-4 text-3xl font-semibold">{videoData?.title}</h1>
            <p className="pt-2 pb-6">{videoData?.description}</p>
        </div>
    )
}

export default VideoDetails