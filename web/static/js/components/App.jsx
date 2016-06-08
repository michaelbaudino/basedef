import React from "react"
import Auth     from "./Auth"
import Alerts   from "./Alerts"
import Board    from "./Board"
import UserList from "./UserList"

let App = React.createClass({
  render() {
    return (
      <div>
        <Auth />
        <Alerts />
        <Board />
        <UserList />
      </div>
    )
  }
})

export default App
