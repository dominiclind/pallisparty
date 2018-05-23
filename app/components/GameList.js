import React, { Component } from 'react';

class GameList extends Component{

	render() {
	  return (
	    <ul className="game-list">
	    	{this.props.children}
	    </ul>
	  );
  }
}

export default GameList;