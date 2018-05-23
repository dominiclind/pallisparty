import React, { Component } from 'react';

class Input extends Component{

	render() {
	  return (
			<div className="field">
			  <label className="label">Name</label>
			  <p className="control">
			    <input className="input" type="text" placeholder="Text input" />
			  </p>
			</div>
	  );
  }
}

export default Input;