import React, { Component } from 'react';
import {Navbar, NavItem} from 'react-materialize'

class NavBar extends Component {
  render () {
    // Style to fix nav NOT WORKING
    const navStyle = {
      position: 'fixed', /* Set the navbar to fixed position */
      top: '0', /* Position the navbar at the top of the page */
      width: '100%', /* Full width */
      zIndex: '999'
    }
    return (
      <Navbar brand='Storage Share' right style={navStyle}>
        <NavItem className="nav-link" href="/results">
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
