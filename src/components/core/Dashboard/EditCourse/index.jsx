import React,{useState,useEffect} from 'react'
import { useParams } from 'react-router-dom';
import { useSelector,useDispatch } from 'react-redux';
import RenderSteps from '../AddCourse/RenderSteps';
import { getFullDetailsOfCourse } from '../../../../services/operations/courseDetailsAPI';
import { setCourse, setEditCourse } from '../../../../slices/courseSlice';


const EditCourse = () => {
    useEffect(()=>{
      const fetchCourse=async()=>{
        setLoading(true);
        const result=await getFullDetailsOfCourse(courseId,token);
        console.log(result)
        if(result?.courseDetails){
            dispatch(setEditCourse(true));
            dispatch(setCourse(result?.courseDetails))
        }
        setLoading(false);
      }
      fetchCourse();
    },[])
    const dispatch = useDispatch();
    const {course} = useSelector((state)=>state.course);
    const {courseId} = useParams();
    const [loading,setLoading] = useState(false);
    const {token} = useSelector((state)=>state.auth);

    if (loading) {
        return (
        <div className="grid flex-1 place-items-center">
            <div className="spinner"></div>
        </div>
        )
    }
  return (
    <div>
        <h1 className="mb-14 text-3xl font-medium text-richblack-5">
                Edit Course
        </h1>
        <div className="mx-auto max-w-[600px]">
            {
            course ? (
             <RenderSteps />
            ) : (
            <p className="mt-14 text-center text-3xl font-semibold text-richblack-100">
                Course not found
            </p>
            )}
        </div>
    </div>
  )
}

export default EditCourse