import React from "react";
import "./Projects.css";
import Card from "./Card.jsx";
import Tag from "./Tag.jsx";

class Projects extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      "C#": false,
      Java: false,
      JavaScript: false,
      LUA: false
    };
  }

  render() {
    return (
      <div className="projects">
        <h2>My projects</h2>
        <div className="filters">
          <div className="filter-by">Filter by:</div>
          <div className="filter-list">
            {Object.keys(this.state).map((key) => {
              return <Tag key={key} tagID={key} selected={this.state[key]} toggleTag={this.toggleTag} />;
            })}
          </div>
        </div>
        <div className="cards">
          {
            // TODO: More info pages about individual projects
            this.props.projects.map((project) => {
              return (
                <Card
                  key={project.title}
                  title={project.title}
                  description={project.description}
                  icon={project.icon}
                  github={project.github}
                  distributions={project.distributions}
                  link={project.link}
                  tags={project.tags}
                  // TODO: consider generating tags in this file to avoid this tomfoolery
                  allTagStates={this.state}
                  toggleTag={this.toggleTag}
                />
              );
            })
          }
        </div>
        {(()=>{return this.props.projects.length === 0 ? <div>Client failed to get project data from backend. I swear this doesn't usually happen.</div>: "";})()}
      </div>
    );
  }

  toggleTag = (tagID) => {
    this.setState({ [tagID]: !this.state[tagID] });
  };
}

export default Projects;
