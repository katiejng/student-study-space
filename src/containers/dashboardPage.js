import React, {Component} from "react";
import {connect} from "react-redux";
import {Card} from "semantic-ui-react";
import {Link} from "react-router-dom";

const unitpaths = ['home', 'chat', 'resources', 'studyNotes', 'quizzes', 'timetable', 'reviews'];
const rainbow = ['red', 'orange', 'yellow', 'green', 'blue', 'purple']
const dash_items = [
  {
    section: 'Chat',
    number: 102,
    status: " new messages",
    maintext: <div>(Quizchat) <span style={{fontStyle: 'italic'}}>Quizbot</span>: Get ready! History of Computer Science is about to begin.<br />(Exam Discussion) <span style={{fontStyle: 'italic'}}>Joseph</span>: Did you know 1+1 = window?</div>
  }, {
    section: 'Resources',
    number: 2,
    status: " new resources uploaded",
    maintext: <div>(Exam) 20 resources.<br />     (Assessment) Katie uploaded 2 new documents</div>


  }, {
    section: 'Study Notes',
    number: 23,
    status: " new study notes uploaded",
    maintext: <div>(Exam) 25 notes.<br />     (Assessment) Sadhir updated 2 new notes</div>

  }, {
    section: 'Quizzes',
    number: 3,
    status: " new quizzes created",
    maintext: <div>(Computer Architecture) 23 questions.<br />     (Pop Quiz) Hazim added 2 new questions</div>

  }, {
    section: 'Timetable',
    number: 3,
    status: " upcoming events",
    maintext: <div>(May) 3 events.<br />     (June) 4 events.</div>

  }, {
    section: 'Reviews',
    number: 7,
    status: " subject and teacher reviews",
    maintext: <div>(Teacher) 15 reviews.<br />     (Subject) 23 reviews</div>

  }];


class DashboardPage extends Component {

  render() {
    // console.log(mockData);
    const { match } = this.props;
    return (
      <div style={{display: 'flex', flexWrap: 'wrap', justifyContent: 'center'}}>

        {
          dash_items.map((item,index) => {
            return (
              <Card style={{flex: 1, margin: 10, minWidth: 250}}
              as={Link}
                    to={'/unit/'+ match.params.id+'/'+unitpaths[index+1]}
                    key={index}
                    color={rainbow[index]}
              >
                <Card.Content>
                  <Card.Header>
                    {item.section}
                  </Card.Header>
                  <Card.Description>
                    {item.maintext? item.maintext: "Click to see more detail"}
                  </Card.Description>
                  <Card.Meta>
                    {item.number} {item.status}
                  </Card.Meta>
                </Card.Content>
                </Card>
            )
          })
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {example: state.example};
}

export default connect(mapStateToProps, {
  // any actions go in here
})(DashboardPage);
