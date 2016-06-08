let alertsReducer = (alerts = [], action) => {
  switch (action.type) {
    case "RESET_ALERTS":
      return []
    case "ADD_ALERT":
      return [
        ...alerts,
        action.alert
      ]
    case "DELETE_ALERT":
      return [
        ...alerts.slice(0, action.index),
        ...alerts.slice(action.index + 1)
      ]
    default:
      return alerts
  }
}

export default alertsReducer
