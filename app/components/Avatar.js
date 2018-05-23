import React, { Component } from 'react';

class Avatar extends Component{
	constructor(props) {
	  super(props);
	
	  this.state = {
	  	errored: false
	  };
	}
	_error(){
		this.setState({errored: true});
	}
	_initials(name){
		const initials = name.match(/\b\w/g) || [];
		return ((initials.shift() || '') + (initials.pop() || '')).toUpperCase();
	}
	render() {
	  return (
	    <div className="avatar">
	      {this.state.errored ? (
		      <p className="avatar__initials">
		       {this._initials(this.props.name)}
		      </p>
	      ) : (
					<img onError={() => this._error()} src={this.props.image} className="avatar__img"/>
	    	)}
	    </div>
	  );
  }
}

export default Avatar;