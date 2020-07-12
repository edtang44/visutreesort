import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import Header from './components/Header';
import SortAlgoDisplay from './components/SortAlgoDisplay';
import TreeDisplay from './components/TreeDisplay';

const App = () => {
  return (
      <HashRouter>
        <div className="AppLayout">
          <Switch>
            <Route exact path="/" component={ Header } />
            <Route exact path="/sort" component={ SortAlgoDisplay } />
            <Route exact path="/bst" component={ TreeDisplay } />
          </Switch>
        </div>
      </HashRouter>
  );
}
 
export default App;