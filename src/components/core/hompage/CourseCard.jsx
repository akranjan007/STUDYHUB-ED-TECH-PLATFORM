import React from "react";

const CourseCard = ({cardData, currentCard, setCurrentCard}) => {

    const setMyCurrentCard = (value) => {
        setCurrentCard(value.heading);

    }

    return (
        <div className={` flex flex-col gap-8 cursor-pointer px-8 py-10 h-[100%] w-[100%]
                ${currentCard === cardData.heading ? "bg-white text-richblack-800 shadow-[5px_5px_rgba(255,255,0,_0.4),_10px_10px_rgba(255,255,0,_0.3),_15px_15px_rgba(255,255,0,_0.2),_20px_20px_rgba(255,255,0,_0.1),_25px_25px_rgba(255,255,0,_0.05)]" : "bg-richblack-800 text-richblack-50"}`} 
            onClick={() => setMyCurrentCard(cardData)}>
            <div className="text-[24px] font-semibold">
                {cardData.heading}
            </div>
            <div>
                {cardData.description}
            </div>
            <div className="flex justify-between">
                <div>
                    {cardData.level}
                </div>
                <div>
                    {cardData.lessonNumber} Lessons
                </div>
            </div>
        </div>
    )
}

export default CourseCard;