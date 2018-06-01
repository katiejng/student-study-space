import React, { Component } from "react";
import { connect } from "react-redux";
import { exampleAction } from "../actions";

class ExampleContainer extends Component {
  componentDidMount() {
    this.props.exampleAction();
  }

  render() {
    return (
      <div>Example Container { JSON.stringify(this.props.example) }</div>
    );
  }
}

function mapStateToProps(state) {
  return { example: state.example };
}

export default connect(mapStateToProps, {
  // any actions go in here
  exampleAction
})(ExampleContainer);
