import React from "react";
import HightlightText from "./HighlightText";
import CTAButton from './Button';
import { FaArrowRight } from "react-icons/fa";
import {TypeAnimation} from "react-type-animation";

const CodeBlocks = ({
    position, heading, subheading, ctabtn1, ctabtn2, codeblock, backgroundGradient, codeColor
}) => {
    return (
        <div className={`flex ${position} justify-evenly my-20 gap-10 w-[90%]`}>
            <div className="w-[40%] flex flex-col gap-8">
                {heading}
                <div className="w-[90%] text-left text-sm font-semibold text-richblack-300 mt-4">
                    {subheading}
                </div>
                <div className="flex gap-6 mt-6" >
                    <CTAButton active={ctabtn1.active} linkto={ctabtn1.linkto}>
                        <div className="flex gap-4 items-center">
                            {ctabtn1.btnText}
                            <FaArrowRight/>
                        </div>
                    </CTAButton>
                    <CTAButton active={ctabtn2.active} linkto={ctabtn2.linkto}>
                            {ctabtn2.btnText}
                    </CTAButton>
                </div>
            </div>

            <div className="h-fit text-[14px] w-[50%] flex gap-1 lg:w-[500px] shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] py-6">
                <div className="text-center flex flex-col w-[10%] text-richblack-400 font-bold">
                    <p>1</p>
                    <p>2</p>
                    <p>3</p>
                    <p>4</p>
                    <p>5</p>
                    <p>6</p>
                    <p>7</p>
                    <p>8</p>
                    <p>9</p>
                </div>
                <div className={`w-[100%] flex flex-col  text-small font-semibold  font-mono ${codeColor} `}>
                    <TypeAnimation
                        sequence={[codeblock, 2000, ""]}
                        repeat={Infinity}
                        cursor={true}
                        omitDeletionAnimation={true}
                        style={
                            {
                                whiteSpace:"pre-line",
                                display:"block",
                            }
                        }
                    />
                </div>
            </div>

        </div>
    );
};

export default CodeBlocks;
