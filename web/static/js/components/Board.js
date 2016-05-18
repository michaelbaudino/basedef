import React      from "react"
import Header     from "./Header"
import Project    from "./Project"
import AddProject from "./AddProject"

import {Socket} from "phoenix"

// TODO:
//   * error management at projects load
//   * error management at project creation

var Board = React.createClass({
  addProject: function(name) {
    this.state.channel.push("create_project", {name: name})
      .receive("error", errors => { this.displayErrors(errors) })
  },
  getInitialState: function() {
    return {
      projects: {},
      socket: new Socket("/socket", {params: {token: window.userToken}}),
      channel: null
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

        this.state.channel.on("new_project", payload => {
          this.state.projects[payload.name] = {"name": payload.name}
          this.setState({"projects": this.state.projects})
        })
      }
    )
  },
  renderProject: function(id) {
    return(<Project key={id} name={this.state.projects[id].name} />)
  },
  render: function() {
    return(
      <table id="board" className="table table-bordered">
        <Header />
        <tbody>
          {Object.keys(this.state.projects).map(this.renderProject)}
          <AddProject addProject={this.addProject} />
        </tbody>
      </table>
    )
  }
})

export default Board
