import React, {Component} from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';

import Toolbar from "./components/toolbar";
import Chat from "./containers/chat";
import HomePage from "./containers/homePage.js";
import LandingPage from "./containers/landingPage"
import {connect} from "react-redux";
import {loadingUser, updateUser} from "./actions";
import UnitContainer from "./containers/unitContainer";

class App extends Component {

  componentDidMount() {
    this.props.loadingUser();
    this.props.auth().onAuthStateChanged((user) => {
      this.props.updateUser(user);
    });
  }

  render() {
    return (
      <div className="App">
        <Router>
          <div>
            <Route path='/' render={() => (
              <Toolbar/>
            )}/>

            <Route path='/unit/:id' render={({match}) => (
              <div>
                <UnitContainer match={match} database={this.props.database.ref("spaces/"+match.params.id)}/>
              </div>
            )}/>

            <Route exact path='/' render={() => (
              <div>
                <HomePage/>
              </div>
            )}/>

            <Route path='/example' render={() => (
              <div>"example"</div>
            )}/>
            <Route path='/landing' render={() => (
              <LandingPage/>
            )}/>
            <Route path='/resources' render={() => (
              <LandingPage/>
            )}/>
            <Route path="/chat" render={() => (

              <Chat chatRef={this.props.database.ref("spaces/testSpace1/chat")}/>
            )}/>
          </div>
        </Router>
      </div>
    );
  }

}

function mapStateToProps(state) {
  return {userState: state.userState};
}

export default connect(mapStateToProps, {
  // any actions go in here
  updateUser,
  loadingUser,
})(App);
