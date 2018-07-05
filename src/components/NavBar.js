import React, { Component } from 'react';
import { Route} from 'react-router-dom';
import {Navbar, NavItem} from 'react-materialize'

class NavBar extends React.Component {
  render () {
    return (
      <Navbar brand='Storage Share' right >
        <NavItem className="nav-link" to="/results">
          Results
        </NavItem>
        <NavItem href='components.html'>
          Login
        </NavItem>
      </Navbar>
    )
  }
}

export default NavBar;
