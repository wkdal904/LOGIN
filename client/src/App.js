import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

import RegisterPage from './components/views/RegisterPage/RegisterPage';
import LoginPage from './components/views/LoginPage/LoginPage';
import LandingPage from './components/views/LandingPage/LandingPage';
import Auth from './hoc/auth'
function App() {
    return (
      <Router>
      <div>
        <hr />
        <Switch>
          <Route exact path="/" component={Auth(LandingPage, null)}/>
          //null 아무나가능 , true 로그인한 유저만, false 로그인한 유저는 금지
          <Route exact path="/login" component={Auth(LoginPage, false)}/>
          <Route exact path="/register" component={Auth(RegisterPage, false)}/>
        </Switch>
      </div>
    </Router>
    )
}

export default App
