import React from "react";
import HightlightText from "../hompage/HighlightText";

const Quote = () => {
    return (
        <div>
            We are passionate about revolutionizing the way we learn. Our innovative platform
            <HightlightText text={"combines technology."}/>
            <span className="text-red-500">
                expertise
            </span>
            , and community to create an 
            <span className="text-red-500">
                unparalled educational experience.
            </span>
        </div>
    )
}

export default Quote;