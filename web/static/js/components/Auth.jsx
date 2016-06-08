import React from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"
import Modal from "react-modal"

import { logIn, logOut } from "../actions/actionsCreators"

const Auth = React.createClass({
  componentDidMount() {
    let savedUsername = localStorage.getItem("basedef-username")
    if (savedUsername) {
      this.props.logIn(this.props.socket, this.props.boardId, savedUsername)
    } else {
      this.props.logOut()
    }
  },

  handleSubmit(event) {
    event.preventDefault()
    this.props.logIn(this.props.socket, this.props.boardId, this.refs.userName.value)
  },

  render() {
    let modalStyle = {
      content: {
        top:    "5em",
        left:   "30%",
        right:  "30%",
        bottom: "auto"
      },
      overlay: {
        zIndex: 10,
        backgroundColor: "rgba(0,0,0,0.9)"
      }
    }
    return (
      <Modal isOpen={this.props.currentUser === null} style={modalStyle}>
        <h2>Happy Friday!</h2>
        <form onSubmit={this.handleSubmit}>
          <label>Log me in as</label>
          <input placeholder="What's your name ?" ref="userName" />
          <button className="btn btn-success" type="submit">OK</button>
        </form>
      </Modal>
    )
  }
})

let mapStateToProps = (state) => {
  return {
    socket:      state.net.socket,
    boardId:     state.net.boardId,
    currentUser: state.auth.currentUser
  }
}

let mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ logIn, logOut }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
