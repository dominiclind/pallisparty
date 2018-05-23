import React, { Component } from 'react';

import Avatar from './Avatar';

class UserListItem extends Component{

	render() {
	  return (
      <li className={`user-list-item ${this.props.me ? 'is-me' : ''}`}>
      	{this.props.selector ? (
      		<p className="selector">😎</p>
      	): null}

        <Avatar name={this.props.name} image={this.props.avatar}/>
      	<p className="name">{this.props.name}</p>
      	<ul className="games">{this.props.games.map((game, index) => <li key={index} className="indicator"></li>)}</ul>
      </li>
	  );
  }
}

export default UserListItem;