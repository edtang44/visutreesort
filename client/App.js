import React from 'react';
import Header from './components/Header';
import MainDisplay from './components/MainDisplay';
const { UserContextProvider } = require("./context/UserContext");

const App = () => {
  return (
    <UserContextProvider>
      <div>
        <Header />
        <MainDisplay />
      </div>
    </UserContextProvider>
  );
}
 
export default App;