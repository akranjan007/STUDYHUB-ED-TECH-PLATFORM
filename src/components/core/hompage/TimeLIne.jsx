import React from "react";
import Logo1 from "../../../assets/logo/logo1.png";
import Logo2 from "../../../assets/logo/logo2.png";
import Logo3 from "../../../assets/logo/logo3.png";
import Logo4 from "../../../assets/logo/logo4.png";
import tlimage from "../../../assets/timelineLogo/tlimage.jpg";

const timeLine = [
    {
        logo: Logo1,
        heading:"Leadership",
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, sunt.",
    },
    {
        logo:Logo2,
        heading:"Leadership",
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, sunt.",
    },
    {
        logo:Logo3,
        heading:"Leadership",
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, sunt.",
    },
    {
        logo:Logo4,
        heading:"Leadership",
        description:"Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo, sunt.",
    },
];

const TimeLine = () =>{
    return (
        <div>
            
            <div className="flex gap-10 items-center justify-between">

                <div className="flex flex-col w-[45%] gap-4">
                    {
                        timeLine.map((element , index) => {
                            return (
                                <div className="flex gap-3 " key={index}>
                                    <div className="w-[60px] h-[60px] flex items-center justify-center bg-white">
                                        <img src={element.logo}/>
                                    </div>
                                    <div className="text-left">
                                        <h1 className="font-bold text-[18px]">{element.heading}</h1>
                                        <p className="text-base">{element.description}</p>
                                    </div>
                                </div>
                                
                            )
                        })
                    }
                </div>

                <div className="relative shadow-blue-200">
                    <img src={tlimage} alt="TimeLine Image" className="h-[400px] shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] object-cover"/>

                    <div className="absolute bg-green-800 text-white flex flex-row uppercase py-3
                                        left-[50%] translate-x-[-50%] translate-y-[-50%]">
                        <div className="flex gap-4 items-center border-r border-green-400 px-5">
                            <p className="text-3xl font-bold">10</p>
                            <p className="text-green-400 text-sm">Years of Experience</p>
                        </div>

                        <div className="flex gap-4 items-center px-5">
                            <p className="text-3xl font-bold">250</p>
                            <p className="text-green-400 text-sm">Types of Courses</p>
                        </div>
                    </div>

                </div>

            </div>
        </div>
    )
}

export default TimeLine;