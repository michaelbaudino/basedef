let netReducer = (net = {}, action) => {
  switch (action.type) {
    case "CONNECTION_SUCCEEDED":
      return {
        ...net,
        channel: action.channel
      }
    case "CONNECTION_FAILED":
      console.log("ERROR: Unable to join channel", action.errors)
      return net
    case "CONNECTION_CLOSED":
      return {
        ...net,
        channel: null
      }
    default:
      return net
  }
}

export default netReducer
