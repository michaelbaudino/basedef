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
    newProjectInput = @elem.querySelector(".new-project-row input")
    newProjectName  = newProjectInput.value
    if newProjectName
      @channel.push "new_project", {name: newProjectName}
      newProjectInput.value = ""

  addProjectRow: (newProjectName) ->
    newProjectRow = @elem.insertRow(this.elem.rows.length - 1)
    newProjectRow.innerHTML = "<td>#{newProjectName}</td>"
    newProjectRow.innerHTML += "<td class=\"cell\"></td>" for i in [0..6]

module.exports = Board
