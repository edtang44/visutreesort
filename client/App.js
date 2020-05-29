import React from 'react';
import Header from './components/Header';
import BSTMainDisplay from './components/BSTMainDisplay';
const { UserContextProvider } = require("./context/UserContext");

const App = () => {
  return (
    <UserContextProvider>
      <div>
        <Header />
        <BSTMainDisplay />
      </div>
    </UserContextProvider>
  );
}
 
export default App;