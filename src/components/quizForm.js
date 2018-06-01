import React, { Component } from 'react'
import { Form, Card, Grid, Modal, Button } from 'semantic-ui-react'
import axios from 'axios';

class QuizForm extends Component {
  constructor(props){
    super(props);
    this.state = {
      items: props.items,
      choices: [],
      submitted: false,
      disableButton: false,
      scheduleModalOpen: false
    }
  }

  handleSubmit = (e) => {
    this.setState({submitted: true})
  };

  openScheduleModal = () => {
    this.setState({ scheduleModalOpen: true });
  }

  closeScheduleModal = () => {
    this.setState({ scheduleModalOpen: false });
  }

  closeModal = () => {
    this.setState({submitted: false, disableButton: true})
  };

  scheduleQuiz = (time, unitId, quizId) => {
    axios.get(`https://us-central1-student-study-space.cloudfunctions.net/beginQuiz?unitId=${unitId}&quizId=${quizId}&chatRoomId=1&timeToBegin=${time*1000}`)
    this.closeScheduleModal();
  };

  render() {
    return (
      <div style={{marginLeft: '20%', marginRight: '20%', textAlign: 'center'}}>

        <div>
          <p>Do the quiz now by yourself or </p>
          <Button onClick={this.openScheduleModal}>Schedule in chat</Button>
          <Modal open={this.state.scheduleModalOpen}>
            <Modal.Header>
              Schedule quiz in chat
              <Button floated="right" icon="close" onClick={this.closeScheduleModal} />
            </Modal.Header>
            <Modal.Content>
              <Modal.Description>
                Pick how many seconds from now you want to schedule the quiz
                <input style={{margin: '0 10px'}} type="number" name="scheduleTime"/>
                <Button onClick={() => this.scheduleQuiz(5, 1, this.state.items.id)}>Schedule</Button>
              </Modal.Description>
            </Modal.Content>
          </Modal>
        </div>

        <Modal open={this.state.submitted}>
          <Modal.Content>
            <p>You got {this.state.items.question.length - 1}/{this.state.items.question.length} questions correct. Good job!</p>
          </Modal.Content>
          <Modal.Actions>
            <Button color='green' inverted onClick={this.closeModal}>
              Close
            </Button>
          </Modal.Actions>
        </Modal>
        <Form onSubmit={this.handleSubmit}>
          <h2 style={{marginTop: '20px'}}>{this.state.items.name}</h2>
          <Grid divided style={{marginTop: '20px'}}>
            {this.state.items.question.map((i, index) => (
              <Grid.Row key={index}>
                <Card
                  style={{width: '100%'}}
                >
                  <Card.Content>
                    <Form.Group grouped key={index} name={i.question}>
                      <h3>{i.question}</h3>
                      <div style={{textAlign: 'left'}}>
                        {i.options.map((j, j_index) => (
                          <Form.Field label={j.text} control='input' type='radio' className={i.question} name={i.question} key={j_index}/>
                        ))}
                      </div>
                    </Form.Group>
                  </Card.Content>
                </Card>
              </Grid.Row>
            ))}
          </Grid>
          <Form.Button disabled={this.state.disableButton} style={{marginTop: '20px'}}>Submit</Form.Button>
        </Form>
      </div>
    )
  }
}

export default QuizForm
