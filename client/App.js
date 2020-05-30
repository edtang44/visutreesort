import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import BSTMainDisplay from './components/BSTMainDisplay';
import SortMainDisplay from './components/SortMainDisplay';
const { UserContextProvider } = require("./context/UserContext");

const App = () => {
  return (
    <UserContextProvider>
      <div className="AppLayout">
        <Switch>
          <Route exact path="/" component={ Header } />
          <Route exact path="/sort" component={ SortMainDisplay } />
          <Route exact path="/bst" component={ BSTMainDisplay } />
        </Switch>
      </div>
    </UserContextProvider>
  );
}
 
export default App;