import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import GenericBtn from "../../Common/GenericBtn";
import { RiEditBoxLine } from "react-icons/ri";

const MyProfile = () => {

    const { user } = useSelector((state) => state.profile);
    const navigate = useNavigate();

    return (
        <div>
            <h1 className="mb-14 text-3xl font-medium text-richblack-50">My Profile</h1>

            <div className="flex items-center justify-between rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
                <div className="flex items-center gap-x-4">
                    <img
                    src={`${user?.image}`}
                    alt={`profile-${user?.firstName}`}
                    className="aspect-square w-[70px] rounded-full object-cover "
                    />
                    <div className="space-y-1">
                        <p className="text-lg font-semibold text-richblack-50">{user?.firstName + " " + user?.lastName}</p>
                        <p className="text-sm text-richblack-200">{user?.email}</p>
                    </div>
                </div>
                <GenericBtn
                        text="Edit"
                        onclick={() => {
                        navigate("/dashboard/settings")
                        }}
                    >
                        <RiEditBoxLine />
                </GenericBtn>
            </div>

            <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
                
                    <div className="flex w-full items-center justify-between">
                        <p className="text-lg font-semibold text-richblack-50">About</p>
                        <GenericBtn
                                text="Edit"
                                onclick={() => {
                                navigate("/dashboard/settings")
                                }}
                            >
                                <RiEditBoxLine />
                        </GenericBtn>

                    </div>
                    <p className={`${user?.additionalDetails?.about ? "text-richblack-50" : "text-richblack-200"} 
                        text-sm font-medium`}>
                            {user?.additionalDetails?.about ?? "Add About YOurself."}
                    </p>
                
            </div>

            <div className="my-10 flex flex-col gap-y-10 rounded-md border-[1px] border-richblack-700 bg-richblack-800 p-8 px-12">
                <div className="flex w-full items-center justify-between">
                    <p className="text-lg font-semibold text-richblack-50">
                        Personal Details
                    </p>
                    <GenericBtn
                        text="Edit"
                        onclick={() => {
                        navigate("/dashboard/settings")
                        }}
                    >
                        <RiEditBoxLine />
                    </GenericBtn>
                </div>

                <div className="flex max-w-[500px] justify-between">
                    <div className="flex flex-col gap-y-5">
                        <div>
                            <p className="mb-2 text-sm text-richblack-300">First Name</p>
                            <p className="text-sm font-medium text-richblack-50">
                                {user?.firstName}
                            </p>
                        </div>
                        <div>
                            <p className="mb-2 text-sm text-richblack-300">Email</p>
                            <p className="text-sm font-medium text-richblack-50">
                                {user?.email}
                            </p>
                        </div>
                        <div>
                            <p className="mb-2 text-sm text-richblack-300">Gender</p>
                            <p className="text-sm font-medium text-richblack-50">
                                {user?.additionalDetails?.gender ?? "Add Gender"}
                            </p>
                        </div>
                    </div>
                    <div className="flex flex-col gap-y-5">
                        <div>
                            <p className="mb-2 text-sm text-richblack-300">Last Name</p>
                            <p className="text-sm font-medium text-richblack-50">
                                {user?.lastName}
                            </p>
                        </div>
                        <div>
                            <p className="mb-2 text-sm text-richblack-300">Phone Number</p>
                            <p className="text-sm font-medium text-richblack-50">
                                {user?.additionalDetails?.contactNumber ?? "Add Contact Number"}
                            </p>
                        </div>
                        <div>
                            <p className="mb-2 text-sm text-richblack-300">Date Of Birth</p>
                            <p className="text-sm font-medium text-richblack-50">
                                {(user?.additionalDetails?.dateOfBirth) ??
                                "Add Date Of Birth"}
                            </p>
                        </div>
                    </div>
                </div>

            </div>

        </div>
    )
}

export default MyProfile;