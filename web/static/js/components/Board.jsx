import React from "react"
import { connect } from "react-redux"

import Header     from "./Header"
import Project    from "./Project"
import NewProject from "./NewProject"

const Board = React.createClass({
  renderProject(project) {
    return <Project key={project.name} project={project} />
  },

  render() {
    return (
      <table id="board" className="table table-bordered">
        <Header />
        <tbody>
          {this.props.projects.map(this.renderProject)}
          <NewProject />
        </tbody>
      </table>
    )
  }
})

let mapStateToProps = (state) => {
  return {
    projects: state.projects
  }
}

export default connect(mapStateToProps)(Board)
