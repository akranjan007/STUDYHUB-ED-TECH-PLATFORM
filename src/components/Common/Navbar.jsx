import React from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/logo/sp2light.png"
import { Navbarlinks } from "../../data/Navbar-links";
import { matchPath } from "react-router-dom";

const Navbar = () => {

    const location = useLocation();
    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname);
    };



    return (
        <div className="flex h-[80px] items-center justify-center border-b-[1px] border-b-richblack-600">
            <div className="flex flex-row justify-between items-center w-11/12 max-w-maxContent">
                <Link to={"/"}>
                    <img src={Logo} className="w-[160px] h-[125px]"/>
                </Link>
            </div>

            <nav className="">
                <ul className="flex gap-x-6 ">
                {
                    Navbarlinks.map((link, index) => (
                        <li key={index}>
                            {
                                link.title === "Catalog" ? 
                                <div>

                                </div> : 
                                <div className={`${matchRoute(link?.path) ? "text-yellow-500" : "text-richblack-50"}`}>
                                    <Link to={link?.path}>
                                        <p>{link.title}</p>    
                                    </Link>
                                </div>
                            }
                        </li>
                    ))
                }
                </ul>
            </nav>
        </div>
    )
}

export default Navbar;