import React, { Component } from 'react';

class UserList extends Component{

	render() {
		console.log(this.props.children);
	  return (
	    <ul className="user-list">
	    	{this.props.children}
	    </ul>
	  );
  }
}

export default UserList;