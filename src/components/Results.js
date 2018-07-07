import React, { Component } from 'react';
import {Row, Col} from 'react-materialize'
import SpaceList from './SpaceList'
import MapContainer from './MapContainer'
import SearchBar from './SearchBar'

import '../styles/Home.css';

class Results extends Component {
  render() {
    const shiftDown = {
      margin: '100px',
      backgroundColor: 'yellow'
    }

    return (
      <div>
        <Row>
          <SearchBar style={shiftDown}/>
        </Row>
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
