import React from 'react';
import { BrowserRouter, Switch, Route, Link } from 'react-router-dom';
import Home from './Home';
import SignUp from './SignUp';
import Login from './Login';
import Protected from './Protected';
import Nav from './Nav'
import Auth from './Auth';

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Switch>
        <Route path='/' exact component={Home} />
        <Route path='/signup' exact component={SignUp} />
        <Route path='/login' exact component={Login} />
        <Auth>
          <Route path='/protected' component={Protected} />
        </Auth>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
