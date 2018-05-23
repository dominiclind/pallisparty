import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router';
import Helmet from 'react-helmet';

import { login, logout, checkLogin } from '../actions/auth';


class App extends Component {
  componentDidMount() {
    this.props.dispatch(checkLogin());
  }

  render() {
    const { rehydrate, auth } = this.props;
    return (
      <div className="wrapper">
        <Helmet
          title='River universal react'
          titleTemplate='river-react'
          meta={[
            {'char-set': 'utf-8'},
            {'name': 'description', 'content': 'A react template made by river'},
            {'name': 'viewport', 'content': 'width=device-width, initial-scale=1.0, maximum-scale=1.0, target-densityDpi=device-dpi, user-scalable=no, shrink-to-fit=no'},
            {'name': 'apple-mobile-web-app-capable', 'content': 'yes'},
            {'name': 'apple-mobile-web-app-status-bar-style', 'content': 'black'},
            {'name': 'apple-mobile-web-app-title', 'content': 'river-react'},
            {'name': 'theme-color', 'content': '#ffffff'},
            {'property': 'fb:app_id', 'content': 'fb:app_id' },
            {'property': 'og:image', 'content': 'og:image' },
            {'property': 'og:url', 'content': 'og:url' },
            {'property': 'og:title', 'content': 'og:title' },
            {'property': 'og:type', 'content': 'game' },
            {'property': 'og:description', 'content': 'og:description' },
            {'http-equiv': 'cache-control', 'content': 'max-age=0'},
            {'http-equiv': 'cache-control', 'content': 'no-cache'},
            {'http-equiv': 'expires', 'content': '0'},
            {'http-equiv': 'expires', 'content': 'Tue, 01 Jan 1980 1:00:00 GMT'},
            {'http-equiv': 'pragma', 'content': 'no-cache'},
          ]}
          link={[
            {rel: "apple-touch-icon", href: "/assets/icons/apple-touch-icon.png"},
            {rel: "apple-touch-icon", sizes: "144x144", href: "/assets/icons/apple-touch-icon-144x144.png"},
            {rel: "icon", type: "image/png", href: "/assets/icons/favicon-32x32.png", sizes:"32x32"},
            {rel: "icon", type: "image/png", href: "/assets/icons/favicon-16x16.png", sizes:"16x16"},
          ]}
        />
        {auth.loading ? (
          <p>laddar</p>
        ) : this.props.children}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
  };
}

export default connect(mapStateToProps)(App);
