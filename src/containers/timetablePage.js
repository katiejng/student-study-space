import React, {Component} from "react";
import {connect} from "react-redux";

class TimetablePage extends Component {
  componentDidMount() {
  }

  render() {
    return (
      <div style={{display: 'flex', justifyContent: 'center'}}>
        <iframe style={{flex: 1, border: 0}}
                title={'Calendar'}
          src="https://calendar.google.com/calendar/embed?src=si0f9lm39mo27i4236stjhgl1c%40group.calendar.google.com&ctz=Australia%2FMelbourne"
          width="800" height="600"></iframe>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {example: state.example};
}

export default connect(mapStateToProps, {
  // any actions go in here
})(TimetablePage);
