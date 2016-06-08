import React from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import { createProject } from "../actions/actionsCreators"

const NewProject = React.createClass({
  uuid() {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, (c) => {
      let r = Math.random() * 16 | 0
      let v = c == "x" ? r : (r & 0x3 | 0x8)
      return v.toString(16)
    })
  },

  handleSubmit(event) {
    event.preventDefault()
    this.props.createProject(this.props.channel, this.refs.projectName.value)
    this.refs.form.reset()
  },

  render() {
    return(
      <tr className="new-project-row">
        <td colSpan="8">
          <form ref="form" onSubmit={this.handleSubmit}>
            <div className="form-group">
              <div className="input-group col-xs-4">
                <input className="form-control" type="text" placeholder="New project name" ref="projectName" />
                <span className="input-group-btn">
                  <button className="btn btn-success" type="submit">
                    <i className="fa fa-plus"></i>
                  </button>
                </span>
              </div>
            </div>
          </form>
        </td>
      </tr>
    )
  }
})

let mapStateToProps = (state) => {
  return {
    channel: state.net.channel
  }
}

let mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ createProject }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(NewProject)
