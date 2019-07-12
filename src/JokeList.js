import React, { Component } from 'react'
import axios from "axios";
import uuid from 'uuid/v4';
import chuck from './chuck.png';
import Joke from './Joke';
import "./JokeList.css";

class JokeList extends Component {
	static defaultProps = {
		numJokesToGet: 10
	};
	constructor(props) {
		super(props);
		this.state = {values: JSON.parse(window.localStorage.getItem("values") || "[]"),
		loading: false
		 };
		 this.seenJokes = new Set(this.state.values.map(v => v.text));
    	console.log(this.seenJokes);
    	this.handleClick = this.handleClick.bind(this);
	}
	componentDidMount(){
		if (this.state.values.length === 0) this.getJokes();
		
	}
	async getJokes() {
		try {
			let values = [];
			while(values.length < this.props.numJokesToGet){
			let res = await axios.get("https://api.chucknorris.io/jokes/random", {
			headers: { Accept: 'application/json'}
		});
			let newJoke = res.data.value;
			if (!this.seenJokes.has(newJoke)) {
				// Call in uuid as a function	
				values.push({id: uuid(), text: res.data.value, votes: 0});
			} else {
				console.log("Duplicate")
				console.log(newJoke);
			}
	}
		
		this.setState(
			st => ({
				loading: false,
				values: [...st.values, ...values]
			}),
			() =>
		window.localStorage.setItem( "values", JSON.stringify(this.state.values))
		);
		} catch (e) {
			alert(e);
			this.setState({ loading: false });
		}
		}

	// Instead of doing an upvote and downvote as two seperate methods,
	// let's make one method called handleVote that will take in an id of a vote
	handleVote(id, delta) {
		this.setState(
			st => ({
				values: st.values.map(v =>
					v.id === id ? {...v, votes: v.votes + delta} : v
					)
			}));
	}
	handleClick() {
    	this.setState({ loading: true }, this.getJokes);
  	}

	render () {
		let values = this.state.values.sort((a, b) => b.votes - a.votes);
		return (
				<div className='JokeList'>
				<div className='JokeList-sidebar'>
				<h1 className='JokeList-title'>Chuck Norris Jokes</h1>
				<img src={chuck} />
          <button className='JokeList-getmore' onClick={this.handleClick}>
            Fetch Jokes
          </button>
				</div>
				<div className='JokeList-jokes'>
				{this.state.values.map(v => (
					<Joke 
					key={v.id} 
					votes={v.votes} 
					text={v.text} 
					upvote={() => this.handleVote(v.id, 1)} 
					downvote={() => this.handleVote(v.id, -1)}
					/>

					))}
					</div>
				</div>
			)
	}
}

export default JokeList;