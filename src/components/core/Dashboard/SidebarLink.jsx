import React from "react";

import * as Icons from "react-icons/vsc";
import { useDispatch } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";


const SidebarLink = ({link, iconName}) => {

    const Icon = Icons[iconName];
    const location = useLocation();
    const dispatch = useDispatch();

    const matchRoute = (route) => {
        return matchRoute({path:route}, location.pathname);
    }


    return (
        <div>
            <NavLink
            to={link.path} 
            className={`${matchRoute(link.path) ? "bg-yellow-800" : "bg-opacity-0" } relative px-8 py-2 text-sm font-medium`}>
                <span className={`absolute top-0 left-0 h-full w-[0.2rem] bg-yellow-300 ${matchRoute(link.path) ?
                    "opacity-100" : "opacity-0"} `}>
                </span>
                <div className="flex item-center gap-x-2">
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