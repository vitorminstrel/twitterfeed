import React, { Component } from 'react';
import './Layout.scss';
import { Jumbotron, Container } from 'react-bootstrap';

class Layout extends Component {
  render() {
    return(
      <div className="tweet-feeder-layout">
        <Jumbotron fluid={true} className="banner">
          <h1>Twitter Feed Searcher</h1>
        </Jumbotron>
        <Container>
          {this.props.children}
        </Container>
        <Jumbotron className="footer">
          <span>Developed by: Vitor Ribeiro Carvalho</span>
          <span>Powered by: AnyMindGroup</span>
        </Jumbotron>
      </div>
    );
  }
}

export { Layout }
