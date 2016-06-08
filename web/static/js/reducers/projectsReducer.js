let projectsReducer = (projects = [], action) => {
  switch (action.type) {
    case "SET_PROJECTS":
      return action.projects
    case "PROJECT_CREATED":
      return [
        ...projects,
        action.project
      ]
    case "PROJECT_DELETED":
      return projects.filter((project) => { return project.id != action.project.id })
    default:
      return projects
  }
}

export default projectsReducer
