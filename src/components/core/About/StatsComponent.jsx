import React from "react";

const stats = [
    {count:"10K", label:"Active Students"},
    {count:"25+", label:"Mentors"},
    {count:"250+", label:"Courses"},
    {count:"80+", label:"Awards"},
];


const StatsComponent = () => {
    return (
        <section>
            <div className="bg-richblack-700">
                <div className="flex justify-around items-center gap-8">
                    {
                        stats.map( (data, index) => (
                            <div key={index}>
                                <h1>{data.count}</h1>
                                <h1>{data.label}</h1>
                            </div>
                        ) )
                    }
                </div>
            </div>  
        </section>
    )
}

export default StatsComponent;