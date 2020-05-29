import React from 'react';
import Header from './components/Header';
import BSTMainDisplay from './components/BSTMainDisplay';
import SortMainDisplay from './components/SortMainDisplay';
const { UserContextProvider } = require("./context/UserContext");

const App = () => {
  return (
    <UserContextProvider>
      <div>
        <Header />
        <BSTMainDisplay />
        <SortMainDispaly />
      </div>
    </UserContextProvider>
  );
}
 
export default App;