import React from "react"

var NewProject = React.createClass({
  addProject: function(event) {
    event.preventDefault()
    this.props.addProject(this.refs.projectName.value)
    this.refs.addProjectForm.reset()
  },
  render: function() {
    return(
      <tr className="new-project-row">
        <td colSpan="8">
          <form ref="addProjectForm" onSubmit={this.addProject}>
            <div className="form-group">
              <div className="input-group col-xs-4">
                <input className="form-control" type="text" placeholder="New project name" ref="projectName" />
                <span className="input-group-btn">
                  <button className="btn btn-success" type="submit">
                    <i className="fa fa-plus"></i>
                  </button>
                </span>
              </div>
              <span className="help-block"></span>
            </div>
          </form>
        </td>
      </tr>
    )
  }
})

export default NewProject
