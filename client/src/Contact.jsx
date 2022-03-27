import { Component } from "react";
import "./Contact.css";

class Contact extends Component {
    render() {
        return (
            <div className="contact">
                <h2>Get in touch</h2>
                <div>
                    Shoot me an email at <a className="email" href="mailto:contact@lucienlasseau.com">contact@lucienlasseau.com</a>{" "}
                </div>
            </div>
        );
    }
}

export default Contact;
