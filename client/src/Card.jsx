import React from "react";
import "./Card.css";
import Tag from "./Tag.jsx";

class Card extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            downloadsSteam: "loading...",
            downloadsCurse: "loading...",
            downloadsModrinth: "loading...",
            downloadsTML: "loading..."
        };
    }

    componentDidMount() {
        // Fetch download count then update state
        if (this.props.idSteam) {
            // Steam API doesn't allow requests from clients so we need to make the server do it
            fetch(`../../../api/steam.php?id=${this.props.idSteam}`)
                .then((response) => response.json())
                .then((data) => {
                    this.setState({ downloadsSteam: data.lifetime_subscriptions });
                })
                .catch((error) => {
                    this.setState({ downloadsSteam: error.toString() });
                });
        }

        if (this.props.idCurse && this.props.idModrinth) {
            fetch(`https://api.cfwidget.com/minecraft/mods/${this.props.idCurse}`)
                .then((response) => response.json())
                .then((data) => {
                    this.setState({ downloadsCurse: data.downloads.total });
                })
                .catch((error) => {
                    this.setState({ downloadsCurse: error.toString() });
                });
            fetch(`https://api.modrinth.com/api/v1/mod/${this.props.idModrinth}`)
                .then((response) => response.json())
                .then((data) => {
                    this.setState({ downloadsModrinth: data.downloads });
                })
                .catch((error) => {
                    this.setState({ downloadsModrinth: error.toString() });
                });
        }

        if (this.props.idTML) {
            fetch(`../../../api/tml.php?id=${this.props.idTML}`)
                .then((response) => response.json())
                .then((data) => {
                    this.setState({ downloadsTML: data.downloads });
                })
                .catch((error) => {
                    this.setState({ downloadsTML: error.toString() });
                });
        }
    }

    render() {
        return (
            <div className={`card${this.shouldShowCard() ? "" : " display-none"}`}>
                <img src={this.props.icon} alt="card icon" />
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
        if (Object.values(this.props.allTagStates).every(i => i === Object.values(this.props.allTagStates)[0])) {
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
        if (this.props.idTML) {
            return (
                <p>
                    Downloads ({this.linkIfExists(this.props.linkTML, "TModLoader")}): <b>{this.state.downloadsTML}</b>
                </p>
            );
        }
        if (this.props.idSteam) {
            return (
                <p>
                    Downloads ({this.linkIfExists(this.props.linkSteam, "Steam")}): <b>{this.state.downloadsSteam}</b>
                </p>
            );
        }
        if (this.props.idCurse && this.props.idModrinth) {
            return (
                <p>
                    Downloads ({this.linkIfExists(this.props.linkCurse, "Curse")}, {this.linkIfExists(this.props.linkModrinth, "Modrinth")}):{" "}
                    <b>{this.state.downloadsCurse + this.state.downloadsModrinth}</b>
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
        return this.props.github && <a href={this.props.github}>GitHub</a>;
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
