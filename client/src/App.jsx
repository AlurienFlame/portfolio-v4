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
    fetch("/api/projects")
      .then((response) => response.body)
      .then((body) => {
        // For each chunk of data that gets streamed in:
        body.getReader().read().then((chunk) => {
          // log the chunk of data as text
          let text = new TextDecoder("utf-8").decode(chunk.value);
          // FIXME: Trying to parse multiple JSON objects in one chunk
          console.log(text)
          // let json = JSON.parse(text);

          // this.setState({ projects: json });
        });
      })
      .catch((error) => {
        console.warn("Network error connecting to project data API:", error);
      });
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
}

export default App;
