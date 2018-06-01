import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchChat, sendChat } from "../actions";
import {
  Form,
  Item,
  Segment
} from "semantic-ui-react";
import moment from "moment";

class Chat extends Component {
  constructor() {
    super();

    this.state = {
      activeChat: 1,
      inputText: "",
      needsScrolling: false
    };
  }

  componentDidMount() {
    this.props.fetchChat(this.props.chatRef, this.state.activeChat);
  }

  shouldComponentUpdate(nextProps, nextState) {
    if (this.props.messages && nextProps.messages.length > this.props.messages.length) {
      this.setState({ needsScrolling: true });
    }
    return true;
  }

  componentDidUpdate() {
    if (this.state.needsScrolling) {
      this.scrollToBottom();
      this.setState({ needsScrolling: false });
    }
  }

  handleChange = (e, { name, value }) => this.setState({ [name]: value })

  handleSubmit = () => {
    if (this.props.user) {
      const { inputText } = this.state;

      const messageDetails = {
        userId: 1,
        userName: this.props.user.displayName,
        text: inputText,
        timeStamp: moment().format()
      }

      this.props.sendChat(this.props.chatRef, this.state.activeChat, messageDetails);
      this.setState({ inputText: "" });
    }
  }

  scrollToBottom = () => {
    document.getElementsByClassName("ui items")[0].scroll({
      top: this.props.messages.length * 63.4 * 5,
      behavior: "smooth"
    });
  }

  render() {
    const { inputText } = this.state;
    const { messages } = this.props;

    return (
      <Segment>
        <Item.Group
          style={{ overflowY: "scroll", maxHeight: "calc(100vh - 88px - 72px - 28px - 5px - 60px)" }}
        >
          {messages ? (
            messages.map((message, index) => (
              <Item key={index}>
                <Item.Content>
                  <Item.Meta>{message.userName}, {moment(message.timeStamp).format("MMMM Do YYYY, h:mm:ss a")}</Item.Meta>
                  <Item.Description>{message.text.split("<NEWLINE>").reduce((prev, curr) => [prev, <br key={curr}/>, curr])}</Item.Description>
                </Item.Content>
              </Item>
            ))
          ) : (
            <div>Loading</div>
          )
        }
        </Item.Group>

        <Form onSubmit={this.handleSubmit}>
          <Form.Group style={{ display: "flex" }}>
            <Form.Field style={{ flex: 1 }}>
              <Form.Input
                placeholder='Type a message'
                name='inputText'
                value={inputText}
                onChange={this.handleChange}
              />
            </Form.Field>
            <Form.Button content='Send' floated="right" />
          </Form.Group>
        </Form>
      </Segment>
    );
  }
}

function mapStateToProps(state) {
  return {
    messages: state.messages.messages,
    user: state.userState.user
  };
}

export default connect(mapStateToProps, {
  // any actions go in here
  fetchChat,
  sendChat
})(Chat);
