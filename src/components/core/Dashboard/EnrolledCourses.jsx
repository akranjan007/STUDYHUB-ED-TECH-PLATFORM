import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { getUserEnrolledCourses } from "../../../Services/Operations/profileApi";
import ProgressBar from "@ramonak/react-progress-bar";

const EnrolledCourses = () => {

    const {token} = useSelector((state) => state.auth);
    const [enrolledCourses, setEnrolledCourses] = useState(null);

    console.log(token);

    const getEnrolledCourses = async() => {
        try{
            const response = await getUserEnrolledCourses(token);
            setEnrolledCourses(response);
            console.log("Enrolled Courses " + response);
        }
        catch(error){
            console.log("Unable to fetch Enrolled Courses data" + error);
        }
    }

    useEffect(() => {
        getEnrolledCourses();
    }, [])

    return (
        <div className="text-richblack-50">
            <h1 className="mb-14 text-3xl font-medium text-richblack-50">Enrolled Courses</h1>
            {
                !enrolledCourses ?
                (<div>Loading....</div>) :
                !enrolledCourses.length ?
                (<div>You have not enrolled in any course.</div>) :
                (
                    <div>
                        <div>
                            <p>Course Name</p>
                            <p>Duration</p>
                            <p>Progress</p>
                        </div>
                        {
                            enrolledCourses.map((course, index) => (
                                <div>
                                    <div>
                                        <img src={course.thumbnail} />
                                        <div>
                                            <p>{course.courseName}</p>
                                            <p>{course.description}</p>
                                        </div>
                                    </div>
                                    <div>
                                        <p>{course?.totalDuration}</p>
                                    </div>
                                    <div>
                                        <p>Progress : {course.progressPercentage || 0}%</p>
                                        <ProgressBar
                                            completed={course.progressPercentage || 0}
                                            height='8px'
                                            isLabelVisible={false}
                                        />
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                )
            }
        </div>
    )
}

export default EnrolledCourses;