import React, { Component } from "react";
import { connect } from "react-redux";
import { HomePageStyles } from './homePage.style';
import firebase from 'firebase';
import { addUnitSpace, fetchUnitSpaces, removeUnitSpace } from "../actions";

import {
  Container, Grid, Card, Button, Divider, Segment, Header,
  Dropdown, Dimmer, Loader, Image, Icon
} from 'semantic-ui-react'
import {Link, Redirect} from "react-router-dom";

class HomePage extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading: true,
      spaceGrid: [],
      dropDown: [{ key: 'Monash University', text: 'Monash University', value: 'Monash University' }],
      updateButton: false,
      shouldRedirect: false,
    }
    this.userdb = firebase.database();
  }

  renderUnitGrid(userRef){
    let spacesCard = [];
    firebase.database().ref('spaces').once('value').then(function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
        const path = childSnapshot.key;
        const unit = childSnapshot.val();
        const spacesDetails = {
          spaceId: path,
          id: unit.id,
        }


        const added = this.props.homeState.spaceId.find(function(item){
          return item.spaceId === path;
        });
        let icon;
        added ? icon = 'checkmark': icon='plus';
        spacesCard.push(

          <Card key={unit.id + unit.institution}>
            <Image
            as={Link}
            to={'/unit/'+path}
            src={unit.imageUrl}
            />
            <Card.Content
            as={Link}
            to={'/unit/'+path}>
              <Card.Header>{unit.id} - {unit.name}</Card.Header>
              <Card.Meta>{unit.institution}</Card.Meta>
              <Card.Description>{unit.description}</Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Icon name='user' />
              {Math.ceil(Math.random() * 85) + 50} students enrolled
              <Button icon={icon} floated="right" onClick={() => {
                // console.log("is added",added);
                added ?
                this.props.removeUnitSpace(userRef, spacesDetails) :
                this.props.addUnitSpace(userRef, spacesDetails);
                this.setState({updateButton: true, shouldRedirect: false});
              }}/>
            </Card.Content>
          </Card>
        )
      }.bind(this));

      const spaceGrid = (
        <Card.Group itemsPerRow={3}>
          {spacesCard}
        </Card.Group>
      );

      this.setState({spaceGrid: spaceGrid, loading: false})
    }.bind(this));
  }

  componentDidMount(){
    var unsubscribe = firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        // console.log("logged in", user.uid)
        let userRef = this.userdb.ref('users/' + user.uid);
        this.props.fetchUnitSpaces(userRef);
        this.renderUnitGrid(userRef);
      } else {
        // console.log("logged out")
        unsubscribe();
        this.setState({shouldRedirect:true})
      }
    }.bind(this));
  }

  componentDidUpdate(){
    // console.log(this.props.homeState.spaceId);
    if(this.state.updateButton){
      let user = firebase.auth().currentUser;
      if (user) {
        this.setState({updateButton: false});
        let userRef = this.userdb.ref('users/' + user.uid);
        this.renderUnitGrid(userRef);
      }
    }
  }

  render() {
    if (this.state.shouldRedirect){
      return (<Redirect to={'/landing'} />);
    }
    return (
      <Container style={HomePageStyles.container}>
        {this.state.loading ?
        <Dimmer active>
          <Loader />
        </Dimmer> :
        <div>
          <div style={HomePageStyles.content}>
            <Header as='h2' style={HomePageStyles.header}>Browse Subjects
            </Header>
            <Dropdown placeholder='University' options={this.state.dropDown} fluid multiple selection />
          </div>
          <Divider section />
            <Segment>
              <Grid columns={2} divided style={HomePageStyles.gridCol}>
                {this.state.spaceGrid}
              </Grid>
            </Segment>
          </div>}
      </Container>
    );
  }
}

function mapStateToProps(state) {
  return {
    homeState: state.homeState,
  };
}

export default connect(mapStateToProps, {
  // any actions go in here
  addUnitSpace,
  fetchUnitSpaces,
  removeUnitSpace,
})(HomePage);
