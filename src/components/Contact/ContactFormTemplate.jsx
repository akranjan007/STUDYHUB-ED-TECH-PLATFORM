import React, { useState, useEffect } from "react";
import {useForm} from "react-hook-form";
import CountryCode from "../../data/countryCode.json";



const ContactFormTemplate = () => {

    const [loading, setLoading] = useState(false);
    const {
        register, handleSubmit, reset, formState: { errors, isSubmitSuccessful }
    } = useForm();

    const submitContacForm = async(data) => {
        console.log("Logging Data : ", data);
        try{
            setLoading(true);
            //const response = await apiConnector("POST", contactusEndpoint.CONTACT_US_API, data);
            const response = {status:"OK"};
            console.log("Response : ", response);
            setLoading(false);
        }
        catch(error){
            console.log("Error : ", error.message);
            setLoading(false);
        }
    }
    useEffect( ( ) => {
        if(isSubmitSuccessful){
            reset({
                email:"",
                firstName:"",
                lastName:"",
                message:"",
                phoneNo:"", 
            })
        }
    }, [reset, isSubmitSuccessful]);

    return (
        <form onSubmit={handleSubmit(submitContacForm)}>
            <div className="flex flex-col gap-3">
            <div className="flex gap-5 justify-between">
                <div className="flex flex-col">
                    <label htmlFor="firstName">First Name</label>
                    <input
                    type="text"
                    name="firstName"
                    id="firstName"
                    placeholder="Enter your First Name"
                    {...register("firstName", {required:true})}
                    className=" text-[12px] p-2 bg-richblack-800 my-1 outline-none rounded-sm"
                    />
                    {
                        errors.firstName && (
                            <span className="text-red-400 text-sm">
                                Please enter your name
                            </span>
                        )
                    }
                </div>
                <div className="flex flex-col">
                    <label htmlFor="lastName">Last Name</label>
                    <input
                    type="text"
                    name="lastName"
                    id="lastName"
                    placeholder="Enter your Last Name"
                    {...register("lastName")}
                    className=" text-[12px] p-2 bg-richblack-800 my-1 outline-none rounded-sm"
                    />
                </div>
            </div>
            <div className="flex flex-col">
                    <label htmlFor="email">Email Address</label>
                    <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter your Email Address"
                    {...register("email", {required:true})}
                    className=" text-[12px] p-2 bg-richblack-800 my-1 outline-none rounded-sm"
                    />
                    {
                        errors.email && (
                            <span className="text-red-400 text-sm">
                                Please enter your email address.
                            </span>
                        )
                    }
            </div>
            <div className="flex flex-col">
                    <label htmlFor="contactNo">Contact Number</label>
                    <div className="flex gap-5">
                            <select
                            name="dropdown"
                            id="dropdown"
                            {...register("countrycode", {required:true})}
                            className=" text-[12px] p-2 bg-richblack-800 my-1 outline-none rounded-sm w-[65px]"
                            >
                                {
                                    CountryCode.map((element, index) => {
                                        return (
                                            <option key={index} value={element.code}>
                                                {element.code} - {element.country}
                                            </option>
                                        )
                                    })
                                }
                            </select>
                            <input
                            type="tel"
                            name="contactNo"
                            id="contactNo"
                            placeholder="9876543210"
                            {...register("contactNo", 
                                {
                                    required:{value:true, message:"Please Enter Phone Number"},
                                    maxLength:{value:10, message:"Invalid Phone Number"},
                                    minLength:{value:8, message:"Invalid Phone Number"}
                                }
                            )}
                            className=" text-[12px] p-2 bg-richblack-800 my-1 outline-none rounded-sm w-[calc(100%-90px)]"
                            />
                            {
                                errors.contactNo && (
                                    <span className="text-red-400 text-sm">
                                        {errors.contactNo.message}
                                    </span>
                                )
                            }
                    </div>
            </div>
            <div className="flex flex-col">
                    <label htmlFor="message">Message</label>
                    <textarea
                    name="message"
                    id="message"
                    cols="60"
                    rows="5"
                    placeholder="Enter your message"
                    {...register("message", {required:true})}
                    className=" text-[12px] p-2 bg-richblack-800 my-1 outline-none rounded-sm"
                    />
                    {
                        errors.message && (
                            <span className="text-red-400 text-sm">
                                Please enter your message.
                            </span>
                        )
                    }
            </div>
            <button type="submit" className = "rounded-[8px] bg-yellow-500 py-[8px] px-[12px] font-medium text-richblack-900 w-[100%]">
                    Send Message
            </button>
            </div>
        </form>
    )
}

export default ContactFormTemplate;