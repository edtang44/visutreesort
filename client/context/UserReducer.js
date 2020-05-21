export default function reducer (state, action) {
  switch(action.type) {
    case "TOGGLE_TREE":
        return {
          ...state, displayTree: !state.displayTree
        };
  default:
      return state;
  }
}