import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"
import LoginPage from "./LoginPage/LoginPage";
import RegisterPage from "./RegisterPage/RegisterPage";
import NavPage from "./NavPane/NavPane";
import MainPage from "./MainPage/MainPage";
import SettingsPage from "./Settings/SettingsPage";
import LoginContext from "./LoginContext/LoginContext";

class App extends React.Component {

  constructor(props) {
    super(props);
    let loginContext = new LoginContext(null);
    loginContext.setContext(this);
    this.state = {
      loginContext: loginContext
    }
  }

  render() {
    return (
      <div className="h-100">
          <Router>
            <NavPage loginContext={this.state.loginContext}/>
            <div role="main" className="container h-100">
              <nav className="mt-5" style={{visibility: "hidden"}}>
                <ul>
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/login">Login</Link></li>
                  <li><Link to="/register">Register</Link></li>
                </ul>
              </nav>
              <Switch>
                <Route path="/login">
                  <LoginPage loginContext={this.state.loginContext}/>
                </Route>
                <Route path="/register">
                  <RegisterPage/>
                </Route>
                <Route path="/settings">
                  <SettingsPage loginContext={this.state.loginContext}/>
                </Route>
                <Route path="/">
                  <MainPage/>
                </Route>
              </Switch>
            </div>
          </Router>
      </div>
    );
  }
}

export default App;
