import React from "react";
import Template from "./Template";
import signupbg from "../../../assets/images/bgwhite.jpg"
import SignUpImg from "../../../assets/images/signupimg.jpg"

const Signup = (props) => {

    const setIsLoggedIn = props.setIsLoggedIn;

    return (
        <div className="my-8">
                <Template
                title="Join the millions learning to code with studyPilot for free"
                desc1="Build skills for today, tomorrow and beyond."
                desc2="Skills are the currency of the future. Invest in yourself wisely."
                image1={SignUpImg}
                image2={signupbg}
                formType="signup"
                setIsLoggedIn={setIsLoggedIn}
                />
        </div>
    )
}

export default Signup;