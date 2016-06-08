import React from "react"
import { connect } from "react-redux"
import { bindActionCreators } from "redux"

import { deleteAlert } from "../actions/actionsCreators"

const Alerts = React.createClass({
  renderAlert(alert, index) {
    let alertLevel   = ["success", "info", "warning", "danger"].includes(alert.level) ? alert.level : "info"
    let alertClasses = "alert alert-dismissible alert-" + alertLevel
    return (
      <div className={alertClasses} role="alert" key={index}>
        <button type="button" className="close" onClick={this.props.deleteAlert.bind(null, index)}><span>&times;</span></button>
        <span className="message" dangerouslySetInnerHTML={alert.message}></span>
      </div>
    )
  },

  render() {
    return (
      <div className="alerts">
        {this.props.alerts.map(this.renderAlert)}
      </div>
    )
  }
})

let mapStateToProps = (state) => {
  return {
    alerts: state.alerts
  }
}

let mapDispatchToProps = (dispatch) => {
  return bindActionCreators({ deleteAlert }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(Alerts)
