import React, { Component } from 'react';

class Root extends Component {

  renderInitialState() {
    if (this.props.initialState) {
      const innerHtml = `window.__INITIAL_STATE__ = ${JSON.stringify(this.props.initialState)}`;
      return <script dangerouslySetInnerHTML={{__html: innerHtml}} />;
    }
  }

  renderEnvironment() {
    const innerHtml = `window.__ENVIRONMENT__ = '${__ENVIRONMENT__}'`;
    return <script dangerouslySetInnerHTML={{__html: innerHtml}} />
  }

  renderCSS() {
    if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'develop') {
      return <link rel="stylesheet" href="/main.min.css" />
    }
  }

  renderFont() {
    return <link href="https://fonts.googleapis.com/css?family=Sansita+One" rel="stylesheet" />
  }

  renderFB() {
    return null;
  }

  render() {
    const head = this.props.head;

    return (
      <html>
        <head>
          {head.title.toComponent()}
          {head.meta.toComponent()}
          {head.link.toComponent()}
          {this.renderFont()}
          {this.renderCSS()}
        </head>
        <body>
          <div id='root' dangerouslySetInnerHTML={{__html: this.props.content}} />
          {this.renderEnvironment()}
          {this.renderInitialState()}
          {head.script.toComponent()}
          <img class="preview"/>
          <script type="text/javascript" src="https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.8&appId=993358400770455"></script>
          <script src={!process.env.NODE_ENV ? '/app.js' : '/app.min.js'}></script>
        </body>
      </html>
    );
  }
}

export default Root;
