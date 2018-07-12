import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {Modal} from 'react-materialize'
import NavBar from './components/NavBar'
import Home from './components/Home'
import Results from './components/Results'
import SpacePage from './components/SpacePage'
import GuestReservations from './components/GuestReservations'
import AuthenticatedRoute from './helper/AuthenticatedRoute'
import { getUser } from './actions/auth';

import './styles/App.css';

class App extends Component {
  componentDidMount(){
    this.props.getUser()
  }
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
const mapStateToProps = ({auth}) => ({auth});


const mapDispatchToProps = dispatch => bindActionCreators({ getUser }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App)
