import React, {Component} from "react";
import {connect} from "react-redux";
import {Input, Menu, Image, Dropdown} from 'semantic-ui-react'
import logo from '../assets/imgs/favicon.png'
import LogInButton from "../containers/LogInButton";
import {Link} from "react-router-dom";

class Toolbar extends Component {
  state = {activeItem: 'home'};

  handleItemClick = (e, {name}) => this.setState({activeItem: name});

  renderDropDown() {
    let list =[]
    try {
      for(let i=0; i<this.props.homeState.spaceId.length; i++){
        const path = this.props.homeState.spaceId[i].spaceId
        list.push(
          <Dropdown.Item key={i} as={Link} to={'/unit/'+path}>{this.props.homeState.spaceId[i].id}</Dropdown.Item>
        )
      }
    } catch (e) {
      // console.log('none')
    }

    return list;
  }

  render() {
    const {activeItem} = this.state;
    const {userState} = this.props;
    return (
      <Menu secondary size={'large'} inverted style={{margin: 0, backgroundColor: '#20A16D'}}>
        <Link to={"/"} style={{display: 'flex'}}>
          <Menu.Item>
            <Image src={logo} alt={'logo'} style={{height: '50px', width: '50px'}}/>
          </Menu.Item>
          <Menu.Item>
            <h1 style={{margin: 0}}>Student Study Space</h1>
          </Menu.Item>
        </Link>
        <Menu.Menu position='right'>
          <Menu.Item>
            <Input icon='search' placeholder='Search classes...'/>
          </Menu.Item>
          {
            userState.user &&
            <Menu.Item className='notifications' icon='bell' active={activeItem === 'notifications'}
                       onClick={this.handleItemClick}/>
          }
          {
            userState.user &&
            <Dropdown item icon='user'>
              <Dropdown.Menu>
                {this.renderDropDown()}
              </Dropdown.Menu>
            </Dropdown>

          }
          <Menu.Item><LogInButton/></Menu.Item>


        </Menu.Menu>
        <span/>
      </Menu>
    )
  }
}

function mapStateToProps(state) {
  return {
    userState: state.userState,
    homeState: state.homeState,
  };
}

export default connect(mapStateToProps)(Toolbar);
