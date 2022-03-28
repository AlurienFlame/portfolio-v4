import React from "react";
import "./Card.css";
import Tag from "./Tag.jsx";

class Card extends React.Component {
  render() {
    // TODO: Cards with distributors should have a "website" button that brings up a popup listing distributors
    return (
      <div className={`card${this.shouldShowCard() ? "" : " display-none"}`}>
        <img src={"./images/" + this.props.icon} alt="card icon" />
        <h3>{this.props.title}</h3>
        <p>{this.props.description}</p>
        {this.getDownloadCount()}
        <div className="links">
          {this.props.github && (
            <button
              type="button"
              onClick={() => {
                window.open("https://github.com/AlurienFlame/" + this.props.github);
              }}
            >
              <svg class="logo">
                <path
                  fill-rule="evenodd"
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
              <svg class="logo" viewBox="0 0 460.114 460.114">
                <path d="M393.538 203.629L102.557 5.543a31.97 31.97 0 0 0-32.94-1.832 31.97 31.97 0 0 0-17.022 28.26v396.173a31.97 31.97 0 0 0 17.022 28.26c10.471 5.539 23.147 4.834 32.94-1.832l290.981-198.087a31.97 31.97 0 0 0 13.98-26.428c.001-10.58-5.233-20.475-13.98-26.428z" />
              </svg>
              <span>Demo</span>
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
    if (this.props.distributions.tml) {
      return (
        <p>
          Downloads: <b>{this.props.distributions.tml.downloads || "Loading..."}</b>
        </p>
      );
    }
    if (this.props.distributions.steam) {
      return (
        <p>
          Downloads: <b>{this.props.distributions.steam.downloads || "Loading..."}</b>
        </p>
      );
    }
    if (this.props.distributions.curseforge || this.props.distributions.modrinth) {
      return (
        <p>
          Downloads: <b>{this.props.distributions.curseforge.downloads + this.props.distributions.modrinth.downloads || "Loading..."}</b>
        </p>
      );
    }
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
