import React from 'react'
import IconBtn from './IconBtn'
const ConfirmationModal = ({modalData}) => {
  return (
    // <div>
    //     <div>
    //         <p>{modalData.text1}</p>
    //         <p>{modalData.text2}</p>
    //         <div>
    //             <IconBtn 
    //                onClick={modalData?.btn1Handler}
    //                text={modalData?.btn1Text}
    //             />
    //             <button 
    //                onClick={modalData?.btn2Handler}
    //             >
    //                 {modalData?.btn2Text}
    //             </button>
    //         </div>
    //     </div>
    // </div>
    <div className="fixed inset-0 z-[1000] flex items-center justify-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm">
      <div className="w-11/12 max-w-[350px] rounded-lg border border-richblack-400 bg-richblack-800 p-6">
        <p className="text-2xl font-semibold text-richblack-5">
          {modalData?.text1}
        </p>
        <p className="mt-3 mb-5 leading-6 text-richblack-200">
          {modalData?.text2}
        </p>
        <div className="flex flex-col gap-y-4 md:flex-row md:gap-x-4">
          <span className="cursor-pointer rounded-md bg-yellow-50 py-2 px-4 font-semibold text-richblack-900">
          <IconBtn
            onclick={modalData?.btn1Handler}
            text={modalData?.btn1Text}
          />
          </span>
          
          <button
            className="cursor-pointer rounded-md bg-richblack-200 py-2 px-4 font-semibold text-richblack-900"
            onClick={modalData?.btn2Handler}
          >
            {modalData?.btn2Text}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmationModal