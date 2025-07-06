import React from 'react'
import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table'
import "react-super-responsive-table/dist/SuperResponsiveTableStyle.css"
import { useState } from "react"
import { FaCheck } from "react-icons/fa"
import { FiEdit2 } from "react-icons/fi"
import { HiClock } from "react-icons/hi"
import { RiDeleteBin6Line } from "react-icons/ri"
import { useNavigate } from "react-router-dom"
import {useDispatch,useSelector} from "react-redux"

import { formatDate } from "../../../../services/formatDate"
import {
    deleteCourse,
    fetchInstructorCourses,
} from "../../../../services/operations/courseDetailsAPI"
import { COURSE_STATUS } from "../../../../utils/constants"
import ConfirmationModal from "../../common/ConfirmationModal"



const CourseTable = ({courses,setCourses}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { token } = useSelector((state) => state.auth)
    const [loading, setLoading] = useState(false)
    const [confirmationModal, setConfirmationModal] = useState(null)
    const TRUNCATE_LENGTH = 30

    const handleCourseDelete = async (courseId) => {
        setLoading(true)
        await deleteCourse({ courseId: courseId }, token)
        const result = await fetchInstructorCourses(token)
        if (result) {
            setCourses(result)
        }
        setConfirmationModal(null)
        setLoading(false)
    }
    return (
        <>
            <div className="overflow-x-auto">
                <Table className="min-w-full rounded-xl border border-richblack-800">
                    <Thead>
                        <Tr className="flex flex-col md:flex-row gap-y-2 md:gap-x-10 rounded-t-md border-b border-b-richblack-800 px-2 md:px-6 py-2">
                            <Th className="flex-1 text-left text-xs md:text-sm font-medium uppercase text-richblack-100">
                                Courses
                            </Th>
                            <Th className="text-left text-xs md:text-sm font-medium uppercase text-richblack-100">
                                Duration
                            </Th>
                            <Th className="text-left text-xs md:text-sm font-medium uppercase text-richblack-100">
                                Price
                            </Th>
                            <Th className="text-left text-xs md:text-sm font-medium uppercase text-richblack-100">
                                Actions
                            </Th>
                        </Tr>
                    </Thead>
                    <Tbody>
                        {courses?.length === 0 ? (
                            <Tr>
                                <Td className="py-10 text-center text-lg md:text-2xl font-medium text-richblack-100">
                                    No courses found
                                </Td>
                            </Tr>
                        ) : (
                            courses?.map((course) => (
                                <Tr
                                    key={course._id}
                                    className="flex flex-col md:flex-row gap-y-4 md:gap-x-10 border-b border-richblack-800 px-2 md:px-6 py-4 md:py-8"
                                >
                                    <Td className="flex flex-1 flex-col md:flex-row gap-y-2 md:gap-x-4">
                                        <img
                                            src={course?.thumbnail}
                                            alt={course?.courseName}
                                            className="h-[100px] w-full md:h-[148px] md:w-[220px] rounded-lg object-cover"
                                        />
                                        <div className="flex flex-col justify-between mt-2 md:mt-0">
                                            <p className="text-base md:text-lg font-semibold text-richblack-5">
                                                {course.courseName}
                                            </p>
                                            <p className="text-xs text-richblack-300 line-clamp-2">
                                                {course.courseDescription}
                                            </p>
                                            <p className="text-[11px] md:text-[12px] text-white">
                                                Created: {formatDate(course.createdAt)}
                                            </p>
                                            {course.status === COURSE_STATUS.DRAFT ? (
                                                <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[11px] md:text-[12px] font-medium text-pink-100 mt-1">
                                                    <HiClock size={14} />
                                                    Drafted
                                                </p>
                                            ) : (
                                                <p className="flex w-fit flex-row items-center gap-2 rounded-full bg-richblack-700 px-2 py-[2px] text-[11px] md:text-[12px] font-medium text-yellow-100 mt-1">
                                                    <div className="flex h-3 w-3 items-center justify-center rounded-full bg-yellow-100 text-richblack-700">
                                                        <FaCheck size={8} />
                                                    </div>
                                                    Published
                                                </p>
                                            )}
                                        </div>
                                    </Td>
                                    <Td className="text-xs md:text-sm font-medium text-richblack-100 mt-2 md:mt-0">
                                        2hr 30min
                                    </Td>
                                    <Td className="text-xs md:text-sm font-medium text-richblack-100 mt-2 md:mt-0">
                                        ₹{course.price}
                                    </Td>
                                    <Td className="text-xs md:text-sm font-medium text-richblack-100 flex flex-row gap-2 mt-2 md:mt-0">
                                        <button
                                            disabled={loading}
                                            onClick={() => {
                                                navigate(`/dashboard/edit-course/${course._id}`)
                                            }}
                                            title="Edit"
                                            className="px-2 transition-all duration-200 hover:scale-110 hover:text-caribbeangreen-300"
                                        >
                                            <FiEdit2 size={20} />
                                        </button>
                                        <button
                                            disabled={loading}
                                            onClick={() => {
                                                setConfirmationModal({
                                                    text1: "Do you want to delete this course?",
                                                    text2:
                                                        "All the data related to this course will be deleted",
                                                    btn1Text: !loading ? "Delete" : "Loading...  ",
                                                    btn2Text: "Cancel",
                                                    btn1Handler: !loading
                                                        ? () => handleCourseDelete(course._id)
                                                        : () => { },
                                                    btn2Handler: !loading
                                                        ? () => setConfirmationModal(null)
                                                        : () => { },
                                                })
                                            }}
                                            title="Delete"
                                            className="px-1 transition-all duration-200 hover:scale-110 hover:text-[#ff0000]"
                                        >
                                            <RiDeleteBin6Line size={20} />
                                        </button>
                                    </Td>
                                </Tr>
                            ))
                        )}
                    </Tbody>
                </Table>
            </div>
            {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
        </>
    )
}

export default CourseTable