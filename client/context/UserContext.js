import React, { createContext, useReducer } from 'react';
import UserReducer from './UserReducer';
export const UserContext = createContext(initialState);

const initialState = {
  displayTree: false, 
  displayChart: false,
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
  function toggleChart() {
    dispatch({
      type: 'TOGGLE_CHART',
    });
  }
  return (
    <UserContext.Provider value={{
      displayTree: state.displayTree,
      displayChart: state.displayChart,
      tree: state.tree,
      toggleTree,
      addTree, 
      toggleChart
    }}>
      {props.children}
    </UserContext.Provider>
  );
};
