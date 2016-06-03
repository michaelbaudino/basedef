import React from "react"
import Modal from "react-modal"

const Auth = React.createClass({
  handleSubmit(event) {
    event.preventDefault()
    this.props.logIn(this.refs.userName.value)
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

export default Auth
