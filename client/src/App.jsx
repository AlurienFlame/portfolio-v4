import React from "react";
import "./App.css";
import Projects from "./Projects.jsx";
import Bio from "./Bio.jsx";
import Contact from "./Contact.jsx";

class App extends React.Component {
    render() {
        return (
            <div className="App">
                <Bio />
                {/* TODO: Demos */}
                <Projects />
                <Contact />
            </div>
        );
    }
}

export default App;
