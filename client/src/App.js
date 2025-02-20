import React from 'react';
import { BrowserRouter as Router, Route, Link, Switch } from 'react-router-dom';
import PrivateRoute from './components/PrivateRoute';

import Login from './components/Login';
import GasPrices from './components/GasPrices';
import axiosWithAuth from './utils/axiosWithAuth';

const UserHeader = ()=> {
  return(<div>
    <Link to="/protected">Protected Page</Link>
  </div>);
}

function App() {
  const logout = () => {
    axiosWithAuth()
    .post('/logout')
    .then(res => {
      localStorage.removeItem('token');
      localStorage.setItem('username');
      localStorage.setItem('role');
      window.location.href = "/login";
    })
    .catch(err => {
      console.log(err);
    })
  };


  return (
    <Router>
      <div className="App">
        <ul>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link onClick={logout}>Logout</Link>
          </li>
          <li>
            {localStorage.getItem('token') ? <UserHeader/> : <div></div>}
          </li>
        </ul>

        <Switch>
          <PrivateRoute exact path="/protected" component={GasPrices} />
          {/* 
          <PrivateRoute exact path="/other" component={OtherPage} />
          <PrivateRoute exact path="/momma" component={MommaPage} />
          <PrivateRoute exact path="/bad" component={BadPage} /> 
          */}

          <Route path="/login" component={Login} />
          <Route component={Login} />

          {/* 
          <Route path="/superLogin">
            <Redirect to='/login'/>
          </Route>
           */}
        </Switch>
      </div>
    </Router>
  );
}

export default App;
