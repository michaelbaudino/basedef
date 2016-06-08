import React from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import { deleteProject } from "../actions/actionsCreators"

import Cell  from "./Cell"

const Project = React.createClass({
  handleDeleteClick(event) {
    event.preventDefault()
    this.props.deleteProject(this.props.channel, this.props.project)
  },

  render() {
    return(
      <tr className="project">
        <th>
          {this.props.project.name}
          <span className="delete-project" onClick={this.handleDeleteClick}>&times;</span>
        </th>
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
        <Cell />
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
  return bindActionCreators({ deleteProject }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Project)
