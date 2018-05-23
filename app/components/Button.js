import React, { Component } from 'react';

class Button extends Component{

	render() {
		const disabled = this.props.disabled ? true : false;
		const primary = this.props.primary ? 'is-primary' : ''; 
		const loading = this.props.loading ? 'is-loading' : ''; 
		const inverted = this.props.inverted ? 'inverted' : ''; 

	  return (
	    <a
	    	className={`button ${this.props.class || '' } ${disabled} ${primary} ${loading} ${inverted}`}
	    	onClick={this.props.onClick}
	    	disabled={disabled}
	    >
	      {this.props.children}
	    </a>
	  );
  }
}

export default Button;