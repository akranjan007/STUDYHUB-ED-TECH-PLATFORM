import React from "react";
import HightlightText from "./HighlightText";
import CTAButton from "./Button";
import knowLang from "../../../assets/images/know.jpeg";
import compete from "../../../assets/images/compete.png";
import planimg from "../../../assets/images/plan.png"

const LanguageLearn = () =>{
    return (
        <div className="mt-[150px] w-[11/12] mb-[100px]">
            <div className="flex flex-col gap-5">
                <div className="text-4xl font-semibold text-center">
                    <h1>Your swiss knife for 
                        <HightlightText text={"learning any language"}/>
                    </h1>
                </div>
                <div className="text-base mx-auto text-center text-richblack-400 w-[60%]">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Laudantium modi dignissimos praesentium, 
                    fugiat libero numquam illum sit rerum? Voluptatibus aut fuga iure ullam
                </div>

                <div className="flex justify-center items-center mt-[50px] mb-[50px] gap-8">
                    <img
                        src={knowLang}
                        alt="Know your progress"
                        className="object-contain h-[350px] w-[350px] rotate-45"
                    />
                    <img 
                        src={compete}
                        alt="Compete with friends"
                        className="object-contain h-[350px] w-[350px]"
                    />
                    <img
                        src={planimg}
                        alt="Plan your lessons"
                        className="object-contain h-[350px] w-[350px] -rotate-45"
                    />
                </div>

                <div className="mx-auto">
                    <CTAButton active={true} linkto={"/signup"}>
                        <div> 
                            Learn More
                        </div>
                    </CTAButton>
                </div>
            </div>
        </div>
    )
}

export default LanguageLearn;