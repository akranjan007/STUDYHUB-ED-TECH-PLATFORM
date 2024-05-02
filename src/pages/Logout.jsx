import React, { useEffect } from "react";
import { logout } from "../Services/Operations/AuthApi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const Logout = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const clickHandler = (event) => {
        dispatch(logout(navigate));
    }
    return (
        <div>
            <button onClick={clickHandler} className="bg-richblack-800 text-richblack-300">Log Out</button>
        </div>
    )
}

export default Logout;