import React from "react"
import Cell  from "./Cell"

var Project = React.createClass({
  render: function() {
    return(
      <tr>
        <td>{this.props.name}</td>
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
