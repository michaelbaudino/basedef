import React from "react"
import Cell  from "./Cell"

var Project = React.createClass({
  deleteProject: function(event) {
    event.preventDefault();
    this.props.deleteProject(this.props.name);
  },
  render: function() {
    return(
      <tr className="project">
        <td>
          {this.props.name}
          <span className="delete-project" onClick={this.deleteProject}>&times;</span>
        </td>
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
