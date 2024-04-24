import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import CTAButton from "../hompage/Button";

const SignupForm = ({setIsLoggedIn}) => {

    const [ formData, setFormData ] = useState({
        fname:"", lname:"", email:"", createpass:"", confpass:""
    })

    function changeHandler(event){

        setFormData((prevFormData) => (
            {
            ...prevFormData,
            [event.target.name]:event.target.value
        }
        ))
    }

    const [ showPassword, setShowPassword ] = useState(false);
    const [ showPassword1, setShowPassword1 ] = useState(false);

    const navigate = useNavigate();
    function submitHandler(event){
        event.preventDefault();
        if(formData.createpass !== formData.confpass){
            console.log("password does not match")
        }
        else{
            setIsLoggedIn(true);
            

            const finalData = {
                ...formData,
                accountType
            }
            console.log("printing account data");
            console.log(finalData);

            navigate("/dashboard");
        }
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
            <form onSubmit={submitHandler} className="w-[70%] text-richblack-400">
                <div className="flex flex-row justify-start items-center g-[12px]">
                    <label className="w-[50%] mt-3">
                        <p className=" mt-1">First Name<sup>*</sup></p>
                        <input
                            type="text"
                            name="fname"
                            value={formData.fname}
                            onChange={changeHandler}
                            placeholder="Enter First Name"
                            required
                            className="w-[85%] text-[12px] p-2 bg-richblack-800 mt-2 outline-none rounded-sm"
                        />
                    </label>
                    <label className="w-[50%] mt-3">
                        <p className="text-richblack-300 mt-1">Last Name<sup>*</sup></p>
                        <input
                            type="text"
                            name="lname"
                            value={formData.lname}
                            onChange={changeHandler}
                            placeholder="Enter Last Name"
                            required
                            className="w-[85%] text-[12px] p-2 bg-richblack-800 mt-2 outline-none rounded-sm"
                        />
                    </label>
                </div>
                
                <label className="w-[100%] mt-3">
                    <p className="text-richblack-300 mt-1">Email Address<sup>*</sup></p>
                    <input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={changeHandler}
                        placeholder="Enter email address"
                        required
                        className="w-[92%] text-[12px] p-2 bg-richblack-800 mt-2 outline-none rounded-sm"
                    />
                </label>
                <div className="flex flex-start items-center mt-3">
                    <label className="w-[50%] relative">
                        <p className="text-richblack-300 mt-1">Create Password<sup>*</sup></p>
                        <input
                            type={showPassword ? ("text") : ("password")}
                            name="createpass"
                            value={formData.createpass}
                            onChange={changeHandler}
                            placeholder="Enter Password"
                            required
                            className="w-[85%] text-[12px] p-2 bg-richblack-800 mt-2 outline-none rounded-sm"
                        />
                        <span onClick={() => setShowPassword((prev) => !prev)} className="absolute  translate-y-[100%] translate-x-[-160%] text-white">
                            {showPassword ? (<AiOutlineEyeInvisible/>) : (<AiOutlineEye/>)}
                        </span>
                    </label>
                    <label className="w-[50%]">
                        <p className="text-richblack-300 mt-1">Confirm Password<sup>*</sup></p>
                        <input
                            type={showPassword1 ? ("text") : ("password")}
                            name="confpass"
                            value={formData.confpass}
                            onChange={changeHandler}
                            placeholder="Confirm Password"
                            required
                            className="w-[85%] text-[12px] p-2 bg-richblack-800 mt-2 outline-none rounded-sm"
                        />
                        <span onClick={() => setShowPassword1((prev) => !prev)} className="absolute  translate-y-[100%] translate-x-[-160%] text-white">
                            {showPassword1 ? (<AiOutlineEyeInvisible/>) : (<AiOutlineEye/>)}
                        </span>
                    </label>
                </div>
                <div className="w-[92%] mt-8">
                    <CTAButton type="submit" active={true} linkto={"/"}>Create Account</CTAButton>
                </div>
            </form>
        </div>
    );
}

export default SignupForm;