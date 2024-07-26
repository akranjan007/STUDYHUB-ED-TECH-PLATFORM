import React from "react";

import * as Icons from "react-icons/vsc";

const GenericBtn = ({
    text, icon, onclick, children, disabled, outline=false, customClasses, type
}) => {

    const Icon = Icons[icon];

    return (
        <button
        disabled={disabled}
        onClick={onclick}
        type={type}
        className="bg-yellow-400 text-richblack-700 m-1 px-2 py-1 rounded-md font-semibold"
        >
            {
                children ? (
                    <div className="flex items-center gap-2 ">
                        <span>
                            {text}
                        </span>
                        {children}
                    </div>
                ) : (
                    <div className="flex items-center gap-2">
                        <p>{text}</p>
                        {
                            Icon && 
                            <Icon className="text-lg"/>
                        }
                    </div>
                )
            }
        </button>
    )
}

export default GenericBtn;