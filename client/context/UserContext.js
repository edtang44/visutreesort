import React, { createContext, useReducer } from 'react';
import UserReducer from './UserReducer';
export const UserContext = createContext(initialState);

const initialState = {
  displayTree: false, 
  tree: {}
}

export const UserContextProvider = props => {
  const [state, dispatch] = useReducer(UserReducer, initialState);

  // Actions
  function toggleTree() {
    dispatch({
      type: 'TOGGLE_TREE',
    });
  }
  function addTree(obj) {
    dispatch({
      type: 'ADD_TREE',
      payload: obj
    });
  }
  return (
    <UserContext.Provider value={{
      displayTree: state.displayTree,
      tree: state.tree,
      toggleTree,
      addTree
    }}>
      {props.children}
    </UserContext.Provider>
  );
};
