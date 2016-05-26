import React from "react"

const NewProject = React.createClass({
  addProject(event) {
    event.preventDefault()
    this.props.addProject(this.refs.projectName.value, this.refs.addProjectForm)
  },

  renderErrors() {
    if (this.props.errors) {
      return this.props.errors
    }
  },

  formGroupClasses() {
    if (this.props.errors) {
      return "form-group has-error"
    } else {
      return "form-group"
    }
  },

  render() {
    return(
      <tr className="new-project-row">
        <td colSpan="8">
          <form ref="addProjectForm" onSubmit={this.addProject}>
            <div className={this.formGroupClasses()}>
              <div className="input-group col-xs-4">
                <input className="form-control" type="text" placeholder="New project name" ref="projectName" />
                <span className="input-group-btn">
                  <button className="btn btn-success" type="submit">
                    <i className="fa fa-plus"></i>
                  </button>
                </span>
              </div>
              <span className="help-block">
                {this.renderErrors()}
              </span>
            </div>
          </form>
        </td>
      </tr>
    )
  }
})

export default NewProject
