export default function reducer (state, action) {
  switch(action.type) {
    case "TOGGLE_TREE":
      return {
        ...state, displayTree: !state.displayTree
      };
    case "ADD_TREE":
      return {
        ...state, tree: action.payload
      };
  default:
      return state;
  }
}