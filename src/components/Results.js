import React, { Component } from 'react';
import {Navbar, NavItem, Input, Button, Row, Col} from 'react-materialize'
import NavBar from './NavBar.js'
import '../styles/Home.css';

class Results extends Component {
  render() {
    return (
      <div>
        <NavBar/>
        <p> Hello Results</p>
      </div>
    )
  }
}

export default Results;
