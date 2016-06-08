// Brunch automatically concatenates all files in your
// watched paths. Those paths can be configured at
// config.paths.watched in "brunch-config.js".
//
// However, those files will only be executed if
// explicitly imported. The only exception are files
// in vendor, which are never wrapped in imports and
// therefore are always executed.

// Import dependencies
//
// If you no longer want to use a dependency, remember
// to also remove its path from "config.paths.watched".
import "phoenix_html"
import Clipboard    from "clipboard"
import React        from "react"
import ReactDOM     from "react-dom"
import { Provider } from "react-redux"

import store from "./store"

import App from "./components/App"

// Initialize clipboard
new Clipboard("#share-url-btn")

// Initialize React/Redux app
let reduxAppPlaceholder = document.getElementById("redux-app-placeholder")
if (reduxAppPlaceholder) {
  ReactDOM.render(
    <Provider store={store(reduxAppPlaceholder.getAttribute("data-board-id"))}>
      <App />
    </Provider>,
    reduxAppPlaceholder
  )
}
