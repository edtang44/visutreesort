import React, { createContext, useReducer } from 'react';
import UserReducer from './UserReducer';
export const UserContext = createContext(initialState);

const initialState = {
  displayTree: false, 
}

export const UserContextProvider = props => {
  const [state, dispatch] = useReducer(UserReducer, initialState);

  // Actions
  function toggleTree() {
    dispatch({
      type: 'TOGGLE_TREE',
    });
  }
  return (
    <UserContext.Provider value={{
      displayTree: state.displayTree,
      toggleTree
    }}>
      {props.children}
    </UserContext.Provider>
  );
};
