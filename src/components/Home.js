import React, { Component } from 'react';
import {Button, Row, Col} from 'react-materialize'
import search from '../assets/flat/search.png'
import reserve from '../assets/flat/reserve.png'
import move from '../assets/flat/move.png'
import LoginModal from './LoginModal'
import GuestSignupModal from './GuestSignupModal'
import HostSignupModal from './HostSignupModal'
import HomeSearchBar from './HomeSearchBar'

import '../styles/Home.css';

class Home extends Component {
  render() {
    return (
      <div className="App">
        <div className="search-container screen">
          <div className="search-subcontainer">
            <Row className="search-title white-title">
              <h3><b>Find storage in your area</b></h3>
            </Row>
            <Row className="search-row">
               <HomeSearchBar/>
            </Row>
          </div>
        </div>
        <div className="about-container screen">
          <Row className="title">
            <h2>How Shelf Works</h2>
          </Row>
          <Row className="steps">
            <Col className='steps-col' s={12} l={4}>
              <img src={search} alt="search"/>
              <div className='step-title'>Search</div>
              <h5>Search for a storage space</h5>
            </Col>
            <Col className='steps-col' s={12} l={4}>
              <img src={reserve} alt="reserve"/>
              <div className='step-title'>Reserve</div>
              <h5>Connect with local hosts and reserve your space </h5>
            </Col>
            <Col className='steps-col' s={12} l={4}>
              <img src={move} alt="move"/>
              <div className='step-title'>Shelf It</div>
              <h5>Move your items in to storage and relax</h5>
            </Col>

          </Row>
        </div>
        <div className="signup-container screen">
          <div className="signup-subcontainer">
            <Row className="title">
              <h1>Join the neighborhood</h1>
            </Row>
            <Row className="buttons-box">
              <Col s={12} m={6} className='guest-column'>
                <h3>Become a Guest</h3>
                <GuestSignupModal/>
                <Button waves='light' className='login-button' value="Login" s={6}><LoginModal/></Button>

              </Col>
              <Col s={12} m={6} className='host column'>
                <h3>Become a Host</h3>
                <HostSignupModal/>
                <Button waves='light' className='login-button'   value="Login" s={6}><LoginModal/></Button>
              </Col>
            </Row>
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
