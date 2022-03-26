import React from "react";
import "./Projects.css";
import Card from "./Card.jsx";
import Tag from "./Tag.jsx";
import balancedrecall from "./images/balancedrecall.png";
import chatsounds from "./images/chatsounds.png";
import diseasewarning from "./images/diseasewarning.png";
import fireman from "./images/fireman.png";
import honeycomb from "./images/honeycomb.png";
import sovietmenumusic from "./images/sovietmenumusic.png";
import starflower from "./images/starflower.png";
import torchkey from "./images/torchkey.png";

class Projects extends React.Component {
    // TODO: State - filters toggled
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
                <h3>My projects</h3>
                <div className="filters">
                    <div className="filter-by">Filter by:</div>
                    <div className="filter-list">
                        {Object.keys(this.state).map((key) => {
                            return <Tag key={key} tagID={key} selected={this.state[key]} toggleTag={this.toggleTag} />;
                        })}
                    </div>
                </div>
                <div className="cards">
                    {/* TODO: More info pages about individual projects */}
                    <Card
                        title="Starflower"
                        description="A Terraria mod that adds an herb and a few potions."
                        icon={starflower}
                        github="https://github.com/AlurienFlame/Starflower"
                        idTML="Starflower"
                        linkTML="https://mirror.sgkoi.dev/Mods/Details/Starflower"
                        tags={["C#"]}
                        allTagStates={this.state}
                        toggleTag={this.toggleTag}
                    />
                    <Card
                        title="Chat Sounds"
                        description="A Minecraft mod that adds sound effects to the chat."
                        icon={chatsounds}
                        github="https://github.com/AlurienFlame/Chatsounds"
                        idCurse="459715-chat-sounds"
                        linkCurse="https://www.curseforge.com/minecraft/mc-mods/chat-sounds"
                        idModrinth="chatsounds"
                        linkModrinth="https://modrinth.com/mod/chatsounds"
                        tags={["Java"]}
                        allTagStates={this.state}
                        toggleTag={this.toggleTag}
                    />
                    <Card
                        title="Honeycomb"
                        description="An interactive demonstration of the A* pathfinding algorithm applied to a hexagonal grid system."
                        icon={honeycomb}
                        github="https://github.com/AlurienFlame/Honeycomb"
                        link="https://alurienflame-honeycomb.glitch.me/"
                        tags={["JavaScript"]}
                        allTagStates={this.state}
                        toggleTag={this.toggleTag}
                    />
                    <Card
                        title="Soviet Menu Music"
                        description="A Don't Starve Together mod that replaces the menu music with the Soviet anthem."
                        icon={sovietmenumusic}
                        idSteam="1708499402"
                        linkSteam="https://steamcommunity.com/sharedfiles/filedetails/?id=1708499402"
                        tags={["LUA"]}
                        allTagStates={this.state}
                        toggleTag={this.toggleTag}
                    />
                    <Card
                        title="Torchkey"
                        description="A Minecraft mod that adds a hotkey for placing torches."
                        icon={torchkey}
                        github="https://github.com/AlurienFlame/Torchkey"
                        idCurse="392380-torchkey"
                        linkCurse="https://www.curseforge.com/minecraft/mc-mods/torchkey"
                        idModrinth="torchkey"
                        linkModrinth="https://modrinth.com/mod/torchkey"
                        tags={["Java"]}
                        allTagStates={this.state}
                        toggleTag={this.toggleTag}
                    />
                    <Card
                        title="Balanced Recall"
                        description="A Minecraft mod that adds a couple handy items."
                        icon={balancedrecall}
                        github="https://github.com/AlurienFlame/Balanced-Recall"
                        idCurse="520624-balanced-recall"
                        linkCurse="https://www.curseforge.com/minecraft/mc-mods/balanced-recall"
                        idModrinth="balancedrecall"
                        linkModrinth="https://modrinth.com/mod/balancedrecall"
                        tags={["Java"]}
                        allTagStates={this.state}
                        toggleTag={this.toggleTag}
                    />
                    <Card
                        title="Fireman"
                        description="A Minecraft mod that adds a hotkey for putting out fires."
                        icon={fireman}
                        github="https://github.com/AlurienFlame/Fireman"
                        idCurse="518097-fireman"
                        linkCurse="https://www.curseforge.com/minecraft/mc-mods/fireman"
                        idModrinth="fireman"
                        linkModrinth="https://modrinth.com/mod/fireman"
                        tags={["Java"]}
                        allTagStates={this.state}
                        toggleTag={this.toggleTag}
                    />
                    <Card
                        title="Disease Warning"
                        description="A Don't Starve Together mod that adds an alert sound for disease."
                        icon={diseasewarning}
                        idSteam="1848223570"
                        linkSteam="https://steamcommunity.com/sharedfiles/filedetails/?id=1848223570"
                        tags={["LUA"]}
                        allTagStates={this.state}
                        toggleTag={this.toggleTag}
                    />
                </div>
            </div>
        );
    }

    toggleTag = (tagID) => {
        this.setState({ [tagID]: !this.state[tagID] });
    };
}

export default Projects;
