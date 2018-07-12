import React, { Component } from 'react';
import {Navbar, NavItem} from 'react-materialize'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { NavLink } from 'react-router-dom'
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
      <Navbar brand='Shelf' right style={navStyle}>
        {/* <li>Welcome, {this.props.auth.user.name}</li> */}
        <li><NavLink to="/home">Home</NavLink></li>
        <li><NavLink to="/results">Search</NavLink></li>
        {this.props.auth.authorized
          ? <li><NavLink to="/guest/reservations">Reservations</NavLink></li>
          : null
        }
        {this.props.auth.authorized ?
        // <li><NavLink to="/results">Search</NavLink></li>
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
