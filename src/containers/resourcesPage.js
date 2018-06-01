import React, {Component} from "react";
import {connect} from "react-redux";
import {Header, List, Search} from "semantic-ui-react";

class ResourcesPage extends Component {


  componentDidMount() {
  }

  titles = [
    {title: "FIT2001 Summary Notes 2", link: "http://www.example.com"},
    {title: "Introduction and Communications", link: "http://www.worldwideweb.com"},
    {title: "Joseph Kim's CV", link: "http://josephkim.online/"}
  ]


  render() {

    const links = this.titles.map((title, index) => {
      return (
        <List.Item key={index}
                   style={{flex: 1}}
                   onClick={() => {
                     this.setState({selectedLink: index})
                   }}
        >
          <List.Content>
            <List.Header as='a' target="_blank" href={title.link}>{title.title}</List.Header>
            <List.Description>{title.link}</List.Description>
          </List.Content>
        </List.Item>

      )
    });

    return (
      <div style={{display: 'flex', justifyContent: 'center', flexDirection: 'column'}}>

          <Header size='large'>Resources</Header>
          <Search/>
          <List divided relaxed style={{flex: 1, display: 'flex', flexDirection: 'column'}}>
            {links}
          </List>

      </div>
    );
  }
}

function mapStateToProps(state) {
  return {example: state.example};
}

export default connect(mapStateToProps, {
  // any actions go in here
})(ResourcesPage);
