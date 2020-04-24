import React from 'react'
import io from "socket.io-client"
import Counter from './Counter'
import TonePlayer from './TonePlayer'

/* class container for all socket operations
contains the Counter and TonePlayer classes
uses socket.io */

/* store SERVER variable in config var with URL of server. ex. https://appname.herokuapp.com */
const server = "https://antelope-valley-poppies.herokuapp.com"
const local = "http://localhost:5000"

const socket = io.connect(local)

export default class Sockets extends React.Component {
  constructor(props) {
    super(props)
    this.onClick = this.props.onClick.bind(this)

    /* state keeps track of current and previous users
    updated on every log on / log off via a socket event */
    this.state = {
      currUsers : 0,
      prevUsers : 0
    }

    /* variable initialization */
    this.previousCount = 0
    this.visitorCount = 0
  }

  componentDidMount() {
    socket.emit("state request") // ask for user count on load
    /* every time the socket sends a state change,
    update pointers and set state */
    socket.on("state change", (userCount) => {
      this.previousCount = this.visitorCount;
      this.visitorCount = userCount;
      this.setState({
        currUsers: this.visitorCount,
        prevUsers: this.previousCount
      })
    })
  }

  render() {
    const playState = this.props.playState
    const recordState = this.props.recordState
    const currUsers = this.state.currUsers
    const prevUsers = this.state.prevUsers
    const onClick = this.props.onClick
    return (
      <React.Fragment>
        <Counter 
          playState = {playState}
          userCount = {currUsers}
        />
        <TonePlayer 
          playState = {playState}
          recordState = {recordState}
          currUsers = {currUsers}
          prevUsers = {prevUsers}
          onClick = {onClick}
        />
      </React.Fragment>
    )
  }
}