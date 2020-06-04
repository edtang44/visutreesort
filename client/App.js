import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import SortAlgoDisplay from './components/SortAlgoDisplay';
import TreeDisplay from './components/TreeDisplay';
const { UserContextProvider } = require("./context/UserContext");

const App = () => {
  return (
    <UserContextProvider>
      <div className="AppLayout">
        <Switch>
          <Route exact path="/" component={ Header } />
          <Route exact path="/sort" component={ SortAlgoDisplay } />
          <Route exact path="/bst" component={ TreeDisplay } />
        </Switch>
      </div>
    </UserContextProvider>
  );
}
 
export default App;