import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import {Modal, Preloader} from 'react-materialize'
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
    if(this.props.auth.isLoading)
      return <div className='preloader'><Preloader size='big'/></div>

    return (
      <BrowserRouter>
        <div className="App">
          <div className='header'>
            <NavBar />
          </div>
          <div className='main'>
            <Switch>
              <Route exact path="/" render={() => (
                  <Redirect to="/home"/>
              )}/>
              <Route exact path='/home' component={Home}/>
              <Route exact path='/results' component={Results}/>
              <Route exact path='/spaces/:spaceId' component={SpacePage}/>
              <Route exact path='/guest/reservations' component={GuestReservations}/>
              {/* <Route exact path='/guest/reservations' render={() => (
                this.props.auth.user.id
                ? <Component={GuestReservations}/>
                : <Redirect to="/home"/>
              )}/> */}
            </Switch>
          </div>
          <Modal
            id='foo'
            header='Modal Header'>
            Lorem ipsum dolor sit amet
          </Modal>
        </div>
      </BrowserRouter>
    );
  }
}
const mapStateToProps = ({auth}) => ({auth});


const mapDispatchToProps = dispatch => bindActionCreators({ getUser }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(App)
