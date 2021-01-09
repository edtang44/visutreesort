import React from 'react';
import { HashRouter, Route, Switch } from 'react-router-dom';
import SpinnerDisplay from './components/SpinnerDisplay';
const Header = React.lazy(() => import('./components/Header'));
const SortAlgoDisplay = React.lazy(() => import('./components/SortAlgoDisplay'));
const TreeDisplay = React.lazy(() => import('./components/TreeDisplay'));

const App = () => {
  return (
    <React.Suspense fallback={<SpinnerDisplay />}>
      <HashRouter>
        <div className="AppLayout">
          <Switch>
            <Route exact path="/" component={ Header } />
            <Route exact path="/sort" component={ SortAlgoDisplay } />
            <Route exact path="/bst" component={ TreeDisplay } />
          </Switch>
        </div>
      </HashRouter>
    </React.Suspense>
  );
}
 
export default App;