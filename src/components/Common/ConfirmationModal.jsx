import React from "react";
import GenericBtn from "./GenericBtn";

const ConfirmationModal = ({modalData}) => {
    return(
        <div className="fixed inset-0 z-[1000] !mt-0 grid place-items-center overflow-auto bg-white bg-opacity-10 backdrop-blur-sm text-white">
            <div className="w-11/12 max-w-[350px] rounded-lg border border-richblack-400 bg-richblack-800 p-6">
                <p className="text-xl font-bold mt-3 mb-1">{modalData.text1}</p>
                <p className="text-sm mb-3 text-richblack-200">{modalData.text2}</p>
                <div className="flex gap-5">
                    <GenericBtn onclick={modalData?.btn1handler} text={modalData?.btn1text} />
                    <button onClick={modalData?.btn2handler} className="bg-richblack-500 px-2 py-1 rounded-md m-1 font-semibold">
                        {modalData?.btn2text}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationModal;