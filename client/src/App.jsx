import React from "react";
import "./App.css";
import Projects from "./Projects.jsx";
import Bio from "./Bio.jsx";
import Contact from "./Contact.jsx";
import projects from "./projects.json";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projects
    };
  }
  componentDidMount() {
    // Fetch download counts
    for (let project of this.state.projects) {
      if (!project.distributions) continue;
      for (let distribution of Object.values(project.distributions)) {
        switch (distribution.platform) {
          case "tml":
            this.fetchTmlData(distribution);
            break;
          case "steam":
            this.fetchSteamData(distribution);
            break;
          case "curseforge":
            this.fetchCurseforgeData(distribution);
            break;
          case "modrinth":
            this.fetchModrinthData(distribution);
            break;

          default:
            console.warn("Unsupported distribution platform:", distribution.platform);
            break;
        }
      }
    }
  }

  render() {
    return (
      <div className="App">
        <Bio />
        {/* TODO: Demos */}
        <Projects projects={projects} />
        <Contact />
      </div>
    );
  }

  async fetchSteamData(distribution) {
    // Steam API doesn't allow requests from clients so we need to make the server do it
    await fetch(`/api/steam?id=${distribution.id}`)
      .then((response) => response.json())
      .then((data) => {
        distribution.downloads = data.response.publishedfiledetails[0].lifetime_subscriptions;
      })
      .catch((error) => {
        distribution.downloads = error.toString();
      });
    this.forceUpdate();
  }

  async fetchCurseforgeData(distribution) {
    await fetch(`https://api.cfwidget.com/minecraft/mods/${distribution.id}`)
      .then((response) => response.json())
      .then((data) => {
        distribution.downloads = data.downloads.total;
      })
      .catch((error) => {
        distribution.downloads = error.toString();
      });
    this.forceUpdate();
  }

  async fetchModrinthData(distribution) {
    await fetch(`https://api.modrinth.com/api/v1/mod/${distribution.id}`)
      .then((response) => response.json())
      .then((data) => {
        distribution.downloads = data.downloads;
      })
      .catch((error) => {
        distribution.downloads = error.toString();
      });
    this.forceUpdate();
  }

  async fetchTmlData(distribution) {
    await fetch(`/api/tml?id=${distribution.id}`)
      .then((response) => response.json())
      .then((data) => {
        distribution.downloads = data.downloads;
      })
      .catch((error) => {
        distribution.downloads = error.toString();
      });
    this.forceUpdate();
  }
}

export default App;
