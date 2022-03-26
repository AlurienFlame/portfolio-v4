import React from "react";
import "./Tag.css";

class Tag extends React.Component {
    render() {
        return (
            <div onClick={() => this.props.toggleTag(this.props.tagID)} className={`tag${this.props.selected ? " selected" : ""}`}>
                {this.props.tagID}
            </div>
        );
    }
}

export default Tag;
