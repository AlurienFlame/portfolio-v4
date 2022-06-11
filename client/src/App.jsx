import React from "react";
import "./App.css";
import Projects from "./Projects.jsx";
import Bio from "./Bio.jsx";
import Contact from "./Contact.jsx";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects: []
    };
  }

  componentDidMount() {
    this.fetchProjectData();
  }

  render() {
    return (
      <div className="App">
        <Bio projects={this.state.projects} />
        {/* TODO: Demos */}
        <Projects projects={this.state.projects} />
        <Contact />
      </div>
    );
  }

  async fetchProjectData() {
    await fetch("/api/projects")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ projects: data });
      })
      .catch((error) => {
        console.warn("Network error connecting to project data API:", error);
      });
  }
}

export default App;
