import React, { Component } from "react";
import { connect } from "react-redux";

class ExampleComponent extends Component {
  render() {
    return (
      <div>Example Component { JSON.stringify(this.props.example) }</div>
    );
  }
}

function mapStateToProps(state) {
  return { example: state.example };
}

export default connect(mapStateToProps)(ExampleComponent);
