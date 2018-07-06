import React, { Component } from 'react';
import { Route} from 'react-router-dom';
import {Input, Button, Row, Col} from 'react-materialize'
import Results from './Results'
import '../styles/Home.css';

class Home extends Component {
  render() {
    return (
      <div className="App">
        {/* <Route path="/results" component={Results} /> */}
        <div className="search-container screen">
          <div className="search-subcontainer">
            <Row className="search-title">
              <h3>Find storage in your area</h3>
            </Row>
            <Row className="search-row">
              <form className='search-form' id='search-form'  s={8}>
                <Input className="search-input" placeholder="City or Zip"/>
              </form>
               <Button waves='light' className='search-button' type="submit" form="search-form" value="Search" s={2}>Search</Button>
            </Row>
          </div>
        </div>
        <div className="about-container screen">
          <Row className="title">
            <h3>How it Works</h3>
          </Row>
        </div>
        <div className="signup-container screen">
          <div className="search-subcontainer">
            <Row className="title">
              <h1>Join Storage Space</h1>
            </Row>
            <Row className="buttons-box">
              <Col s={12} m={6} className='guest-column'>
                <h3>Become a Guest</h3>
                <Button waves='light' className='signup-button' form="search-form" value="Signup" s={12}>Signup</Button>
                <Button waves='light' className='login-button'  form="search-form" value="Login" s={12}>Login</Button>
              </Col>
              <Col s={12} m={6} className='host column'>
                <h3>Become a Host</h3>
                <Button waves='light' className='signup-button'  value="Signup" s={12}>Signup</Button>
                <Button waves='light' className='login-button'   value="Login" s={12}>Login</Button>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
