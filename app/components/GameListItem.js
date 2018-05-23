import React, { Component } from 'react';
import {format} from 'date-fns'

class GameListItem extends Component{

	render() {
	  return (
      <li className={`game-list-item`}>
      	{this.props.game.toPlayer ? (
      	<div className="player">
	      	<img className="avatar" src={this.props.game.toPlayer.photo}/>
	      	<p><span className="name">{this.props.game.toPlayer.displayName}</span>
	      	<span className="fick"> fick </span>
	      	<span className="drink">{this.props.game.drink}</span></p>
      	</div>
      	) : (
      	<div className="player">
	      	<img className="avatar" src={this.props.game.fromPlayer.photo}/>
	      	<p className="name">{this.props.game.fromPlayer.displayName}</p>
	      	<span className="fick"> laddade upp en bild</span>
      	</div>
      	)}
      	<div className="date">
      	<p className="date"><img src="https://png.icons8.com/clock/win10/64" title="Clock" width="64" height="64" />{format(this.props.game.date, 'HH:SS')}</p>
      	</div>
	      <div className="img" style={{backgroundImage: `url(${this.props.game.image})`}}/>
      </li>
	  );
  }
}

export default GameListItem;