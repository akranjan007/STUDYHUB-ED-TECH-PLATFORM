import React, { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { sendOtp } from "../../../Services/Operations/AuthApi";
import { setSignupData } from "../../../slices/authSlice";
import toast from "react-hot-toast";

const SignupForm = ({setIsLoggedIn}) => {

    const [ formData, setFormData ] = useState({
        firstName:"", lastName:"", email:"", password:"", confirmPassword:""
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
    const [ accountType, setAccountType ] = useState("Student");

    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    
    //console.log(signupData);

    function submitHandler(e){
        e.preventDefault();
        if(formData.password !== formData.confirmPassword) {toast.error("Passwords do not match");  return ; }
        const signupData = { ...formData , accountType};
        dispatch(setSignupData(signupData))                     // Setting signup data to state To be used after otp verification
        dispatch(sendOtp(formData.email, navigate))            // Send OTP to user for verification
        setFormData({firstName: "", lastName: "",  email: "",  password: "",  confirmPassword: "",})
    }
    
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
            <form onSubmit={submitHandler} className="w-[70%] text-richblack-400">
                <div className="flex flex-row justify-start items-center g-[12px]">
                    <label className="w-[50%] mt-3">
                        <p className=" mt-1">First Name<sup>*</sup></p>
                        <input
                            type="text"
                            name="firstName"
                            value={formData.firstName}
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
                            name="lastName"
                            value={formData.lastName}
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
                            name="password"
                            value={formData.password}
                            onChange={changeHandler}
                            placeholder="Enter Password"
                            required
                            className="w-[85%] text-[12px] p-2 bg-richblack-800 mt-2 outline-none rounded-sm"
                        />
                        <span onClick={() => setShowPassword((prev) => !prev)} className="absolute  translate-y-[100%] translate-x-[-160%] ">
                            {showPassword ? (<AiOutlineEyeInvisible/>) : (<AiOutlineEye/>)}
                        </span>
                    </label>
                    <label className="w-[50%]">
                        <p className="text-richblack-300 mt-1">Confirm Password<sup>*</sup></p>
                        <input
                            type={showPassword1 ? ("text") : ("password")}
                            name="confirmPassword"
                            value={formData.confirmPassword}
                            onChange={changeHandler}
                            placeholder="Confirm Password"
                            required
                            className="w-[85%] text-[12px] p-2 bg-richblack-800 mt-2 outline-none rounded-sm"
                        />
                        <span onClick={() => setShowPassword1((prev) => !prev)} className="absolute  translate-y-[100%] translate-x-[-160%] ">
                            {showPassword1 ? (<AiOutlineEyeInvisible/>) : (<AiOutlineEye/>)}
                        </span>
                    </label>
                </div>
                <button  type="submit"  className = "w-[93%] mt-6 rounded-[8px] bg-yellow-500 py-[8px] px-[12px] font-medium text-richblack-900">  Create Account </button>
            </form>
        </div>
    );
}

export default SignupForm;