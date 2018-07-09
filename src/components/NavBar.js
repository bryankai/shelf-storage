import React, { Component } from 'react';
import {Navbar, NavItem} from 'react-materialize'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { guestLogout } from '../actions/auth';
import LoginModal from './LoginModal'

class NavBar extends Component {
  // For testing until I set up authState
  state= {
    authState: false
  }

  render () {
    // Style to fix nav NOT WORKING
    console.log(this.props.auth)
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
        {this.props.auth.authorized ?
        <NavItem onClick={this.props.guestLogout }>
          <div>Logout</div>
        </NavItem>
        :
        <NavItem>
          <LoginModal/>
        </NavItem>
        }
      </Navbar>
    )
  }
}

const mapStateToProps = ({auth}) => ({auth});


const mapDispatchToProps = dispatch => bindActionCreators({ guestLogout }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
