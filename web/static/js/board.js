export default class Board {
  constructor(selector, channel) {
    this.elem    = document.querySelector(selector)
    this.channel = channel
    this.initProjectSubmission()
  }

  initProjectSubmission() {
    let newProjectForm  = this.elem.querySelector(".new-project-row form")
    newProjectForm.addEventListener("submit", event => {
      event.preventDefault()
      this.submitProject()
    })
    this.channel.on("new_project", payload => {
      this.addProjectRow(payload.name)
    })
  }

  submitProject() {
    let newProjectInput = this.elem.querySelector(".new-project-row input")
    let newProjectName  = newProjectInput.value
    if (newProjectName) {
      this.channel.push("new_project", {name: newProjectName})
      newProjectInput.value = ""
    }
  }

  addProjectRow(newProjectName) {
    let newProjectRow  = this.elem.insertRow(this.elem.rows.length - 1)
    newProjectRow.innerHTML = `<td>${newProjectName}</td><td></td><td></td><td></td><td></td><td></td><td></td><td></td>`
  }
}
