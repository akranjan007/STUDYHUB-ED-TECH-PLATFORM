import React from "react";
import HightlightText from "../hompage/HighlightText";
import LoginImg from "../../../assets/images/loginimg.jpg";
import LoginBg from "../../../assets/images/bgwhite.jpg";
import Template from "../../../pages/Template";

const Login = (props) => {

    const setIsLoggedIn = props.setIsLoggedIn;

    return (
        <div className="my-8">
            <Template
                title="Welcome back. Login to explore new horizons and expand your knowledge."
                desc1="Build skills for today, tommorrow, and beyond. "
                desc2="Empowers yourself by taking up future-proof career."
                image1={LoginImg}
                image2={LoginBg}
                formType="login"
                setIsLoggedIn={setIsLoggedIn}
            />
        </div>
    )
}

export default Login;