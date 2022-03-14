import { BrowserRouter as Router,
  Switch,
  Route,
}
from 'react-router-dom';
import React from "react";
import LoginForm from './components/login/LoginForm.js'
import Dashboard from './components/dashboard/dashboard.js';

import PrivateRoute from './components/Utils/privateRoute';
import PublicRoute from './components/Utils/publicRoutes';


import './custom.scss'
import './App.css'
import './nav.css'
import './index.css'


function App() {
  return (
    <div className="App">
      
        <Router>
          <Switch>
            {/* {localStorage.getItem('loggedIn')?
            <Route component={LoginForm} path="/" exact />:
            <Route component={Dashboard} path="/" exact />
            } */}
            <PublicRoute restricted={true} component={LoginForm} path="/" exact />
            <PublicRoute restricted={true} component={LoginForm} path="/login" exact />
            <PrivateRoute component={Dashboard} path="/dashboard" exact/>
            <PrivateRoute component={Dashboard} path="/reports" exact/>
            {/* <Route component={Dashboard} path="/dashboard" exact /> */}

          </Switch>
        </Router>
       
    </div>
  );
}

export default App;
