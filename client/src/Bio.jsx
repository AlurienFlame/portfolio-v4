import React from "react";
import "./Bio.css";

class Bio extends React.Component {
    render() {
        return (
            <div className="bio">
                <h2>Lucien Lasseau</h2>
                <p>I'm an aspiring software developer studying at Stanford University. I love using code to bring ideas to life.</p>
                <a href="https://github.com/AlurienFlame">GitHub</a>
            </div>
        );
    }
}

export default Bio;
