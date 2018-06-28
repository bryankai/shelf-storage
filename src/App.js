import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import Home from './components/Home.js'
import Results from './components/Results.js'
import './styles/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <BrowserRouter>
          <Switch>
            <Route exact path="/" render={() => (
                <Redirect to="/home"/>
            )}/>
            <Route exact path='/home' component={Home}/>
            <Route exact path='/results' component={Results}/>
          </Switch>
        </BrowserRouter>

      </div>
    );
  }
}

export default App;
