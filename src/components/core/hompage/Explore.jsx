import React, { useState } from "react";
import { HomePageExplore } from "../../../data/ExploreCourses";
import HightlightText from "./HighlightText";
import CourseCard from "./CourseCard";



const tabsName = [
    "Free", "New to Coding", "Most Popular", "Skill Paths", "Career Paths"
];

const Explore = () => {

    const [ currentTab, setCurrentTab ] = useState(tabsName[0]);
    const [ courses, setCourses ] = useState(HomePageExplore[0].courses);
    const [ currentCard, setCurrentCard ] = useState(HomePageExplore[0].courses[0].heading);

    const setMyCards = (value) => {
        setCurrentTab(value);
        const result = HomePageExplore.filter((courses) => courses.tag === value);
        setCourses(result[0].courses);
        setCurrentCard(result[0].courses[0].heading);
    }


    return (
        <div className="mt-[50px] gap-3 flex flex-col items-center">
            <div className="text-4xl font-semibold text-center mt-[5px]">
                Unlock the
                <HightlightText text={"Power of Code"}/>
            </div>
            <p className="text-[16px] mt-[5px] text-richblack-400 font-medium text-center">
                Learn to build anything you can imagine.!
            </p>
            <div className="flex items-center bg-richblack-800 rounded-3xl mt-[25px] w-fit justify-center">
                {
                    tabsName.map((element, index) => {
                        return (
                                <div
                                className={`text-[14px] items-center  mx-2 my-1
                                        ${ currentTab === element ? "bg-richblack-900 text-white font-medium" 
                                        : "text-richblack-50 "} rounded-3xl transition-all duration-200 cursor-pointer
                                         hover:bg-richblack-900 hover:text-richblack-50 p-2`}
                                key={index}
                                onClick={() => setMyCards(element)}
                                >
                                    {element}
                                </div>
                        )
                    })
                }
            </div>

            <div className="flex flex-row justify-center items-start gap-10 aboslute">
                {
                    courses.map((element, index) => {
                        return (
                            <div className="w-[25%] relative translate-y-[15%]">
                                <CourseCard
                                key={index}
                                cardData = {element}
                                currentCard = {currentCard}
                                setCurrentCard = {setCurrentCard}
                            />
                            </div>
                            
                        )
                    })
                }
            </div>
        </div>
    )
};

export default Explore;