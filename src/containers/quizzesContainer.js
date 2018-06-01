import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import QuizzesList from "../components/quizzesList";
import QuizForm from "../components/quizForm";
import { Input, Icon } from 'semantic-ui-react';
import { fetchQuizzes } from "../actions";

class QuizzesContainer extends Component {
  constructor(){
    super();
    this.state = {isLoading: false, results: [], value: '', selectedQuiz: undefined}
  }

  componentDidMount() {
    this.props.fetchQuizzes(this.props.quizzesRef);
  }

  componentWillReceiveProps(nextProps){
    this.setState({
      results: nextProps.quizzes,
      selectedQuiz: undefined
    })
  }

  handleSelectQuiz = (quizIndex) => {
    this.setState({selectedQuiz: quizIndex});
  };

  handleChange = function(e){
    this.setState({ isLoading: true, value: e.target.value});

    const re = new RegExp(_.escapeRegExp(this.state.value), 'i');
    const isMatch = result => re.test(result.name);

    if(this.state.value === ''){
      this.setState({
        isLoading: false,
        results: this.props.quizzes,
      });
    } else {
      this.setState({
        isLoading: false,
        results: _.filter(this.props.quizzes, isMatch),
      });
    }
  };

  render() {
    if(this.state.selectedQuiz === undefined){
      return (
        <div style={{marginLeft: '20%', marginRight: '20%', textAlign: 'center'}}>
          <Input fluid icon placeholder='Search...' style={{marginTop: '20px'}}>
            <input
              onChange={e => this.handleChange(e)}
            />
            <Icon name='search'/>
          </Input>
          <QuizzesList quizzes={this.state.results} onSelectQuiz={this.handleSelectQuiz}/>
        </div>
      )
    } else {
      return(
        <QuizForm items={this.state.results[this.state.selectedQuiz]} />
      )
    }
  }
}

function mapStateToProps(state) {
  let quizzesArray = [];
  let quizzesObject = state.quizzes.quizzes;
  for(let key in quizzesObject){
    quizzesArray.push(quizzesObject[key]);
  }
  return {
    quizzes: quizzesArray,
  };
}

export default connect(mapStateToProps, {
  fetchQuizzes
})(QuizzesContainer);