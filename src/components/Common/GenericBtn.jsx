import React from "react";

const GenericBtn = ({
    text, onclick, children, disabled, outline=false, customClasses, type
}) => {
    return (
        <button
        disabled={disabled}
        onClick={onclick}
        type={type}
        >
            {
                children ? (
                    <>
                    <span>
                        {text}
                    </span>
                    {children}
                    </>
                ) : (text)
            }
        </button>
    )
}

export default GenericBtn;