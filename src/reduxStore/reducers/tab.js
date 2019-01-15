const tab = (state = 'all', action) => {
  switch (action.type) {
    case 'TAB_CHANGE':
      return action.payload;
    default:
      return state
  }
}

export default tab