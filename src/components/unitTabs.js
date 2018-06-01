import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import {Link} from "react-router-dom";

const items = ['home', 'chat', 'resources', 'studyNotes', 'quizzes', 'timetable', 'reviews'];
const rainbow = ['red', 'orange', 'yellow', 'green', 'blue', 'purple', 'pink']

export default class MenuExampleNameProp extends Component {
  state = {};

  handleItemClick = (e, { name }) => this.setState({ activeItem: name });

  render() {
    const { match } = this.props;
    const { activeItem } = this.state;

    return (
      <Menu fluid widths={items.length}>
        {items.map((i,index) => (
          <Menu.Item
            key={i}
            color={rainbow[index]}
            as={Link}
            to={'/unit/'+ match.params.id+'/'+i}
            name={i}
            active={activeItem === i}
            onClick={this.handleItemClick}
          />
        ))}
      </Menu>
    )
  }
}