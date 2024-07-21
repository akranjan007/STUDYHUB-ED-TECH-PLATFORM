import React from "react";
import ContactFormTemplate from "../../Contact/ContactFormTemplate";

const ContactForm = () => {
    return (
        <div>
            <h1>Get in Touch</h1>
            <p>We'd love to hear from you. Write out to us.</p>
            <div className="h-[20px]"></div>
            <div>
                <ContactFormTemplate/>
            </div>
        </div>
    )
}

export default ContactForm;