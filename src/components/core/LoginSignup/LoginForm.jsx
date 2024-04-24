import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { Link, useNavigate } from "react-router-dom";
import CTAButton from "../hompage/Button";

const LoginForm = ({setIsLoggedIn}) => {

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

    const navigate = useNavigate();

    function submitHandler(event){
        event.preventDefault();
        setIsLoggedIn(true);
        console.log("printing account data")
        console.log(formData)
        navigate("/dashboard");

    }

    const [ accountType, setAccountType ] = useState("student");

    return(
        <div className="flex flex-col g-4 mt-8 w-[100%]">
            <div className="w-[50%] bg-richblack-800 rounded-full p-1 mt-4">
                <button className={` ${accountType === "student" ? "bg-black text-richblack-200 rounded-full p-2 w-[50%]" : " text-richblack-50 rounded-full p-2 w-[50%]"}`} 
                onClick={() => setAccountType("student")}>
                    Student
                </button>
                <button className={` ${accountType === "student" ? " text-richblack-50 rounded-full p-2 w-[50%]" : "bg-black text-richblack-200 rounded-full p-2 w-[50%]"}`}
                onClick={() => setAccountType("instructor")}>
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
                <Link to="#">
                    <p className="text-[12px] absolute translate-x-[320%] cursor-pointer">Forget Password</p>
                </Link>
                
                <div className="mt-10 w-[56%]">
                    <CTAButton type="submit" active={true} linkto={"/"}>Sign In</CTAButton>
                </div>
            </form>
        </div>
        
    );
}

export default LoginForm;