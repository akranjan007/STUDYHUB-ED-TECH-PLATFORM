import React from "react";
import { FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import HightlightText from "../components/core/hompage/HighlightText";
import CTAButton from "../components/core/hompage/Button";
import Banner from "../assets/images/banner.mp4"
import CodeBlocks from "../components/core/hompage/CodeBlocks";
import TimeLine from "../components/core/hompage/TimeLIne";
import LanguageLearn from "../components/core/hompage/LanguageLearn";
import InstructorSection from "../components/core/hompage/InstructorSection";
import Explore from "../components/core/hompage/Explore";


const Home = () => {
    return (
        <div className="relative mx-auto flex flex-col items-center text-white justify-between max-w-maxContent">
            <div className="w-11/12 mx-auto flex flex-col items-center justify-between max-w-maxContent bg-richblack-900">
                <Link to={"/signup"}>
                    <div className=" group mx-auto rounded-full bg-richblack-800 font-bold text-richblack-200 transition-all duration-200 hover:scale-95
                    w-fit mt-16 p-1">
                        <div className="flex justify-center items-center gap-2 rounded-full px-10 py-[5px] group-hover:bg-richblack-900">
                            <p>Become An Instructor </p>
                            <FaArrowRight/>
                        </div>
                    </div>
                </Link>

                <div className="text-center text-3xl font-semibold mt-6">
                    Empower Your Future with
                    <HightlightText text={"Coding Skills"} />
                </div>

                <div className="w-[90%] text-center text-medium font-semibold text-richblack-300 mt-4" >
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Voluptatum est neque dolores expedita
                    consequatur cumque quaerat!
                </div>

                <div className="flex gap-7 mt-8 ">
                    <CTAButton active={true} linkto={"/signup"}>Learn More</CTAButton>
                    <CTAButton active={false} linkto={"/login"}> Book A Demo</CTAButton>
                </div>

                <div className="shadow-[0_20px_50px_rgba(8,_112,_184,_0.7)] mx-4 my-8 w-[75%]">
                    <video muted loop autoPlay>
                        <source src={Banner} type="video/mp4"/>
                    </video>
                </div>

                <div className="flex justify-center items-center w-[90%]">
                    <CodeBlocks 
                        position={"lg:flex-row"}
                        heading={
                            <div className="text-4xl font-semibold">
                                Unlock your 
                                <HightlightText text={"coding potential "} />
                                with our online courses.
                            </div>
                        }
                        subheading={
                            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit deserunt quos molestiae sequi vero delectus? Labore placeat deleniti mollitia consequuntur, aspernatur atque perspiciatis dignissimos quos facere quidem, minima, non in! "
                        }
                        ctabtn1={
                            {
                                active:true,
                                linkto:"/signup",
                                btnText:"Try it yourself..!!",
                            }
                        }
                        ctabtn2={
                            {
                                active:false,
                                linkto:"/login",
                                btnText:"Learn More",
                            }
                        }
                        codeblock={
                            "<!DOCTYPE html>\n<html>\n<body>\n<h1>Welcome to My Web Page</h1>\n<p>This is a short HTML example.</p>\n</body>\n</html>"
                        }
                        codeColor={"text-yellow-300"}
                        />
                </div>
                <div className="flex justify-center items-center w-[90%]">
                    <CodeBlocks 
                        position={"lg:flex-row-reverse"}
                        heading={
                            <div className="text-4xl font-semibold">
                                Start
                                <HightlightText text={"coding in seconds. "} />
                            </div>
                        }
                        subheading={
                            "Lorem ipsum dolor sit amet consectetur adipisicing elit. Impedit deserunt quos molestiae sequi vero delectus? Labore placeat deleniti mollitia  Impedit deserunt quos molestiae sequi vero delectus? Labore placeat deleniti mollitia"
                        }
                        ctabtn1={
                            {
                                active:true,
                                linkto:"/signup",
                                btnText:"Try it yourself..!!",
                            }
                        }
                        ctabtn2={
                            {
                                active:false,
                                linkto:"/login",
                                btnText:"Learn More",
                            }
                        }
                        codeblock={
                            "<!DOCTYPE html>\n<html>\n<body>\n<h1>Welcome to My Web Page</h1>\n<p>This is a short HTML example.</p>\n</body>\n</html>"
                        }
                        codeColor={"text-yellow-300"}
                        />
                </div>

                <Explore/>
            </div>

            <div className=" bg-white text-richblack-700 w-12/12">
                <div className="homepage_bg h-[250px]">
                    <div className="w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-5 mx-auto">
                        <div className="h-[80px]"></div>
                        <div className="flex flex-row gap-7 mx-auto text-white">
                            <CTAButton active={true} linkto={'/signup'}>
                                <div className="flex items-center gap-3">
                                    Explore Full Catalog
                                    <FaArrowRight/>
                                </div>
                            </CTAButton>
                            <CTAButton active={false} linkto={'/login'}>
                                <div className="flex items-center gap-3">
                                    Learn More
                                </div>
                            </CTAButton>
                        </div>
                    </div>

                </div>
                
                <div className="w-11/12 max-w-maxContent flex flex-col items-center justify-between gap-5 mx-auto">
                    <div className="flex w-9/12 gap-8 mt-[100px] mb-10">
                        <div className="text-4xl font-semibold">
                            Get the skills you need for a
                            <HightlightText text={"job that is in demand"} />
                        </div>
                        <div className="flex flex-col items-start gap-6">
                            <div className="text-left text-sm font-semibold text-richblack-300">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Non veritatis labore impedit inventore commodi soluta temporibus, quia quas explicabo. Animi.
                            </div>
                            <div className="">
                                <CTAButton active={true} linkto={'/login'}>Learn More</CTAButton>
                            </div>
                        </div>
                    </div>

                    <TimeLine/>
                    <LanguageLearn/>
                </div>
            </div>



           <div className="w-11/12 mx-auto flex flex-col items-center justify-between max-w-maxContent bg-richblack-900 min-h-screen">
                  <InstructorSection/>
            </div>
            
        </div>
    );
};

export default Home;