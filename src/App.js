import React, { Component } from 'react';
import { Route, Switch, BrowserRouter as Router, Redirect } from 'react-router-dom';
import { Layout } from './Layout';
import { TweetsByHashtagsPage } from './components/TweetsByHashtagsPage/TweetsByHashtagsPage';
import { TweetsByUsersPage } from './components/TweetsByUsersPage/TweetsByUsersPage';
import history from './history';

class App extends Component {
  render() {
    return (
      <Layout>
        <Router history={history}>
          <Switch>
            <Route path="/hashtags" exact component={TweetsByHashtagsPage} />
            <Route path="/users" exact component={TweetsByUsersPage} />
            <Redirect from="/" to="/hashtags" />
          </Switch>
        </Router>
      </Layout>
    );
  }
}
export default App;
