import React from "react";
import "./App.css";
import Projects from "./Projects.jsx";



class App extends React.Component {
    render() {
        return (
            <div className="App">
                <div className="bio">
                    <h2>Lucien Lasseau</h2>
                    <p>Amateur software developer and undergraduate at Stanford University.</p>
                    <a href="https://github.com/AlurienFlame">GitHub</a>
                </div>
                {/* TODO: Demos */}
                <Projects />
            </div>
        );
    }
}

export default App;
