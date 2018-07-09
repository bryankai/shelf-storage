import React, { Component } from 'react';
import {Input, Button, Row, Col} from 'react-materialize'
import '../styles/Home.css';
import search from '../assets/flat/search.png'
import reserve from '../assets/flat/reserve.png'
import move from '../assets/flat/move.png'

class Home extends Component {
  render() {
    return (
      <div className="App">
        <div className="search-container screen">
          <div className="search-subcontainer">
            <Row className="search-title white-title">
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
          <Row className="steps">
            <Col className='steps-col' s={12} l={4}>
              <img src={search} alt="search"/>
              <h4>Search</h4>
              <h5>Search for storage space that suits you</h5>
            </Col>
            <Col className='steps-col' s={12} l={4}>
              <img src={reserve} alt="reserve"/>
              <h4>Reserve</h4>
              <h5>Connect with local hosts, confirm details & pay
</h5>
            </Col>
            <Col className='steps-col' s={12} l={4}>
              <img src={move} alt="move"/>
              <h4>Shelf It</h4>
              <h5>Move your items into storage, and relax</h5>
            </Col>

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
