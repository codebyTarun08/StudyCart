// import React, { useEffect, useState } from 'react'
// import Logo from "../../../assets/Logo/Logo-Full-Light.png"
// import { Link, matchPath } from 'react-router-dom'
// import { NavbarLinks } from '../../../data/navbar-links'
// import { useLocation } from 'react-router-dom'
// import { useDispatch, useSelector } from 'react-redux'
// import { AiOutlineShoppingCart } from "react-icons/ai";
// import ProfileDropDown from "../Auth/ProfileDropDown"
// import { apiConnector } from '../../../services/apiConnector'
// import { categories } from '../../../services/apis'
// import { IoIosArrowDown } from "react-icons/io";
// import Loading from './Loading'
// import { logout } from '../../../services/operations/authAPI'
// import { useNavigate } from 'react-router-dom'
// import { ACCOUNT_TYPE } from '../../../utils/constants'
// import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
// const Navbar = () => {
//     const location = useLocation();
//     const { token } = useSelector((state) => state.auth);
//     const { user } = useSelector((state) => state.profile);
//     const { totalItems } = useSelector((state) => state.cart);
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
//     const matchRoute = (route) => {
//         return matchPath({ path: route }, location.pathname);
//     }

//     const [subLinks, setSubLinks] = useState([]);
//     const [loading, setLoading] = useState(false);
//     const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

//     const fetchSubLinks = async () => {
//         setLoading(true);
//         try {
//             const result = await apiConnector("GET", categories.CATEGORIES_API)
//             setSubLinks(result.data.data);
//         } catch (error) {
//             console.log("Could not fetch category list", error)
//         }
//         setLoading(false);
//     }

//     useEffect(() => {
//         fetchSubLinks()
//     }, [])

//     const logOutHandler = () => {
//         dispatch(logout(navigate))
//     }

//     // Close mobile menu on route change
//     useEffect(() => {
//         setMobileMenuOpen(false);
//     }, [location.pathname]);

//     // Navbar links rendering logic
//     const renderLinks = (isMobile = false) => (
//         <ul className={`flex ${isMobile ? "flex-col gap-y-4" : "justify-between gap-x-6"} `}>
//             {
//                 NavbarLinks.map((link, index) => {
//                     return (
//                         <li key={index}>
//                             {
//                                 link.title === "Catalog" ? (
//                                     <div className={`relative group ${isMobile ? "" : ""}`}>
//                                         <div className="flex justify-center items-center gap-2 cursor-pointer">
//                                             <p>{link.title}</p>
//                                             <IoIosArrowDown />
//                                         </div>
//                                         {/* Dropdown */}
//                                         <div className={`${isMobile
//                                                 ? "block static opacity-100 visible mt-2"
//                                                 : "invisible opacity-0 absolute left-1/2 top-full translate-x-[-50%] translate-y-[5%] mt-2 group-hover:visible group-hover:opacity-100"
//                                             } flex-col rounded-md bg-richblue-600/90 backdrop-blur-sm p-5 lg:w-[300px] transition-all duration-200 z-50 border-[2px] border-richblack-300/30`}>
//                                             {!isMobile && (
//                                                 <div className="absolute h-10 w-10 top-0 left-[50%] translate-x-[30%] translate-y-[-50%] rotate-45 bg-richblue-600/70 backdrop-blur-sm border-t-[2px] border-l-[2px] border-richblack-300/30"></div>
//                                             )}
//                                             {loading ? (
//                                                 <p className="text-center">Loading...</p>
//                                             ) : subLinks && subLinks.length > 0 ? (
//                                                 subLinks.map((subLink, i) => (
//                                                     <Link
//                                                         to={`/catalog/${subLink.name
//                                                             .split(" ")
//                                                             .join("-")
//                                                             .toLowerCase()}`}
//                                                         key={i}
//                                                         className="rounded-lg bg-transparent py-4 pl-4 "
//                                                     >
//                                                         <p className='text-white text-xs font-inter px-5 hover:text-blue-100 py-3 rounded-lg border-b-4 shadow-inner border-black z-10'>{subLink.name}</p>
//                                                     </Link>
//                                                 ))
//                                             ) : (
//                                                 <p className="text-center">No Courses Found</p>
//                                             )}
//                                         </div>
//                                     </div>
//                                 )
//                                     : (
//                                         <Link
//                                             to={link?.path}
//                                             className={`${matchRoute(link?.path) ? "text-yellow-25" : "text-richblack-25"}`}
//                                         >
//                                             <p>{link.title}</p>
//                                         </Link>
//                                     )
//                             }
//                         </li>
//                     )
//                 })
//             }
//         </ul>
//     );

//     return (
//         <div className='bg-richblack-800 flex items-center justify-center border-b-[1px] border-richblack-100/30'>
//             <div className='mx-auto text-richblack-25 flex items-center justify-between w-11/12 max-w-maxContent py-3'>
//                 {/* Logo */}
//                 <div className="flex items-center">
//                     <Link to="/">
//                         <img src={Logo} height={32} width={160} alt="Logo/StudyCart" />
//                     </Link>
//                 </div>
//                 {/* Desktop Nav */}
//                 <nav className="hidden lg:block">
//                     {renderLinks()}
//                 </nav>
//                 {/* Desktop Buttons */}
//                 <div className='hidden lg:flex justify-between gap-x-4 items-center'>
//                     {
//                         token === null && (
//                             <Link to="/login">
//                                 <button
//                                     className='bg-richblack-800 py-2 px-3 rounded-lg border border-richblack-700 shadow-lg shadow-blue-400/30 z-10'>
//                                     Log in
//                                 </button>
//                             </Link>
//                         )
//                     }
//                     {
//                         token === null && (
//                             <Link to="/signup">
//                                 <button
//                                     className='bg-richblack-800 py-2 px-3 rounded-lg border border-richblack-700 shadow-lg shadow-blue-400/30 z-10'>
//                                     Sign up
//                                 </button>
//                             </Link>
//                         )
//                     }
//                     {
//                         token != null && (
//                             <ProfileDropDown />
//                         )
//                     }
//                     {
//                         user && user?.accountType === ACCOUNT_TYPE.STUDENT && (
//                             <Link to="/dashboard/cart" className='relative translate-y-2'>
//                                 <AiOutlineShoppingCart />
//                                 {
//                                     totalItems > 0 && (
//                                         <span className='absolute top-0 translate-x-4 translate-y-1 text-yellow-50 shadow-sm'>
//                                             {totalItems}
//                                         </span>
//                                     )
//                                 }
//                             </Link>
//                         )
//                     }
//                 </div>
//                 {/* Mobile Hamburger */}
//                 <div className="lg:hidden flex items-center h-full">
//                     <button
//                         className={`text-3xl p-2 rounded-md transition-colors duration-200 focus:outline-none 
//                             ${mobileMenuOpen ? "bg-richblack-700 text-yellow-50" : "bg-transparent text-richblack-25"}
//                             hover:bg-richblack-700 hover:text-yellow-25`}
//                         onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//                         aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
//                     >
//                         {mobileMenuOpen ? <AiOutlineClose /> : <AiOutlineMenu />}
//                     </button>
//                 </div>
//                 <div className={`fixed top-0 left-0 w-full h-full bg-richblack-900/90 z-[100] transition-all duration-300 ${mobileMenuOpen ? "block" : "hidden"}`}>
//                     <div className="flex flex-col w-11/12 max-w-maxContent mx-auto py-6">
//                         <div className="flex justify-between items-center mb-8">
//                             <Link to="/" onClick={() => setMobileMenuOpen(false)}>
//                                 <img src={Logo} height={32} width={160} alt="Logo/StudyCart" />
//                             </Link>
//                             <button
//                                 className="text-2xl text-richblack-25"
//                                 onClick={() => setMobileMenuOpen(false)}
//                                 aria-label="Close menu"
//                             >
//                                 <AiOutlineClose />
//                             </button>
//                         </div>
//                         <nav>
//                             {renderLinks(true)}
//                         </nav>
//                         <div className='flex flex-col gap-y-4 mt-8'>
//                             {
//                                 token === null && (
//                                     <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
//                                         <button
//                                             className='w-full bg-richblack-800 py-2 px-3 rounded-lg border border-richblack-700 shadow-lg shadow-blue-400/30 z-10'>
//                                             Log in
//                                         </button>
//                                     </Link>
//                                 )
//                             }
//                             {
//                                 token === null && (
//                                     <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
//                                         <button
//                                             className='w-full bg-richblack-800 py-2 px-3 rounded-lg border border-richblack-700 shadow-lg shadow-blue-400/30 z-10'>
//                                             Sign up
//                                         </button>
//                                     </Link>
//                                 )
//                             }
//                             {
//                                 token != null && (
//                                     <div className="w-full">
//                                         <ProfileDropDown isMobile={true} />
//                                     </div>
//                                 )
//                             }
//                             {
//                                 user && user?.accountType === ACCOUNT_TYPE.STUDENT && (
//                                     <Link to="/dashboard/cart" className='relative flex items-center gap-2' onClick={() => setMobileMenuOpen(false)}>
//                                         <AiOutlineShoppingCart className="text-xl" />
//                                         {
//                                             totalItems > 0 && (
//                                                 <span className='text-yellow-50 shadow-sm'>
//                                                     {totalItems}
//                                                 </span>
//                                             )
//                                         }
//                                         <span>Cart</span>
//                                     </Link>
//                                 )
//                             }
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     )
// }
// export default Navbar

import React, { useEffect, useState } from 'react'
import Logo from "../../../assets/Logo/StudyCart2.png"
import { Link, matchPath, useLocation, useNavigate } from 'react-router-dom'
import { NavbarLinks } from '../../../data/navbar-links'
import { useDispatch, useSelector } from 'react-redux'
import { AiOutlineShoppingCart, AiOutlineMenu, AiOutlineClose } from "react-icons/ai"
import ProfileDropDown from "../Auth/ProfileDropDown"
import { apiConnector } from '../../../services/apiConnector'
import { categories } from '../../../services/apis'
import { IoIosArrowDown } from "react-icons/io"
import { logout } from '../../../services/operations/authAPI'
import { ACCOUNT_TYPE } from '../../../utils/constants'

const Navbar = () => {
    const location = useLocation()
    const { token } = useSelector((state) => state.auth)
    const { user } = useSelector((state) => state.profile)
    const { totalItems } = useSelector((state) => state.cart)
    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [subLinks, setSubLinks] = useState([])
    const [loading, setLoading] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

    const matchRoute = (route) => matchPath({ path: route }, location.pathname)

    const fetchSubLinks = async () => {
        setLoading(true)
        try {
            const result = await apiConnector("GET", categories.CATEGORIES_API)
            setSubLinks(result.data.data)
        } catch (error) {
            console.log("Could not fetch category list", error)
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchSubLinks()
    }, [])

    useEffect(() => {
        setMobileMenuOpen(false)
    }, [location.pathname])

    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = 'hidden'
            const handleEsc = (e) => {
                if (e.key === 'Escape') setMobileMenuOpen(false)
            }
            window.addEventListener('keydown', handleEsc)
            return () => {
                document.body.style.overflow = 'auto'
                window.removeEventListener('keydown', handleEsc)
            }
        }
    }, [mobileMenuOpen])

    const renderLinks = (isMobile = false) => (
        <ul className={`flex ${isMobile ? "flex-col gap-y-4" : "justify-between gap-x-6"}`}>
            {NavbarLinks.map((link, index) => (
                <li key={index}>
                    {link.title === "Catalog" ? (
                        <div className={`relative group`}>
                            <div className="flex items-center gap-2 cursor-pointer">
                                <p>{link.title}</p>
                                <IoIosArrowDown />
                            </div>

                            {/* Dropdown */}
                            <div className={`${isMobile
                                ? "opacity-100 visible mt-2"
                                : "invisible opacity-0 absolute left-1/2 top-full translate-x-[-50%] translate-y-[5%] mt-2 group-hover:visible group-hover:opacity-100"
                                } flex-col rounded-md bg-richblue-600/90 backdrop-blur-sm p-2 lg:w-[300px] transition-all duration-200 z-50 border-[2px] border-richblack-300/30`}>
                                {!isMobile && (
                                    <div className="absolute h-10 w-10 top-0 left-[50%] translate-x-[30%] translate-y-[-50%] rotate-45 bg-richblue-600/70 backdrop-blur-sm border-t-[2px] border-l-[2px] border-richblack-300/30"></div>
                                )}
                                {loading ? (
                                    <p className="text-center">Loading...</p>
                                ) : subLinks && subLinks.length > 0 ? (
                                    subLinks.map((subLink, i) => (
                                        <Link
                                            to={`/catalog/${subLink.name
                                                .split(" ")
                                                .join("-")
                                                .toLowerCase()}`}
                                            key={i}
                                            className="rounded-lg bg-transparent py-2 pl-4 "
                                        >
                                            <p className='text-white text-xs font-inter px-5 hover:text-blue-100 py-1 rounded-lg border-b-4 shadow-inner border-black z-10'>{subLink.name}</p>
                                        </Link>
                                    ))
                                ) : (
                                    <p className="text-center">No Courses Found</p>
                                )}
                            </div>
                            
                        </div>
                    ) : (
                        <Link
                            to={link.path}
                            className={`${matchRoute(link.path) ? "text-yellow-25" : "text-richblack-25"}`}
                        >
                            <p>{link.title}</p>
                        </Link>
                    )}
                </li>
            ))}
        </ul>
    )

    return (
        <div className='bg-richblack-800 flex items-center justify-center border-b border-richblack-100/30'>
            <div className='mx-auto text-richblack-25 flex items-center justify-between w-11/12 max-w-maxContent py-3'>
                {/* Logo */}
                <Link to="/">
                    <img src={Logo} alt="StudyCart Logo" className="h-8 w-auto" />
                </Link>

                {/* Desktop Nav */}
                <nav className="hidden lg:block">{renderLinks()}</nav>

                {/* Desktop Right Side */}
                <div className='hidden lg:flex items-center gap-x-4'>
                    {!token && (
                        <>
                            <Link to="/login">
                                <button className='py-2 px-3 rounded-lg border border-richblack-700 bg-richblack-800 shadow-lg shadow-blue-400/30'>
                                    Log in
                                </button>
                            </Link>
                            <Link to="/signup">
                                <button className='py-2 px-3 rounded-lg border border-richblack-700 bg-richblack-800 shadow-lg shadow-blue-400/30'>
                                    Sign up
                                </button>
                            </Link>
                        </>
                    )}
                    {token && <ProfileDropDown />}
                    {user?.accountType === ACCOUNT_TYPE.STUDENT && (
                        <Link to="/dashboard/cart" className="relative">
                            <AiOutlineShoppingCart className="text-xl" />
                            {totalItems > 0 && (
                                <span className='absolute -top-2 left-4 text-yellow-50 text-sm'>
                                    {totalItems}
                                </span>
                            )}
                        </Link>
                    )}
                </div>

                {/* Hamburger */}
                <div className="lg:hidden flex items-center">
                    <button
                        onClick={() => setMobileMenuOpen(true)}
                        className="text-3xl p-2 rounded-md text-richblack-25 hover:bg-richblack-700 hover:text-yellow-25"
                        aria-label="Open menu"
                    >
                        <AiOutlineMenu />
                    </button>
                </div>

                {/* Overlay & Sidebar */}
                {mobileMenuOpen && (
                    <>
                        <div
                            className="fixed inset-0 z-40 bg-black bg-opacity-50 backdrop-blur-sm"
                            onClick={() => setMobileMenuOpen(false)}
                            aria-hidden="true"
                        />
                        <aside className="fixed top-0 right-0 w-[80%] max-w-sm h-full bg-richblack-900 z-50 p-6 transition-transform duration-300 transform translate-x-0 shadow-lg">
                            <div className="flex justify-between items-center mb-6">
                                <Link to="/" onClick={() => setMobileMenuOpen(false)}>
                                    <img src={Logo} alt="Logo" className="h-8 w-auto" />
                                </Link>
                                <button
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="text-2xl text-richblack-25 hover:text-yellow-25"
                                    aria-label="Close menu"
                                >
                                    <AiOutlineClose />
                                </button>
                            </div>
                            <nav className="flex flex-col gap-4">{renderLinks(true)}</nav>
                            <div className="mt-6 flex flex-col gap-4">
                                {!token && (
                                    <>
                                        <Link to="/login" onClick={() => setMobileMenuOpen(false)}>
                                            <button className="w-full py-2 px-4 border border-richblack-700 rounded bg-richblack-800 text-white shadow-lg">
                                                Log In
                                            </button>
                                        </Link>
                                        <Link to="/signup" onClick={() => setMobileMenuOpen(false)}>
                                            <button className="w-full py-2 px-4 border border-richblack-700 rounded bg-richblack-800 text-white shadow-lg">
                                                Sign Up
                                            </button>
                                        </Link>
                                    </>
                                )}
                                {token && <ProfileDropDown isMobile={true} />}
                                {user?.accountType === ACCOUNT_TYPE.STUDENT && (
                                    <Link
                                        to="/dashboard/cart"
                                        className="flex items-center gap-2 text-white"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        <AiOutlineShoppingCart className="text-xl" />
                                        <span>Cart ({totalItems})</span>
                                    </Link>
                                )}
                            </div>
                        </aside>
                    </>
                )}
            </div>
        </div>
    )
}

export default Navbar
