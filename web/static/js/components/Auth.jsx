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
    this.props.logIn(this.props.socket, this.props.boardId, this.refs.username.value)
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
        <div className="row auth-modal">
          <h2>Happy Friday!</h2>
          <form onSubmit={this.handleSubmit} ref="form">
            <div className="col-xs-6 col-xs-offset-3">
              <div className="input-group">
                <input type="text" className="form-control" placeholder="What's your name?" ref="username" />
                <span className="input-group-btn">
                  <button className="btn btn-success" type="submit">Join!</button>
                </span>
              </div>
            </div>
          </form>
        </div>
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
