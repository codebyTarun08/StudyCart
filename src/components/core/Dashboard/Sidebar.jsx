import React,{useState} from 'react'
import {sidebarLinks} from '../../../data/dashboard-links'
import {logout} from '../../../services/operations/authAPI'
import { useDispatch, useSelector } from 'react-redux'
import SidebarLink from './SidebarLink'
import {useNavigate} from 'react-router-dom'
import { VscSignOut } from 'react-icons/vsc'
import ConfirmationModal from '../common/ConfirmationModal'
const Sidebar = () => {
    const {user, loading:profileLoading}= useSelector((state)=> state.profile)
    const {loading:authLoading} = useSelector((state)=>state.auth)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [confirmationModal,setConfirmationModal] = useState(null);
    const [showSidebar, setShowSidebar] = useState(false);

    if(profileLoading || authLoading){
        return (
          <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
            <div className="flex justify-content items-content w-screen h-screen spinner"></div>
          </div>
        )
    }
    console.log("User: "+user.accountType)
    
return (
    <div className="md:relative">
        {/* Mobile sidebar toggle button */}
        <div className="md:hidden flex justify-between items-center px-4 py-3 bg-richblack-800 border-b border-richblack-600">
            <span className="text-lg font-semibold text-richblack-100"></span>
            <button
                onClick={() => setShowSidebar((prev) => !prev)}
                className="text-richblack-100 focus:outline-none"
            >
                <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M4 6h16M4 12h16M4 18h16"
                    />
                </svg>
            </button>
        </div>
        {/* Sidebar */}
        <div
            className={`
                fixed md:static top-0 left-0 z-40 h-full w-64 bg-richblack-800 border-r border-richblack-600
                transform md:translate-x-0 transition-transform duration-200 ease-in-out
                ${showSidebar ? "translate-x-0" : "-translate-x-full"} md:translate-x-0
                md:flex flex-col py-10 text-richblack-300
            `}
            style={{ minWidth: "222px" }}
        >
            <div className="flex flex-col">
                {sidebarLinks.map((link) => {
                    if (link.type && user?.accountType !== link.type) {
                        return null;
                    }
                    return (
                        <SidebarLink key={link.id} link={link} iconName={link.icon} />
                    );
                })}
            </div>
            <div className="my-6 mx-auto h-[1px] w-10/12 bg-richblack-600"></div>
            <div className="flex flex-col">
                <SidebarLink
                    link={{ name: "Settings", path: "/dashboard/settings" }}
                    iconName="VscSettingsGear"
                />
                <button
                    onClick={() =>
                        setConfirmationModal({
                            text1: "Are you Sure ?",
                            text2: "You will be logged out from your account.",
                            btn1Text: "Log Out",
                            btn2Text: "Cancel",
                            btn1Handler: () => dispatch(logout(navigate)),
                            btn2Handler: () => setConfirmationModal(null),
                        })
                    }
                    className="px-8 py-2 text-sm font-medium text-richblack-300"
                >
                    <div className="flex gap-x-2 items-center ">
                        <VscSignOut className="text-lg" />
                        <span>Logout</span>
                    </div>
                </button>
            </div>
        </div>
        {/* Overlay for mobile */}
        {showSidebar && (
            <div
                className="fixed inset-0 bg-black bg-opacity-40 z-30 md:hidden"
                onClick={() => setShowSidebar(false)}
            ></div>
        )}
        {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </div>
)
}

export default Sidebar