import React from "react";
import instructor from "../../../assets/images/instructor.jpg";
import whitebg from "../../../assets/images/whitebg.jpg";
import HightlightText from "./HighlightText";
import CTAButton from './Button';
import { FaArrowRight } from "react-icons/fa";

const InstructorSection = () => {
    return (
        <div className=" bg-richblack-900 w-[100%] mt-[100px]">
            <div className="flex gap-8 items-center mx-auto p-10 justify-center">
                <div className="w-[50%] flex justify-center items-center">
                    <img
                        src={whitebg}
                        className="absolute w-[450px] h-[370px]"
                    />
                    <img
                        src={instructor}
                        alt="Instructor"
                        className="absolute w-[460px] h-[380px] translate-x-[3%] translate-y-[5%]"
                    />
                </div>

                <div className="mx-auto flex flex-col gap-8 w-[50%] justify-center items-start p-4">
                    <div className="text-4xl font-semibold w-[50%]">
                        Become an
                        <HightlightText text={"Instructor"} />
                    </div>
                    <div className="w-[70%] text-left font-medium text-[16px] text-richblack-400">
                        adipisicing elit. Pariatur, sit. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet earum sequi beatae incidunt provident rem unde sunt sit illum numquam?
                    </div>
                    <div className="">
                        <CTAButton active={true} linkto={"/signup"}>
                            <div className="flex items-center gap-2">
                                Start Teaching Today
                                <FaArrowRight/>
                            </div>
                            
                        </CTAButton>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default InstructorSection;