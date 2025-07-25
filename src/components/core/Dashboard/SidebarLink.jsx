import React from 'react'
import * as Icons from "react-icons/vsc"
import { NavLink, useLocation } from 'react-router-dom';
//import { matchPath } from 'react-router-dom';
const SidebarLink = ({link,iconName}) => {
    const Icon = Icons[iconName];
    const location = useLocation();
    const matchRoute = (route)=>(location.pathname===route)
    //const matchRoute = (route)=>{return matchPath({path:route},location.pathname)}
    //console.log("Icon: "+iconName);
  return (
    <NavLink
    to={link.path}
    className={`relative px-8 py-2 text-sm font-medium ${matchRoute(link.path)?"bg-yellow-800":"bg-opacity-0"}`}
    >
      <span className={`absolute left-0 top-0 h-full w-[0.2rem] bg-yellow-50 ${matchRoute(link.path)?"opacity-100":"opacity-0"}`}></span>

      <div className='flex items-center gap-x-2'>
        {Icon && <Icon className="text-lg" />}
        {link.name}
      </div>
    </NavLink>
  )
}

export default SidebarLink

