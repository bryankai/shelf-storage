import React, { Component } from 'react';
import {Navbar, NavItem, Input, Button, Row, Col} from 'react-materialize'
import NavBar from './NavBar.js'
import SpaceList from './SpaceList.js'
import '../styles/Home.css';

class Results extends Component {
  render() {
    return (
      <div>
        <NavBar/>
        <h4> Search Results </h4>
        <SpaceList/>
      </div>
    )
  }
}

export default Results;
