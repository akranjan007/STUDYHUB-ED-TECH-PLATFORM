import React from "react";

import * as Icons from "react-icons/vsc";
import { useDispatch } from "react-redux";
import { matchPath, NavLink, useLocation } from "react-router-dom";


const SidebarLink = ({link, iconName}) => {

    const Icon = Icons[iconName];
    const location = useLocation();
    const dispatch = useDispatch();

    const matchRoute = (route) => {
        return matchPath({path:route}, location.pathname);
    }


    return (
        <div className={`relative px-8 py-2 text-sm font-medium 
            ${matchRoute(link.path) ? "bg-yellow-900 text-white" : "bg-opacity-0 text-richblack-100"
          } transition-all duration-200`}>
            <NavLink
            to={link.path}>
                <span className={`absolute left-0 top-0 h-full w-[0.2rem] bg-yellow-300 ${matchRoute(link.path) ? "opacity-100" :
                 "opacity-0"}`}>
                </span>
                <div className="flex item-center gap-x-2 px-6">
                    <Icon className="text-lg"/>
                    <span>
                        {link.name}
                    </span>
                </div>
            </NavLink>
        </div>
    )
}

export default SidebarLink;