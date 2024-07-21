import React from "react";
import HightlightText from "../components/core/hompage/HighlightText";
import BannerImg1 from "../assets/images/aboutus1.webp";
import BannerImg2 from "../assets/images/aboutus2.webp";
import BannerImg3 from "../assets/images/aboutus3.webp";
import FoundSt from "../assets/images/FoundingStory.png"
import Quote from "../components/core/About/Quote";
import StatsComponent from "../components/core/About/StatsComponent";
import LearningGrid from "../components/core/About/LearningGrid";
import ContactForm from "../components/core/About/ContactForm";

const About = () => {
    return (
        <div className="text-white">
            {/*Section 1 */}
            <section>
                <div className="bg-richblack-700 text-richblack-100">
                    <header>
                        Driving Innovations in Online Education for a
                        <HightlightText text={"Better Future."}/>
                        <p>
                            StudyPilot is at forefront of the driving innovations in online education. 
                            We're passionate about creating a brighter future by offering cutting edge courses, leveraging
                            emerging technologies, and nurturing a vibrant Learnign Community.
                        </p>
                    </header>
                    <div className="flex gap-4">
                        <img src={BannerImg1} alt="Image1"/>
                        <img src={BannerImg2} alt="Image2" />
                        <img src={BannerImg3} alt="Image3"/>
                    </div>
                </div>
            </section>

            {/*Section 2*/}
            <section>
                <div>
                    <Quote/>
                </div>
            </section>

            {/*Section 3*/}
            <section>
                <div className="flex flex-col gap-8">
                    <div className="flex gap-10">
                        <div>
                            <h1>Our Founding Story</h1>
                            <p> Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
                                Provident tempora nam deleniti autem blanditiis commodi alias deserunt mollitia. Quam, atque. 
                            </p>
                            <br/>
                            <p>
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam, voluptas.
                                 Sint praesentium omnis natus corporis excepturi. Assumenda itaque cumque corporis necessitatibus sit velit vitae dolore.
                            </p>
                        </div>

                        <div>
                            <img src={FoundSt} />
                        </div>
                    </div>

                    <div className="flex gap-10">
                        <div>
                            <h1>Our Vision</h1>
                            <p> Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
                                Provident tempora nam deleniti autem blanditiis commodi alias deserunt mollitia. Quam, atque. 
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam, voluptas.
                                 Sint praesentium omnis natus corporis excepturi. Assumenda itaque cumque corporis necessitatibus sit velit vitae dolore.
                            </p>
                        </div>

                        <div>
                            <h1>Our Mission</h1>
                            <p> Lorem, ipsum dolor sit amet consectetur adipisicing elit. 
                                Provident tempora nam deleniti autem blanditiis commodi alias deserunt mollitia. Quam, atque. 
                                Lorem ipsum dolor sit amet consectetur, adipisicing elit. Laboriosam, voluptas.
                                 Sint praesentium omnis natus corporis excepturi. Assumenda itaque cumque corporis necessitatibus sit velit vitae dolore.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/*Section 4*/}
            <StatsComponent/>

            {/* Section 5 */}
            <LearningGrid/>
            
            {/* Section 6 */}
            <section className="mx-auto flex flex-col mb-[100px] items-center justify-between gap-8">
                <ContactForm/>
            </section>
            
        </div>
    )
}

export default About;