import React, { Component } from 'react';
import collect from 'collect.js';

import Button from './Button';
import FileInput from 'react-file-input';
import Avatar from './Avatar';

import base64Img from 'base64-img';

const COMPLETIONS = [
	'YABBADABBADOO',
	'I dids it!',
	'Fäärdig',
];

class GameModal extends Component{

	constructor(props) {
	  super(props);
	
	  this.state = {
	  	text: collect(COMPLETIONS).random()
	  };
	}

	handleChange(event) {
    var file = event.target.files[0];

		const promise = new Promise((resolve, reject) => {
		  const reader = new FileReader()

		  reader.readAsDataURL(file)

		  reader.onload = () => {
		    if (!!reader.result) {
		      resolve(reader.result)
		    }
		    else {
		      reject(Error("Failed converting to base64"))
		    }
		  }

		})
		promise.then(result => {
		  // dispatch or do whatever you need with result
		  this.setState({ image: result, raw: file });
		}, err => {
		  console.log(err)
		})


  }

	render() {
		const { game, me, loading } = this.props;
		const { fromPlayer, toPlayer, drink } = game;
		const isMine = toPlayer.id == me;
		//const isMine = true;

		if(loading){
			return (
				<div className="game-modal">
					<h2>laddar</h2>
				</div>
			)
		}else {
	 	  return (
		    <div className={`game-modal ${isMine ? 'me' : ''}`}>
		    	{this.state.state !== 'prove-it' ? (
		    	<div className="center">
			    	<div className="players">
				    	<div className={`player ${fromPlayer.id == me ? 'me' : ''}`}>
				   			<Avatar image={fromPlayer.photo} name={fromPlayer.displayName} />
				   			{/*<p>{fromPlayer.displayName}</p>*/}
				   		</div>
				   		
				   		<p className="gives">ger</p>
				    	
				    	<div className={`player ${isMine ? 'me' : ''}`}>
				   			<Avatar image={toPlayer.photo} name={toPlayer.displayName} />
				   			{/*<p>{toPlayer.displayName}</p>*/}
				   		</div>
			   		</div>

			   		<h1 className="drink">{drink}</h1>
		   				{isMine ? (
								<Button inverted onClick={() => this.setState({state:'prove-it'})}>prove it!</Button>
				   		): null}
			   		</div>
			   		): (
			   			<div className="center">
			   				{this.state.image ? (
			   					<div className="cover">
									  <img src={this.state.image} className="cover" />
									</div>
			   					) : null}
				   			<FileInput
									 name="myImage"
					         accept=".png,.gif"
					         placeholder="Välj bild"
					         className="button"
					         onChange={(e) => this.handleChange(e)}
				         />
				         {this.state.image ? (
				         	<Button inverted onClick={() => this.props.didGame(this.state.image)}>{this.state.text}</Button>
			   					): null}
			   			</div>
			   		)}
		    </div>
		  );
	  }
  }
}

export default GameModal;