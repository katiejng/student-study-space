import React, {Component} from "react";
import {connect} from "react-redux";
import {loadingUser, updateUser} from "../actions";
import {Button} from "semantic-ui-react";
import firebase from 'firebase'

class LogInButton extends Component {
  provider = new firebase.auth.GoogleAuthProvider();


  componentDidMount() {

  }

  render() {
    const {userState} = this.props;
    if (userState.loadingUser){
      return (
        <div>Loading...</div>
      )
    }
    if (!userState.user) {
      return (
          <Button onClick={this.signIn}>Log in or Sign Up</Button>
      )
    }
    else {
      return (
          <Button onClick={this.signOut}>Sign Out</Button>
      )
    }
  }


  signIn = () => {

    firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    firebase.auth().signInWithPopup(this.provider).then((result) => {
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      // var token = result.credential.accessToken;
      // The signed-in user info.
      var user = result.user;

      this.props.updateUser(user)
    }).catch(function (error) {
      console.log("Failed to sign in", error)

    });

  }

  signOut = () => {
    firebase.auth().signOut().then(() => {
      // Sign-out successful.
      this.props.updateUser(null)
    }).catch(function (error) {
      console.log("Failed to sign out", error)
    });
  }
}

function mapStateToProps(state) {
  return {userState: state.userState};
}

export default connect(mapStateToProps, {
  // any actions go in here
  updateUser,
  loadingUser,
})(LogInButton);