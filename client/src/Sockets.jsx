import React from 'react';
import io from "socket.io-client";
import Counter from './Counter'

/* store SERVER variable in config var with URL of server. ex. https://appname.herokuapp.com */
const server = "https://antelope-valley-poppies.herokuapp.com"
const local = "http://localhost:5000"

const socket = io.connect(server)

export default class Sockets extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      users : ""
    }
  }

  componentDidMount() {
    socket.emit("state request")
    socket.on("state change", (userCount) => {
      console.log('changing state');
      this.setState({
        users: userCount
      })
    })
  }

  render() {
    return (
      <Counter 
        playState = {this.props.playState}
        userCount = {this.state.users}
      />
    )
  }
}