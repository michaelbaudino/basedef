import { Socket, Presence } from "phoenix"

import React from "react"

import Header     from "./Header"
import Project    from "./Project"
import NewProject from "./NewProject"
import Auth       from "./Auth"
import UserList   from "./UserList"

const Board = React.createClass({
  getInitialState() {
    return {
      projects:       {},
      errors:         {},
      socket:         new Socket("/socket", {params: {token: window.userToken}}),
      channel:        null,
      currentUser:    undefined,
      connectedUsers: {}
    }
  },

  getDefaultProps() {
    return {
      userNameKey: "basedef-username"
    }
  },

  componentDidMount() {
    let saved_username = localStorage.getItem(this.props.userNameKey)
    if (saved_username) {
      this.logIn(saved_username)
    } else {
      this.setState({currentUser: null})
    }
  },

  createChannelEventHandlers() {
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
    this.state.channel.on("presence_state", payload => {
      Presence.syncState(this.state.connectedUsers, payload)
      this.setState({connectedUsers: this.state.connectedUsers})
    })
    this.state.channel.on("presence_diff", payload => {
      Presence.syncDiff(this.state.connectedUsers, payload)
      this.setState({connectedUsers: this.state.connectedUsers})
    })
  },

  connectToChannel(user_name, afterJoinCallback) {
    this.state.socket.connect()
    this.setState(
      {channel: this.state.socket.channel("boards:" + this.props.id, {user_name: user_name})},
      function() {
        this.createChannelEventHandlers()
        this.state.channel.join()
          .receive("error", reply => { console.log("ERROR: Unable to join channel", reply) })
          .receive("ok",    reply => {
            console.log("Joined channel successfully", reply)
            afterJoinCallback()
          })
      }
    )
  },

  getProjects() {
    this.state.channel.push("list_projects")
      .receive("error", reply => { console.log("ERROR: Could not load projects", reply) })
      .receive("ok",    reply => {
        this.setState({
          projects: reply.projects.reduce(function(projects, project) {
            projects[project.id] = project
            return projects
          }, {})
        })
        console.log("Projects loaded successfully", reply)
      })
  },

  addProject(name, sourceForm) {
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

  deleteProject(name) {
    this.state.channel.push("delete_project", {name: name})
      .receive("error", errors => { console.log("ERROR: ", errors) })
  },

  logIn(name) {
    this.connectToChannel(name, () => {
      this.getProjects()
      this.state.currentUser = {name: name}
      this.setState({currentUser: this.state.currentUser})
      localStorage.setItem(this.props.userNameKey, name)
      console.log("Logged in as " + name)
    })
  },

  logOut() {
    this.state.channel.leave()
      .receive("error", errors => { console.log("ERROR: ", errors) })
      .receive("ok",    reply  => {
        delete localStorage[this.props.userNameKey]
        this.setState({currentUser: null})
        console.log("Logged out")
      })
  },

  parseErrors(errors) {
    let human_errors = new Array
    for (let field of Object.keys(errors)) {
      if (field == "name_board_id") { field = "name" }
      human_errors.push(`Project ${field} ${errors[field]}`)
    }
    return human_errors.join(", ")
  },

  renderProject(id) {
    return <Project key={id} name={this.state.projects[id].name} deleteProject={this.deleteProject} />
  },

  render() {
    return (
      <div>
        <Auth logIn={this.logIn} currentUser={this.state.currentUser} />
        <table id="board" className="table table-bordered">
          <Header />
          <tbody>
            {Object.keys(this.state.projects).map(this.renderProject)}
            <NewProject addProject={this.addProject} errors={this.state.errors.newProject} />
          </tbody>
        </table>
        <div className="row">
          <div className="col-xs-4">
            <UserList connectedUsers={this.state.connectedUsers} currentUser={this.state.currentUser} logOut={this.logOut} />
          </div>
        </div>
      </div>
    )
  }
})

export default Board
