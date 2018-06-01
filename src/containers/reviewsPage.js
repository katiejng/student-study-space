import React, {Component} from "react";
import {connect} from "react-redux";
import {Button, Card, List} from "semantic-ui-react";
import {fetchReview} from "../actions";

class ReviewsPage extends Component {


  state = {
    selectedReview: null,
  }

  componentDidMount() {
    this.props.fetchReview(this.props.reviewRef);

  }

  render() {
    const {reviews} = this.props;
    const { selectedReview } = this.state;
    // console.log("Reviews", reviews)

    const subjectReviews = reviews.subject.map((subject, index) => {
      return (
        <List.Item

          key={index}
                   onClick={() => {subjectClicked(index)}}
        >
          <List.Content >
            <List.Header as='a'>{subject.title}</List.Header>
            <List.Description>Rating: {subject.rating}/5</List.Description>
          </List.Content>
        </List.Item>
      )
    })

    const teacherReviews = reviews.teachers.map((teacher, index) => {
      return (
        <List.Item key={index}
                   onClick={() => {teacherClicked(index)}}
        >
          <List.Content>
            <List.Header as='a'>{teacher.title}</List.Header>
            <List.Description>Rating: {teacher.rating}/5</List.Description>
          </List.Content>
        </List.Item>
      )
    })

    const teacherClicked = (index) => {
      // console.log("Clicked", this.props.reviews.teachers[index])
      this.setState({selectedReview: this.props.reviews.teachers[index]})
    }


    const subjectClicked = (index) => {
      // console.log("Clicked", this.props.reviews.subject[index])
      this.setState({selectedReview: this.props.reviews.subject[index]})
    }
    return (
      <div style={{display: 'flex'}}>

        <div style={{display: 'flex', flexDirection: 'column', flex: 1}}>
          <Card style={{flex: 1, margin: 10}}>
            <Card.Content >
              <Card.Header>
                Subject Reviews
              </Card.Header>

            </Card.Content>

          </Card>

          <List divided relaxed style={{padding: '0px 15px'}}>

            {subjectReviews}

          </List>
          <Button icon='plus' style={{margin: '0px 15px'}}/>


          <Card style={{flex: 1, margin: 10}}>
            <Card.Content>
              <Card.Header>
                Teacher Reviews
              </Card.Header>
            </Card.Content>
          </Card>
          <List divided relaxed style={{padding: '0px 15px'}}>

            {teacherReviews}

          </List>
          <Button icon='plus' style={{margin: '0px 15px'}}/>


        </div>
        <Card style={{flex: 3, margin: 10}}>
          {selectedReview &&
          <Card.Content>
            <Card.Header>
              {selectedReview.title}
            </Card.Header>
            <Card.Meta>
              Rating: {selectedReview.rating}/5
            </Card.Meta>
            <Card.Description>
              {selectedReview.review}
            </Card.Description>


          </Card.Content>}
        </Card>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {reviews: state.reviews};
}

export default connect(mapStateToProps, {
  // any actions go in here
  fetchReview
})(ReviewsPage);
