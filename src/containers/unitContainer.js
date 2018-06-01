import React, {Component} from "react";
import {connect} from "react-redux";
import UnitTabs from "../components/unitTabs";
import { Route } from 'react-router-dom';
// import homePage from "./homePage";
import Chat from "./chat";

import {Container} from "semantic-ui-react";
import QuizSearch from "./quizzesContainer";
import ReviewsPage from './reviewsPage'
import TimetablePage from './timetablePage'
import StudyNotesPage from './studyNotesPage'
import ResourcesPage from './resourcesPage'
import { addUnitSpace, fetchUnitSpaces, removeUnitSpace } from "../actions";
import firebase from 'firebase';
import DashboardPage from './dashboardPage'

class UnitContainer extends Component {


  constructor(props){
    super(props);
    this.state = {
      check: false,
    }
    this.userdb = firebase.database();
  }

  joinSpace(){
    let user = firebase.auth().currentUser;
    if (user) {
      // User is signed in.
      let userRef = this.userdb.ref('users/' + user.uid);
      const spacesDetails = {
        spaceId: this.state.path,
      }
      this.props.addUnitSpace(userRef, spacesDetails);
    } else {
      // No user is signed in.
    }
  }

  componentWillReceiveProps(props) {
    // console.log('props.match: ', props.match);
    const path = props.match.params.id;
    // console.log('path: ', path);
    let added;
    try {
      added = props.homeState.spaceId.find(function(item){
        return item.spaceId === path;
      });
    } catch (e) {
      // console.log("go back to home")
    }
    // console.log('added? ', added);
    added ? this.setState({check:false, path: path}) : this.setState({check:true, path: path});
  }

  render() {
    // console.log(this.props.homeState.spaceId);
    const {match} = this.props;
    // console.log("MATCH", match)
    // get unit from database
    return (
      <div>
        <UnitTabs match={match}/>
        <Container>
          {/*<Modal size="tiny" open={this.state.check}>*/}
            {/*<Modal.Header>*/}
              {/*Join this space to see its contents.*/}
            {/*</Modal.Header>*/}
            {/*<Modal.Actions>*/}
              {/*<Button negative*/}
              {/*as={Link}*/}
              {/*to={'/'}>*/}
                {/*Back*/}
              {/*</Button>*/}
              {/*<Button onClick={() => this.joinSpace()} positive icon='checkmark' labelPosition='right' content='Join' />*/}
            {/*</Modal.Actions>*/}
          {/*</Modal>*/}
          <Route exact path={match.path} component={DashboardPage}/>
          <Route exact path={match.path + '/home'} component={DashboardPage}/>

          <Route exact path={match.path + '/chat'} render={() => (
            <Chat chatRef={this.props.database.child("chat")}/>
          )}/>

          <Route exact path={match.path + '/quizzes'} render={() => (
            <QuizSearch quizzesRef={this.props.database.child("quizzes")}/>
          )}/>


          <Route exact path={match.path+'/resources'} component={ResourcesPage}/>
          <Route exact path={match.path+'/studyNotes'} component={StudyNotesPage}/>
          <Route exact path={match.path+'/timetable'} component={TimetablePage}/>

          <Route exact path={match.path+'/reviews'} render={() => (
            <ReviewsPage reviewRef={this.props.database.child("review")}/>
          )}/>
        </Container>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    example: state.example,
    homeState: state.homeState,
  };
}

export default connect(mapStateToProps, {
  addUnitSpace,
  fetchUnitSpaces,
  removeUnitSpace,
})(UnitContainer);
