import React from "react";
import "./Bio.css";

class Bio extends React.Component {
  render() {
    return (
      <div className="bio">
        <h1>Lucien Lasseau</h1>
        <p>I'm an aspiring software developer studying at Stanford University. I love using code to bring ideas to life.</p>
        <p>
          My published projects have <b className="highlighted">{this.sumDownloads().toLocaleString('en-US')}</b> downloads between them.
        </p>
        <a href="https://github.com/AlurienFlame">GitHub</a>
      </div>
    );
  }

  sumDownloads() {
    let total = 0;
    for (let project of this.props.projects) {
      if (!project.distributions) continue;
      for (let distribution in project.distributions) {
        total += project.distributions[distribution].downloads || 0;
      }
    }
    return total;
  }
}

export default Bio;
