import { createStore, applyMiddleware, compose } from "redux"
import thunkMiddleware from "redux-thunk"
import { Socket } from "phoenix"

import rootReducer from "./reducers"

let enhancers = compose(
  applyMiddleware(thunkMiddleware),
  window.devToolsExtension ? window.devToolsExtension() : f => f
)

let store = (boardId) => {
  let initialState = {
    projects: [],
    alerts: [],
    auth: {
      presences:   {},
      currentUser: undefined
    },
    net: {
      socket:  new Socket("/socket", {params: {}}),
      channel: undefined,
      boardId: boardId
    }
  }
  return createStore(rootReducer, initialState, enhancers)
}

export default store
