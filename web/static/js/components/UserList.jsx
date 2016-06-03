import React from "react"

const UserList = React.createClass({
  renderUser(name) {
    return <li className="list-group-item" key={name}>{name}</li>
  },
  render() {
    return (
      <div className="user-list">
        <h3>Connected users</h3>
        <ul className="list-group">
          {Object.keys(this.props.users).map(this.renderUser)}
        </ul>
      </div>
    )
  }
})

export default UserList
