import React, { Component } from 'react';
import {Navbar, NavItem} from 'react-materialize'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { NavLink } from 'react-router-dom'
import { guestLogout } from '../actions/auth';
import { fetchGuest } from '../actions/guests';
import { getUser } from '../actions/auth';
import LoginModal from './LoginModal'

class NavBar extends Component {

  componentDidMount = async () => {
    // await this.props.getUser()
    if(this.props.auth.user.id) {
      this.props.fetchGuest(this.props.auth.user.id)
    }
  }

  render () {
    const navStyle = {
      position: 'fixed', /* Set the navbar to fixed position */
      top: '0', /* Position the navbar at the top of the page */
      width: '100%', /* Full width */
      zIndex: '10'
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
        <li>
          <NavLink onClick={this.props.guestLogout}to="/home">
            <div>Logout</div>
          </NavLink>
        </li>
        :
        <NavItem>
          <LoginModal/>
        </NavItem>
        }
        {this.props.auth.authorized
          ? <li><img src={this.props.guests.avatar} alt="Avatar" className="avatar-xsmall"/></li>
          : null
        }

      </Navbar>
    )
  }
}

const mapStateToProps = ({auth, guests}) => ({auth, guests});


const mapDispatchToProps = dispatch => bindActionCreators({ guestLogout, fetchGuest, getUser }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
