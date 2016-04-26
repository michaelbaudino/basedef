export default class Board {
  constructor(selector, channel) {
    this.channel = channel
    this.elem    = document.querySelector(selector)
    this.initProjectSubmission()
  }

  initProjectSubmission() {
    let newProjectForm = this.elem.querySelector(".new-project-row form")
    newProjectForm.addEventListener("submit", event => {
      event.preventDefault()
      this.submitProject()
    })
    this.channel.on("new_project", payload => {
      this.addProjectRow(payload.name)
    })
  }

  submitProject() {
    this.clearErrors()
    let newProjectInput = this.elem.querySelector(".new-project-row input")
    let newProjectName  = newProjectInput.value
    this.channel.push("create_project", {name: newProjectName})
      .receive("error", errors => {
        this.displayErrors(errors)
      })
    newProjectInput.value = ""
  }

  displayErrors(errors) {
    this.elem.querySelector(".new-project-row .form-group").classList.add("has-error")
    let human_errors = []
    for (let [field, reason] of errors) {
      if (field == "name_board_id") { field = "name" }
      human_errors += `Project ${field} ${reason}`
    }
    this.elem.querySelector(".new-project-row .help-block").innerText = human_errors.join(", ")
  }

  clearErrors() {
    this.elem.querySelector(".new-project-row .help-block").innerText = ""
    this.elem.querySelector(".new-project-row .form-group").classList.remove("has-error")
  }

  addProjectRow(newProjectName) {
    let newProjectRow = this.elem.insertRow(this.elem.rows.length - 1)
    newProjectRow.innerHTML = `<td>${newProjectName}</td>` + `<td class="cell"></td>`.repeat(7)
  }
}
