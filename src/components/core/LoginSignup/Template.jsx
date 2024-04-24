import React from "react";
import SignupForm from "./SignupForm";
import LoginForm from "./LoginForm";
import HightlightText from "../hompage/HighlightText";
import { FcGoogle } from "react-icons/fc";
import CTAButton from "../hompage/Button";

const Template = ({title, desc1, desc2, image1, image2, formType, setIsLoggedIn}) => {
    return (
        <div className="flex flex-row justify-center items-start mx-auto mt-[100px] max-w-maxContent w-11/12 gap-[10px]">
            <div className="flex flex-col text-white w-[50%] ">
                <div className="w-10/12">
                    <h1 className="text-4xl font-semibold text-left mt-3">{title}</h1>
                    <p className="mt-2 text-justify">{desc1}  </p>
                    <HightlightText text={desc2}/>
                </div>
                

                {formType === "signup" ? 
                <SignupForm setIsLoggedIn={setIsLoggedIn}/> : 
                <LoginForm setIsLoggedIn={setIsLoggedIn}/>}

                <div>
                    {
                        formType === "signup" ? 
                        <div>
                            <div className="mt-4 flex items-center">
                                <div className="w-[29%] bg-richblack-200 h-[1px]"></div>
                                <div className="text-richblack-200 mx-[5px]">OR</div>
                                <div className="w-[29%] bg-richblack-200 h-[1px]"></div>
                            </div>


                            <div className="w-[65%] mt-4">
                                <CTAButton active={false} linkto={"#"} >
                                    <div className="flex justify-center items-center">
                                        <FcGoogle className="mx-2"/>
                                        Sign Up with Google
                                    </div>
                                </CTAButton>
                            </div>
                        </div> 
                        : 
                        <div>
                            <div className="mt-4 flex items-center">
                                <div className="w-[25%] bg-richblack-200 h-[1px]"></div>
                                <div className="text-richblack-200 mx-[5px]">OR</div>
                                <div className="w-[25%] bg-richblack-200 h-[1px]"></div>
                            </div>
                            
                            <div className="w-[56%] mt-4">
                                <CTAButton active={false} linkto={"#"} >
                                    <div className="flex justify-center items-center">
                                        <FcGoogle className="mx-2"/>
                                        Sign In with Google
                                    </div>
                                </CTAButton>
                            </div>
                            
                        </div> 
                    }
                </div>

            </div>

            <div className="w-fit">
                <img src={image2} alt="Background Img" className="relative h-[350px] w-[400px]"/>
                <img src={image1} alt="Login Image" className="absolute h-[350px] w-[400px] translate-y-[-105%] translate-x-[-5%]" />
            </div>
        </div>
    )
}

export default Template;