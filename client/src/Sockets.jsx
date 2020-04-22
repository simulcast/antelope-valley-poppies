import React from 'react'
import io from "socket.io-client"
import Counter from './Counter'
import TonePlayer from './TonePlayer'

/* store SERVER variable in config var with URL of server. ex. https://appname.herokuapp.com */
const server = "https://antelope-valley-poppies.herokuapp.com"
const local = "http://localhost:5000"

const socket = io.connect(server)

export default class Sockets extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currUsers : 0,
      prevUsers : 0
    }

    this.previousCount = 0
    this.visitorCount = 0
  }

  componentDidMount() {
    socket.emit("state request")
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
    const currUsers = this.state.currUsers
    const prevUsers = this.state.prevUsers
    console.log(currUsers, prevUsers)
    return (
      <React.Fragment>
      <Counter 
        playState = {playState}
        userCount = {currUsers}
      />
      <TonePlayer 
        playState= {playState}
        currUsers = {currUsers}
        prevUsers = {prevUsers}
      />
      </React.Fragment>
    )
  }
}