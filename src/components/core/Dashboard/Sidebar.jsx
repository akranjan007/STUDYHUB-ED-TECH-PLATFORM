import React, { useState } from "react";

import { sidebarLinks } from "../../../data/dashboard_link";
import { logout } from "../../../Services/Operations/AuthApi";
import { useDispatch, useSelector } from "react-redux";
import SidebarLink from "./SidebarLink";
import { Navigate, useNavigate } from "react-router-dom";
import { VscSignOut } from "react-icons/vsc";
import ConfirmationModal from "../../Common/ConfirmationModal";

const Sidebar = () => {

    const {user, loading:profileLoading} = useSelector((state)=>state.profile);
    const {loading:authLoading} = useSelector((state)=>state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const [confirmationModal, setConfirmationModal] = useState(null);

    if(profileLoading || authLoading){
        return (
            <div>
                Loading....
            </div>
        )
    }

    return (
        <div>
            <div className="flex h-[calc(100vh-3.5rem)] min-w-[220px] flex-col border-r-[1px] border-r-richblack-700 
            bg-richblack-800 py-5">
                <div className="flex flex-col">
                    {
                        sidebarLinks.map((link) => {
                            if(link.type && user?.accountType !== link.type)    return null;
                            return (
                                <SidebarLink key={link.id} link={link} iconName={link.icon}/>
                            )
                        })
                    }
                </div>
                <div className="mt-6 mb-6 w-10/12 h-[1px] mx-auto bg-richblack-600"></div>
                <div className="flex flex-col">
                    <SidebarLink  link={{name:"Settings", path:"dashboard/settings"}} iconName="VscSettingsGear" />
                    <button 
                    onClick={() => setConfirmationModal({
                        text1:"Are you sure ?",
                        text2:"You will be logged out of your Account.",
                        btn1text:"Logout",
                        btn2text:"Cancel",
                        btn1handler: () => dispatch(logout(Navigate)),
                        btn2handler: () => setConfirmationModal(null),
                    })}
                    className="text-sm font-medium text-richblack-100 px-14">

                        <div className="flex gap-3 item-center">
                            <VscSignOut className="text-lg" />
                            <span>Logout</span>
                        </div>

                    </button>
                </div>
            </div>
            {confirmationModal && <ConfirmationModal modalData={confirmationModal}/>}
        </div>
    )
}

export default Sidebar;