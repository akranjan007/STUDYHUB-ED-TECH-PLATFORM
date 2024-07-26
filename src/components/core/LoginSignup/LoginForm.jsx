import React, { useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../../Services/Operations/AuthApi";
import { useDispatch, useSelector } from "react-redux";

const LoginForm = ({setIsLoggedIn}) => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    //const { isAuthenticated } = useSelector((state) => state.auth);

    const [ formData, setFormData ] = useState({
        email:"", password:""
    });

    const [ showPassword, setShowPassword ] = useState(false);

    function changeHandler(event){

        setFormData((prevFormData) => (
            {
            ...prevFormData,
            [event.target.name] : event.target.value
            }
        ))
    }

    function submitHandler(event){
        event.preventDefault();
        dispatch(login(formData.email, formData.password, navigate))
    }

    const [ accountType, setAccountType ] = useState("Student");

    /*useEffect(() => {
        if(isAuthenticated){
            navigate("dashboard/my-profile");
        }
    }, [ isAuthenticated, navigate])*/

    return(
        <div className="flex flex-col g-4 mt-8 w-[100%]">
            <div className="w-[50%] bg-richblack-800 rounded-full p-1 mt-4">
                <button className={` ${accountType === "Student" ? "bg-black text-richblack-200 rounded-full p-2 w-[50%]" : " text-richblack-50 rounded-full p-2 w-[50%]"}`} 
                onClick={() => setAccountType("Student")}>
                    Student
                </button>
                <button className={` ${accountType === "Student" ? " text-richblack-50 rounded-full p-2 w-[50%]" : "bg-black text-richblack-200 rounded-full p-2 w-[50%]"}`}
                onClick={() => setAccountType("Instructor")}>
                    Instructor
                </button>
            </div>
            <form onSubmit={submitHandler} className="flex flex-col w-[100%] text-richblack-400 mt-6 relative">
                <label className="text-base w-[80%]">
                    <p className="font-semibold">
                        Email Address<sup>*</sup>
                    </p>
                    <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={changeHandler}
                    placeholder="Enter email address"
                    required
                    className="w-[70%] text-[12px] p-2 bg-richblack-800 my-2 outline-none rounded-sm"
                    />
                </label>
                <label className="w-[80%] text-base relative">
                    <p className="">
                        Password<sup>*</sup>
                    </p>
                    <input
                    type={showPassword ? ("text") : ("password")}
                    name="password"
                    value={formData.password}
                    onChange={changeHandler}
                    placeholder="Enter password"
                    required
                    className="w-[70%] text-[12px] p-2 bg-richblack-800 my-2 outline-none rounded-sm"
                    />
                    <span className="absolute top-11 translate-x-[-170%]" onClick={() => setShowPassword((prev) => !prev)}>
                        {showPassword ? (<AiOutlineEyeInvisible/>) : (<AiOutlineEye/>)}
                    </span>
                </label>
                <Link to="/forget-password">
                    <p className="text-[12px] absolute translate-x-[320%] cursor-pointer">Forget Password</p>
                </Link>
                
                
                <button  type="submit"  className = "mt-8 w-[56%] mt-6 rounded-[8px] bg-yellow-500 py-[8px] px-[12px] font-medium text-richblack-900">Sign In</button>
            </form>
        </div>
        
    );
}

export default LoginForm;