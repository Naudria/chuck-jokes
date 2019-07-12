import React, { Component } from 'react'
import "./Joke.css";

// Joke component is stateless. It's just going to call on the icons
// an event handler that is passed down from the parent

class Joke extends Component {
	render() {
		return (
			<div className="Joke">
			<div className="Joke-buttons">
			<i className="fas fa-arrow-up" onClick={this.props.upvote} />
			<span>{this.props.votes}</span>
			<i className="fas fa-arrow-down" onClick={this.props.downvote} />

			</div>
			<div className="Joke-text">
			{this.props.text}
			</div>
			</div>
			)
	}
}

export default Joke;