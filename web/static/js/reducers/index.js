import { combineReducers } from "redux"

import projectsReducer from "./projectsReducer"
import authReducer     from "./authReducer"
import netReducer      from "./netReducer"
import alertsReducer   from "./alertsReducer"

let rootReducer = combineReducers({
  projects: projectsReducer,
  auth:     authReducer,
  net:      netReducer,
  alerts:   alertsReducer
})

export default rootReducer
