import React from "react"
import Cell  from "./Cell"

const Project = React.createClass({
  deleteProject(event) {
    event.preventDefault()
    this.props.deleteProject(this.props.name)
  },

  render() {
    return(
      <tr className="project">
        <th>
          {this.props.name}
          <span className="delete-project" onClick={this.deleteProject}>&times;</span>
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

export default Project
