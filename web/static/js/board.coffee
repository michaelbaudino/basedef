class Board
  constructor: (selector, @channel) ->
    @elem = document.querySelector(selector)
    @initProjectSubmission()

  initProjectSubmission: ->
    newProjectForm = @elem.querySelector(".new-project-row form")
    newProjectForm.addEventListener "submit", (event) =>
      event.preventDefault()
      @submitProject()
    @channel.on "new_project", (payload) =>
      @addProjectRow(payload.name)

  submitProject: ->
    @clearErrors()
    newProjectInput = @elem.querySelector(".new-project-row input")
    newProjectName  = newProjectInput.value
    @channel.push "create_project", {name: newProjectName}
      .receive "error", (errors) =>
        @displayErrors(errors)
    newProjectInput.value = ""

  displayErrors: (errors) ->
    @elem.querySelector(".new-project-row .form-group").classList.add("has-error")
    human_errors = for field, reason of errors
      field = "name" if field == "name_board_id"
      "Project #{field} #{reason}"
    @elem.querySelector(".new-project-row .help-block").innerText = human_errors.join(", ")

  clearErrors: ->
    @elem.querySelector(".new-project-row .help-block").innerText = ""
    @elem.querySelector(".new-project-row .form-group").classList.remove("has-error")

  addProjectRow: (newProjectName) ->
    newProjectRow = @elem.insertRow(this.elem.rows.length - 1)
    newProjectRow.innerHTML = "<td>#{newProjectName}</td>"
    newProjectRow.innerHTML += "<td class=\"cell\"></td>" for i in [0..6]

module.exports = Board
