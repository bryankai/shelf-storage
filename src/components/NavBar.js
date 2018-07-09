import React, { Component } from 'react';
import {Navbar, NavItem} from 'react-materialize'
import LoginModal from './LoginModal'

class NavBar extends Component {
  // For testing until I set up authState
  state= {
    authState: false
  }

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
          Search
        </NavItem>
        <NavItem
          // onClick={handleLogin}
          >
            {this.state.authState ? 'Logout' : <LoginModal/> }
        </NavItem>
      </Navbar>
    )
  }
}

export default NavBar;
