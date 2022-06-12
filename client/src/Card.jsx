import React from "react";
import "./Card.css";
import Tag from "./Tag.jsx";

class Card extends React.Component {
  render() {
    return (
      <div className={`card${this.shouldShowCard() ? "" : " display-none"}`}>
        <img src={"./images/" + this.props.icon} alt="card icon" />
        <h3>{this.props.title}</h3>
        <p className="description">{this.props.description}</p>
        {this.getDownloadCount()}
        <div className="links">
          {this.props.github && (
            <button
              type="button"
              onClick={() => {
                window.open("https://github.com/AlurienFlame/" + this.props.github);
              }}
            >
              <svg className="logo">
                <path
                  fillRule="evenodd"
                  d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z"
                />
              </svg>
              <span>Source</span>
            </button>
          )}
          {this.props.link && (
            <button
              type="button"
              onClick={() => {
                window.open(this.props.link);
              }}
            >
              <svg className="logo" viewBox="0 0 460.114 460.114">
                <path d="M393.538 203.629L102.557 5.543a31.97 31.97 0 0 0-32.94-1.832 31.97 31.97 0 0 0-17.022 28.26v396.173a31.97 31.97 0 0 0 17.022 28.26c10.471 5.539 23.147 4.834 32.94-1.832l290.981-198.087a31.97 31.97 0 0 0 13.98-26.428c.001-10.58-5.233-20.475-13.98-26.428z" />
              </svg>
              <span>Demo</span>
            </button>
          )}
          {this.props.distributions && (
            <button
              type="button"
              onClick={() => {
                // TODO: Show more info page that explains distributions and contains more detailed description
                window.open(this.props.distributions[Object.keys(this.props.distributions)[0]].link);
              }}
            >
              <svg className="logo" viewBox="0 0 460 460">
                <path d="M230 0C102.975 0 0 102.975 0 230s102.975 230 230 230 230-102.974 230-230S357.025 0 230 0zm38.333 377.36c0 8.676-7.034 15.71-15.71 15.71h-43.101c-8.676 0-15.71-7.034-15.71-15.71V202.477c0-8.676 7.033-15.71 15.71-15.71h43.101c8.676 0 15.71 7.033 15.71 15.71V377.36zM230 157c-21.539 0-39-17.461-39-39s17.461-39 39-39 39 17.461 39 39-17.461 39-39 39z" />
              </svg>
              <span>More Info</span>
            </button>
          )}
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
    // TODO: Make it so a card must have all selected tags instead of at least one
    for (let tag of this.props.tags) {
      if (this.props.allTagStates[tag]) {
        // At least one tag on this card is selected
        return true;
      }
    }
  }

  getDownloadCount() {
    if (!this.props.distributions) return;
    // TODO: Hide if there's an error fetching data.
    let totalDownloads = 0;
    if (this.props.distributions.tml) {
      totalDownloads += this.props.distributions.tml.downloads;
    }
    if (this.props.distributions.steam) {
      totalDownloads += this.props.distributions.steam.downloads;
    }
    if (this.props.distributions.curseforge) {
      totalDownloads += this.props.distributions.curseforge.downloads;
    }
    if (this.props.distributions.modrinth) {
      totalDownloads += this.props.distributions.modrinth.downloads;
    }
    // TODO: Maybe see about tracking downloads from github releases?
    return <p className="downloads">Downloads: <b>{totalDownloads || "Loading..."}</b></p>;
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
