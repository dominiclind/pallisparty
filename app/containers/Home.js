import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';

import FileInput from 'react-file-input';

import {listen, createGame, completeGame, saveImage} from '../actions/data';

import { logout } from '../actions/auth';

import Button from '../components/Button';
import UserList from '../components/UserList';
import UserListItem from '../components/UserListItem';


import GameList from '../components/GameList';
import GameListItem from '../components/GameListItem';

import GameModal from '../components/GameModal';
import SpontanModal from '../components/SpontanModal';


class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      view: 'folk' // || 'spel'
    };
  }

  componentDidMount() {
    this.props.dispatch(listen());
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
      //console.log('save image');
      this.props.dispatch(saveImage(result));
    }, err => {
      console.log(err)
    })
  }

  render() {
    const { data, auth } = this.props;
    const { user } = auth;
    const { users, games, game, selector } = data;

    const me = user;
    console.log('ME: ', user);

    // const me = users.filter(u => u.id == user.id)[0] || {};

    if(user) {
    return (
      <div className="home-container">
  {/*}      
        <Button class="special">+<FileInput
           name="asdasd"
           accept=".png,.gif"
           placeholder="spontan knapp"
           className="spontan-knapp"
           onChange={(e) => this.handleChange(e)}
         /></Button>
     */}   

       {(!game && user.id == selector) || user.displayName.indexOf('Dominic') > -1 ? (
          <div className="decide-button">
            <Button onClick={() => this.props.dispatch(createGame())}>Snurra drink snurran!</Button>
          </div>
        ): null}

        <div className="align-center">
          <div className="pill-toggles">
            <Button inverted={this.state.view == 'folk'} onClick={() => this.setState({view: 'spel'})}>Vad har hänt?</Button>
            <Button inverted={this.state.view == 'spel'} onClick={() => this.setState({view: 'folk'})}>Folk</Button>
          </div>
        </div>

        {this.state.view == 'folk' ? (
          <UserList>
            {users.map(user => (
              <UserListItem
                key={user.id} 
                name={user.displayName}
                avatar={user.photo}
                me={me.id == user.id}
                selector={user.id == selector}
                games={user.games || []}
              />
              ))}
          </UserList>
          ): null}

        {this.state.view == 'spel' ? (
          <GameList>
            {games.map(game => (
              <GameListItem
                key={game.id}
                game={game}
              />
            ))}
          </GameList>
        ) : null}

        {game ? (
          <GameModal
            loading={data.loading}
            game={game}
            me={me.id}
            didGame={(image) => this.props.dispatch(completeGame(image))}
          />
        ) : null}
                <div className="align-center top-buttons">
          <Button inverted onClick={() => this.props.dispatch(logout())}>🏃💨 Leave</Button>
        </div>
      </div>
    );
  } else { return <div/>}
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    data: state.data
  };
}

export default connect(mapStateToProps)(Home);
