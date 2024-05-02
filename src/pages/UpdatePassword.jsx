import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link } from "react-router-dom";
import { IoIosArrowBack } from "react-icons/io";
import { resetPassword } from "../Services/Operations/AuthApi";

const UpdatePassword = () => {

    const [formData, setFormData] = useState({
        password:"", confirmPassword:"",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const {loading} = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const location = useLocation();
    const {password, confirmPassword} = formData;


    const changeHandler = (event) => {
        setFormData((prevData) => (
            {
                ...prevData,
                [event.target.name]:event.target.value
            }
        ))
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        const token = location.pathname.split('/').at(-1);
        dispatch(resetPassword(password, confirmPassword, token));
    }

    return (
        <div className="flex flex-col justify-center items-center w-[25%]  mt-[80px] gap-4">
            {
                loading ?
                (
                    <div role="status">
                        {/*<div class="lds-facebook"><div></div><div></div><div></div></div>*/}
                        <svg aria-hidden="true" class="inline w-8 h-8 text-richblack-200 animate-spin dark:text-gray-600 fill-yellow-400" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                        </svg>
                        <span class="sr-only text-richblack-100">Loading...</span>
                    </div>
                ) :
                (
                    <div className="text-richblack-100 flex flex-col justify-center items-start w-[100%]">
                        <h1 className="text-4xl font-semibold mt-3">Choose New Password</h1>
                        <p className="mt-3">Almost Done. Enter your new password and you're all set.</p>
                        <form onSubmit={handleSubmit} className="flex flex-col w-[100%]">
                            <label className="relative mt-3">
                                <p className="text-richblack-300 mt-1">New Password <sup className="text-red-700">*</sup></p>
                                <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={password}
                                required
                                onChange={changeHandler}
                                placeholder="New Password"
                                className="w-[95%] text-[12px] p-2 bg-richblack-800 mt-2 outline-none rounded-sm"
                                />
                                <span onClick={() => setShowPassword((prev) => !prev)} 
                                    className="absolute translate-x-[-180%] translate-y-[105%]">
                                    {
                                        showPassword ? <AiOutlineEyeInvisible/> : <AiOutlineEye/>
                                    }
                                </span>
                            </label>
                            <label className="mt-3 relative">
                                <p className="text-richblack-300 mt-1">Confirm New Password <sup className="text-red-700">*</sup></p>
                                <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirmPassword"
                                value={confirmPassword}
                                required
                                onChange={changeHandler}
                                placeholder="Confirm New Password"
                                className="w-[95%] text-[12px] p-2 bg-richblack-800 mt-2 outline-none rounded-sm"
                                />
                                <span onClick={() => setShowConfirmPassword((prev) => !prev)} 
                                    className="absolute translate-x-[-180%] translate-y-[105%]">
                                    {
                                        showConfirmPassword ? <AiOutlineEyeInvisible/> : <AiOutlineEye/>
                                    }
                                </span>
                            </label>


                            <button type="submit" className = "w-[95%] mt-4 rounded-[8px] bg-yellow-500 py-[8px] px-[12px] font-medium text-richblack-900">
                                Reset Password
                            </button>
                        </form>
                        <div className="mt-3">
                            <Link to="/login" className="flex items-center gap-1">
                                <IoIosArrowBack/>
                                <p>Back to Login</p>
                            </Link>
                        </div>
                    </div>
                )
            }
        </div>
    )
}

export default UpdatePassword;