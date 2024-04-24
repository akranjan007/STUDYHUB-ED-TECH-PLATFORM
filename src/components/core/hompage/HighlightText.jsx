import React from "react";

const HightlightText = ({text}) => {
    return (
        <span className="font-bold text-blue-300 gap-1">
            {" "}{text}
        </span>
    );
}

export default HightlightText;