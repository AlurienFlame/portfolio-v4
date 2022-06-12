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
    let that = this; // hack to get around namespace issues
    fetch("/api/projects")
      .then((response) => response.body)
      .then((body) => {
        // For each chunk of data that gets streamed in:
        let reader = body.getReader();
        reader.read().then(function processData({ done, value }) {
          if (done) {
            return;
          }
          // log the chunk of data as text
          let text = new TextDecoder("utf-8").decode(value);
          try {
            var json = JSON.parse(text);
            that.setState({ projects: json });
          } catch (error) {
            console.warn("Backend sent invalid JSON.");
            console.log(text);            
          }


          // read the next chunk
          reader.read().then(processData);
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
