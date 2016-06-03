import React from "react"

const UserList = React.createClass({
  isCurrentUser(name) {
    return this.props.currentUser && this.props.currentUser.name === name
  },

  renderLogOutButton(name) {
    if (this.isCurrentUser(name)) {
      return (
        <span className="logOut" onClick={this.props.logOut}>
          <i className="fa fa-sign-out"></i>
        </span>
      )
    }
  },

  renderUser(name) {
    let itemClasses = "list-group-item"
    if (this.isCurrentUser(name)) {
      itemClasses += " current-user"
    }
    return (
      <li className={itemClasses} key={name}>
        {name}
        {this.renderLogOutButton(name)}
      </li>
    )
  },

  render() {
    return (
      <div className="user-list">
        <h3>Connected users</h3>
        <ul className="list-group">
          {Object.keys(this.props.connectedUsers).map(this.renderUser)}
        </ul>
      </div>
    )
  }
})

export default UserList
