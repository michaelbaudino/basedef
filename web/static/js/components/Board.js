import React      from "react"
import Header     from "./Header"
import Project    from "./Project"
import NewProject from "./NewProject"

import {Socket} from "phoenix"

var Board = React.createClass({
  getInitialState: function() {
    return {
      projects: {},
      errors:   {},
      socket:   new Socket("/socket", {params: {token: window.userToken}}),
      channel:  null
    }
  },
  getProjects: function() {
    this.state.channel.push("list_projects")
      .receive("error", reply => { console.log("ERROR: Could not load projects", reply) })
      .receive("ok",    reply => {
        this.setState({
          projects: reply.  projects.reduce(function(projects, project) {
            projects[project.id] = project
            return projects
          }, {})
        })
        console.log("Projects loaded successfully", reply)
      })
  },
  addProject: function(name, sourceForm) {
    this.state.channel.push("create_project", {name: name})
      .receive("error", errors => {
        this.state.errors.newProject = this.parseErrors(errors)
        this.setState({errors: this.state.errors})
      })
      .receive("ok", reply => {
        delete this.state.errors.newProject
        this.setState({errors: this.state.errors})
        sourceForm.reset()
      })
  },
  deleteProject: function(name) {
    this.state.channel.push("delete_project", {name: name})
      .receive("error", errors => { this.displayErrors(errors) })
  },
  parseErrors: function(errors) {
    let human_errors = new Array
    for (let field of Object.keys(errors)) {
      if (field == "name_board_id") { field = "name" }
      human_errors.push(`Project ${field} ${errors[field]}`)
    }
    return human_errors.join(", ")
  },
  componentDidMount: function() {
    this.state.socket.connect()
    this.setState(
      {channel: this.state.socket.channel("boards:" + this.props.id, {})},
      function() {
        this.state.channel.join()
          .receive("error", reply => { console.log("ERROR: Unable to join channel", reply) })
          .receive("ok",    reply => {
            console.log("Joined channel successfully", reply)
            this.getProjects()
          })

        this.state.channel.on("project_added", payload => {
          this.state.projects[payload.id] = {"name": payload.name}
          this.setState({"projects": this.state.projects})
          console.log("Project added", payload)
        })
        this.state.channel.on("project_deleted", payload => {
          delete this.state.projects[payload.id]
          this.setState({"projects": this.state.projects})
          console.log("Project deleted", payload)
        })
      }
    )
  },
  renderProject: function(id) {
    return(<Project key={id} name={this.state.projects[id].name} deleteProject={this.deleteProject} />)
  },
  render: function() {
    return(
      <table id="board" className="table table-bordered">
        <Header />
        <tbody>
          {Object.keys(this.state.projects).map(this.renderProject)}
          <NewProject addProject={this.addProject} errors={this.state.errors.newProject} />
        </tbody>
      </table>
    )
  }
})

export default Board
