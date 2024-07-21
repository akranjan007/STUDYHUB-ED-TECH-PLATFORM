import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../assets/logo/srudypilot_nobg.png";
import { Navbarlinks } from "../../data/Navbar-links";
import { matchPath } from "react-router-dom";
import { useSelector } from "react-redux";
import { AiOutlineShoppingCart } from "react-icons/ai";
import ProfileDropDown from "../core/Auth/ProfileDropDown";
import { apiConnector } from "../../Services/apiconnector";
import { categories } from "../../Services/apis";
import { RiArrowDropDownLine } from "react-icons/ri";
import Logout from "../../pages/Logout";


/*
const subLinks = [
    {
        title:"Python",
        link:"/catalog/python",
    },
    {
        title:"Web Development",
        link:"/catalog/web-dev",
    },
];*/

const Navbar = () => {

    const {token} = useSelector((state) => state.auth);
    const {user} = useSelector((state) => state.profile);
    const {totalItems} = useSelector( (state) => state.cart);

    const location = useLocation();
    const matchRoute = (route) => {
        return matchPath({ path: route }, location.pathname);
    };


    const [ subLinks, setSubLinks ] = useState([]);
    const fetchSubLinks = async () => {
        try{
            const result = await apiConnector("GET", categories.CATEGORIES_API);
            console.log("Printing all categories list" , result);
            setSubLinks(result.data.allCategories);
        }
        catch(error){
            console.log("Could not fetch the categories list");
            console.log(error);
        }
    };

    
    useEffect(() => {
        fetchSubLinks();
    }, [])

    return (
        <div className="flex flex-col w-[100%] justify-center items-center bg-richblack-800">
        <div className="flex h-[60px] items-center justify-between  w-11/12 max-w-maxContent">
            <div className="flex flex-row justify-center items-center ">
                <Link to={"/"}>
                    <img src={Logo} className="w-[160px] h-[125px]"/>
                </Link>
            </div>

            <nav className="relative">
                <ul className="flex gap-x-6 ">
                {
                    Navbarlinks.map((link, index) => (
                        <li key={index}>
                            {
                                link.title === "Catalog" ? 
                                <div className="text-richblack-50 flex items-center g-2 relative group cursor-pointer">
                                    <p>{link.title}</p>
                                    <RiArrowDropDownLine/>

                                    <div className="invisible absolute left-[50%] top-[50%] z-[1000] flex w-[200px] translate-x-[-50%]
                                     translate-y-[3em] flex-col rounded-lg bg-richblack-100 p-4 text-richblack-900 opacity-0
                                      transition-all duration-150 group-hover:visible group-hover:translate-y-[1.65em] 
                                      group-hover:opacity-100 lg:w-[200px]">
                                        <div className="absolute left-[50%] top-0 -z-10 h-6 w-6 translate-x-[80%] translate-y-[-40%]
                                         rotate-45 select-none rounded bg-richblack-100">
                                            </div>
                                            <div>
                                                {
                                                subLinks.length ? 
                                                (
                                                    subLinks.map( (subLink, index ) => (
                                                        <Link to={subLink.name.toLowerCase()} key={index}>
                                                            <p className="text-richblack-800">{subLink.name}</p>
                                                        </Link>
                                                    ))
                                                ) : 
                                                (
                                                    <div></div>
                                                )}
                                            </div>
                                    </div>
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

            {/*Login Sign Up Dashboard*/}
            <div className="flex gap-x-4 items-center">
                {
                    user && user?.accountType !== "Instructor" && 
                    (
                        <Link to="/dashboard/cart" className="relative">
                            <AiOutlineShoppingCart/>
                            {
                                totalItems > 0 && 
                                (
                                    <span>
                                        {totalItems}
                                    </span>
                                )
                            }
                        </Link>
                    )
                }
                {
                    token === null && 
                    (
                        <Link to="/login" >
                            <button className="text-base bg-richblack-900 text-richblack-50 rounded-md px-2 py-1">
                                Log In
                            </button>
                        </Link>
                    )
                }
                {
                    token === null &&
                    (
                        <Link to="/signup" >
                            <button className="text-base bg-richblack-900 text-richblack-50 rounded-md px-2 py-1">
                                Sign Up
                            </button>
                        </Link>
                    )
                }
                {
                    token !== null && <Logout/>
                }
            </div>

        </div>
        <div className="bg-richblack-600 h-[1px] w-[100%]"></div>
        </div>
    )
}

export default Navbar;