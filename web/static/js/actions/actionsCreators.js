function serverErrorsToAlertContent(errors, action = "") {
  let issuesItems = Object.keys(errors).map((field) => {
    return "<li><b>" + field + "</b> " + errors[field].join(", ") + "</li>"
  }).join()
  let alertContent = "<h4>Error " + action + "</h4>The following errors were found:<ul>" + issuesItems + "</ul>"
  return {__html: alertContent}
}

export function addAlert(message, level) {
  return {
    type: "ADD_ALERT",
    alert: {
      message,
      level
    }
  }
}

export function deleteAlert(index) {
  return {
    type: "DELETE_ALERT",
    index
  }
}

export function setProjects(projects) {
  return {
    type: "SET_PROJECTS",
    projects
  }
}

export function getProjects(channel) {
  return (dispatch) => {
    channel.push("list_projects")
      .receive("error", errors => { console.log("ERROR: Could not load projects", errors) })
      .receive("ok",    reply  => {
        dispatch(setProjects(reply.projects))
        console.log("Projects loaded successfully", reply)
      })
  }
}

export function createProject(channel, name) {
  return (dispatch) => {
    channel.push("create_project", {name: name})
      .receive("ok",    project => { console.log("Project \"" + name + "\" created.", project) })
      .receive("error", errors  => {
        dispatch(addAlert(serverErrorsToAlertContent(errors, "creating the project"), "danger"))
        console.log("ERROR: Project \"" + name + "\" could not be created.", errors)
      })
  }
}

export function deleteProject(channel, project) {
  return (dispatch) => {
    channel.push("delete_project", {id: project.id})
      .receive("ok",    project => { console.log("Project \"" + project.name + "\" deleted.", project) })
      .receive("error", errors  => {
        dispatch(addAlert(serverErrorsToAlertContent(errors, "deleting the project"), "danger"))
        console.log("ERROR: Project \"" + project.name + "\" could not be deleted.", errors)
      })
  }
}

export function connectionSucceeded(channel, serverReply) {
  return {
    type: "CONNECTION_SUCCEEDED",
    channel,
    serverReply
  }
}

export function connectionFailed(errors) {
  return {
    type: "CONNECTION_FAILED",
    errors
  }
}

export function presenceStateReceived(presenceState) {
  return {
    type: "PRESENCE_STATE_RECEIVED",
    presenceState
  }
}

export function presenceDiffReceived(presenceDiff) {
  return {
    type: "PRESENCE_DIFF_RECEIVED",
    presenceDiff
  }
}

export function projectCreated(project) {
  return {
    type: "PROJECT_CREATED",
    project
  }
}

export function projectDeleted(project) {
  return {
    type: "PROJECT_DELETED",
    project
  }
}

export function logIn(socket, boardId, username) {
  return (dispatch) => {
    socket.connect()
    let channel = socket.channel("boards:" + boardId, {user_name: username})
    channel.on("presence_state",  presenceState => { dispatch(presenceStateReceived(presenceState)) })
    channel.on("presence_diff",   presenceDiff  => { dispatch(presenceDiffReceived(presenceDiff))  })
    channel.on("project_created", project       => { dispatch(projectCreated(project)) })
    channel.on("project_deleted", project       => { dispatch(projectDeleted(project)) })
    channel.join()
      .receive("error", errors => { dispatch(connectionFailed(errors)) })
      .receive("ok",    reply  => {
        dispatch(connectionSucceeded(channel, reply))
        dispatch(getProjects(channel))
      })
  }
}

export function connectionClosed(serverReply) {
  return {
    type: "CONNECTION_CLOSED",
    serverReply
  }
}

export function logOut(channel = null) {
  return (dispatch) => {
    if (channel) {
      channel.leave()
      .receive("error", errors => { console.log("ERROR: ", errors) })
      .receive("ok",    reply  => { dispatch(connectionClosed(reply)) })
    } else {
      dispatch(connectionClosed(null))
    }
  }
}
