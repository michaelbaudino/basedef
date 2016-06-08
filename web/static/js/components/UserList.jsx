import React from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import { logOut } from "../actions/actionsCreators.js"

const UserList = React.createClass({
  handleLogoutClick(event) {
    event.preventDefault()
    this.props.logOut(this.props.channel)
  },

  renderLogOutButton(username) {
    if (username == this.props.currentUser) {
      return (
        <span className="logOut" onClick={this.handleLogoutClick}>
          <i className="fa fa-sign-out"></i>
        </span>
      )
    }
  },

  renderUser(username) {
    let itemClasses = "list-group-item"
    if (username == this.props.currentUser) {
      itemClasses += " current-user"
    }
    return (
      <li className={itemClasses} key={username}>
        {username}
        {this.renderLogOutButton(username)}
      </li>
    )
  },

  render() {
    return (
      <div className="row">
        <div className="user-list col-xs-4">
          <h3>Connected users</h3>
          <ul className="list-group">
            {Object.keys(this.props.presences).map(this.renderUser)}
          </ul>
        </div>
      </div>
    )
  }
})

let mapStateToProps = (state) => {
  return {
    presences:   state.auth.presences,
    currentUser: state.auth.currentUser,
    channel:     state.net.channel
  }
}

let mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ logOut }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(UserList)
