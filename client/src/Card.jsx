import React from "react";
import "./Card.css";
import Tag from "./Tag.jsx";

class Card extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className={`card${this.shouldShowCard() ? "" : " display-none"}`}>
        <img src={"./images/" + this.props.icon} alt="card icon" />
        <h3>{this.props.title}</h3>
        <p>{this.props.description}</p>
        {this.getDownloadCount()}
        <div className="links">
          {this.getLink()}
          {this.getGitHubLink()}
        </div>
        {this.getTags()}
      </div>
    );
  }

  shouldShowCard() {
    if (Object.values(this.props.allTagStates).every((i) => i === Object.values(this.props.allTagStates)[0])) {
      // All tags are equal, so we shouldn't be filtering
      return true;
    }
    for (let tag of this.props.tags) {
      if (this.props.allTagStates[tag]) {
        // At least one tag on this card is selected
        return true;
      }
    }
  }

  getDownloadCount() {
    if (!this.props.distributions) return;
    if (this.props.distributions.tml) {
      return (
        <p>
          Downloads ({this.linkIfExists(this.props.distributions.tml.link, "TModLoader")}): <b>{this.props.distributions.tml.downloads || "Loading..."}</b>
        </p>
      );
    }
    if (this.props.distributions.steam) {
      return (
        <p>
          Downloads ({this.linkIfExists(this.props.distributions.steam.link, "Steam")}): <b>{this.props.distributions.steam.downloads || "Loading..."}</b>
        </p>
      );
    }
    if (this.props.distributions.curseforge || this.props.distributions.modrinth) {
      return (
        <p>
          Downloads ({this.linkIfExists(this.props.distributions.curseforge.link, "Curse")},{" "}
          {this.linkIfExists(this.props.distributions.modrinth.link, "Modrinth")}):{" "}
          <b>{this.props.distributions.curseforge.downloads + this.props.distributions.modrinth.downloads || "Loading..."}</b>
        </p>
      );
    }
  }

  linkIfExists(link, text) {
    return link ? <a href={link}>{text}</a> : text;
  }

  getLink() {
    return this.props.link && <a href={this.props.link}>Webpage</a>;
  }

  getGitHubLink() {
    return this.props.github && <a href={"https://github.com/AlurienFlame/" + this.props.github}>GitHub</a>;
  }

  getTags() {
    return (
      <div className="tags">
        {this.props.tags &&
          this.props.tags.map((tagID) => {
            return <Tag key={tagID} tagID={tagID} selected={this.props.allTagStates[tagID]} toggleTag={this.props.toggleTag} />;
          })}
      </div>
    );
  }
}

export default Card;
