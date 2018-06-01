import React, { Component } from "react";
import { Card, Grid } from 'semantic-ui-react'

class QuizzesList extends Component {
  constructor(props){
    super(props);
    this.state = {quizzes: props.quizzes, onSelectQuiz: props.onSelectQuiz};
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      quizzes: nextProps.quizzes,
    })
  }

  render() {
    // console.log(this.props);
    return (
      <Grid divided style={{marginTop: '20px'}}>
        {this.state.quizzes.map((i, index) => (
          <Grid.Row key={index} style={{width: '100%'}}>
            <Card
              style={{width: '100%'}}
              onClick={() => this.props.onSelectQuiz(index)}
            >
              <Card.Content>
                <Card.Header content={i.name}/>
                <Card.Meta content={(i.question.length).toString()+' items'}/>
                <Card.Description content={i.description}/>
              </Card.Content>
            </Card>
          </Grid.Row>
        ))}
      </Grid>
    );
  }
}

export default QuizzesList;
