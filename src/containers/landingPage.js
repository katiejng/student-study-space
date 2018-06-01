import React, {Component} from "react";
import {connect} from "react-redux";
import {updateUser} from "../actions";
import {Header} from "semantic-ui-react";
import map_fb from '../assets/imgs/map_fb.png'
import {Container} from 'semantic-ui-react'
import LogInButton from "./LogInButton";
import {Redirect} from "react-router-dom";
import firebase from 'firebase';

class LandingPage extends Component {
  constructor(props){
    super(props);
    this.state = {
      shouldRedirect: false,
    }
  }

  componentDidMount() {
    var unsubscribe = firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // console.log("logged in", user.uid)
        unsubscribe();
        this.setState({shouldRedirect:true})
      }
    }.bind(this));
  }

  render() {
    const {userState} = this.props;
    if (this.state.shouldRedirect){
      return (<Redirect to={'/'} />);
    }
    return (
      <Container style={{display: 'flex', flexWrap: 'wrap', paddingTop: '20px'}}>
        <div style={{flex: 2, padding: 20, minWidth: 550}}>
          <Header as={"h1"}>Welcome to Student Study Space</Header>
          <Header as={"h3"}>Student Study Space helps you connect and share with the people in your units.
          </Header>
          <img src={map_fb} alt={"map"}/>

        </div>
        <div style={{flex: 1, alignSelf: 'center', padding: 20, minWidth: 200}}>

          <Header as={"h2"}>{userState.user ? "Welcome " + userState.user.displayName : "Sign in to get started"}</Header>
          <Header as={"h3"}>It's free and always will be.</Header>
          <LogInButton/>
        </div>
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {userState: state.userState};
}

export default connect(mapStateToProps, {
  // any actions go in here
  updateUser,
})(LandingPage);
