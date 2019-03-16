import React, { Component } from 'react';
import LoginSignup from './components/loginsignup';
import Urls from './components/urls';
import { BrowserRouter as Router, Route, Link,Redirect } from "react-router-dom";
function Home(){
  return (<div>
      <Link to="/loginsignup">Login signup</Link>
    </div>);
}
class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <Route exact path="/" component={Home}/>
          <Route path="/loginsignup" component={LoginSignup}/>
          <Route path="/urls" component={Urls}/>
        </Router>
      </div>
    );
  }
}

export default App;
