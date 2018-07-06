import React, { Component } from 'react';
import {Navbar, NavItem, Input, Button, Row, Col} from 'react-materialize'
import NavBar from './NavBar'
import SpaceList from './SpaceList'
import MapContainer from './MapContainer'


import '../styles/Home.css';

class Results extends Component {
  render() {
    return (
      <div>
        <Row>
          <Col s={12} m={6} l={8}>
            <h4> Search Results </h4>
            <SpaceList/>
          </Col>
          <Col s={0} m={6} l={4}>
            <MapContainer/>
          </Col>
        </Row>
      </div>
    )
  }
}

export default Results;
