import React from "react";
import GenericBtn from "./GenericBtn";

const ConfirmationModal = ({modalData}) => {
    return(
        <div>
            <div className="flex flex-col">
                <p>{modalData.text1}</p>
                <p>{modalData.text2}</p>
                <div className="flex">
                    <GenericBtn onclick={modalData?.btn1handler} text={modalData?.btn1text} />
                    <button onClick={modalData?.btn2handler}>
                        {modalData?.btn2text}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationModal;