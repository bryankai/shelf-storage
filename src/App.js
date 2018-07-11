import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import {Modal} from 'react-materialize'

import NavBar from './components/NavBar'
import Home from './components/Home'
import Results from './components/Results'
import SpacePage from './components/SpacePage'
import GuestReservations from './components/GuestReservations'

import './styles/App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <NavBar />
        <div className='main'>
          <BrowserRouter>
            <Switch>
              <Route exact path="/" render={() => (
                  <Redirect to="/home"/>
              )}/>
              <Route exact path='/home' component={Home}/>
              <Route exact path='/results' component={Results}/>
              <Route exact path='/spaces/:spaceId' component={SpacePage}/>
              <Route exact path='/guest/reservations' component={GuestReservations}/>
            </Switch>
          </BrowserRouter>
        </div>
        <Modal
          id='foo'
          header='Modal Header'>
          Lorem ipsum dolor sit amet
        </Modal>
      </div>
    );
  }
}

export default App;
