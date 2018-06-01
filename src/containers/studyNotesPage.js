import React, {Component} from "react";
import {connect} from "react-redux";
import {Header, List, Search} from "semantic-ui-react";

class StudyNotesPage extends Component {
  state = {
    selectedLink: 0
  }

  componentDidMount() {
  }

  titles = [
    {title: "FIT2001 Summary Notes 2", author: "Jane Doe"},
    {title: "Introduction and Communications", author: "Sammy"},
    {title: "FIT2001 Summary Notes 1", author: "Danny"}
  ]
  myLinks = [
    "https://docs.google.com/document/d/e/2PACX-1vRDGlgN40053UYqUFEEDHKFUGS_caL7D97sGZeHctEIV-2fwIyIDCW6SKVSy6owcEKuKNgok4Cz2DSh/pub?embedded=true",
    "https://docs.google.com/document/d/e/2PACX-1vQyb8G-Bg958BZkdYRBzA2BpOLgWzLZKWmfdVO-1DYe23OdfkJub-vv7ly7FVQF2L4t1vMeLyFV-GNk/pub?embedded=true",
    "https://docs.google.com/document/d/e/2PACX-1vRX_SIJelXM3WWdvm_rQ9HAHQ5AW0SlXR2vZqxFXeKfZs7HQbfFRgxSjPFcRaIVqUtiUqhuSw9Wfe6N/pub?embedded=true"

  ]

  render() {

    const links = this.titles.map((title, index) => {
      return (
        <List.Item key={index}
                   onClick={() => {
                     this.setState({selectedLink: index})
                   }}
        >
          <List.Content>
            <List.Header as='a'>{title.title}</List.Header>
            <List.Description>{title.author}</List.Description>
          </List.Content>
        </List.Item>

      )
    });

    return (
      <div style={{display: 'flex', justifyContent: 'center'}}>

        <div style={{flex: 1, paddingTop: 10}}>
          <Header size='large'>Study Notes</Header>
          <Search/>
          <List divided relaxed style={{flex: 1}}>
            {links}
          </List>
        </div>
        <iframe
          title={'Study Notes'}
          style={{flex: 4, border: 2}}
          src={this.myLinks[this.state.selectedLink]} width="800" height="800"></iframe>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {example: state.example};
}

export default connect(mapStateToProps, {
  // any actions go in here
})(StudyNotesPage);
