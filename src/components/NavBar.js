import React, { Component } from 'react';
import { Route, Link} from 'react-router-dom';
import {Navbar, NavItem} from 'react-materialize'

class NavBar extends React.Component {
  render () {
    return (
      <Navbar brand='Storage Share' right >
        <NavItem>
          <Link className="nav-link" to="/results">Results</Link>
        </NavItem>
        <NavItem href='components.html'>
          Login
        </NavItem>
      </Navbar>
    )
  }
}

export default NavBar;
