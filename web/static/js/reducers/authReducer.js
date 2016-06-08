import { Presence } from "phoenix"

let authReducer = (auth = {}, action) => {
  let newPresences = []
  switch (action.type) {
    case "CONNECTION_SUCCEEDED":
      localStorage.setItem("basedef-username", action.channel.params.user_name)
      return {
        ...auth,
        currentUser: action.channel.params.user_name
      }
    case "CONNECTION_FAILED":
    case "CONNECTION_CLOSED":
      delete localStorage["basedef-username"]
      return {
        ...auth,
        currentUser: null
      }
    case "PRESENCE_STATE_RECEIVED":
      newPresences = Object.assign({}, auth.presences)
      Presence.syncState(newPresences, action.presenceState)
      return {
        ...auth,
        presences: newPresences
      }
    case "PRESENCE_DIFF_RECEIVED":
      newPresences = Object.assign({}, auth.presences)
      Presence.syncDiff(newPresences, action.presenceDiff)
      return {
        ...auth,
        presences: newPresences
      }
    default:
      return auth
  }
}

export default authReducer
