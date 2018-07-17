import React, { Component } from 'react';
import {Navbar, NavItem} from 'react-materialize'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { NavLink } from 'react-router-dom'
import { guestLogout } from '../actions/auth';
import { hostLogout } from '../actions/hostAuth';
import { fetchGuest } from '../actions/guests';
import { fetchHost } from '../actions/hosts';
import { getUser } from '../actions/auth';
import LoginModal from './LoginModal'

class NavBar extends Component {
  state={
    loginType: null
  }

  componentDidMount = async () => {
    // await this.props.getUser()
    if(this.props.auth.user.id) {
      this.props.fetchGuest(this.props.auth.user.id)
    } else if (this.props.hostAuth.user.id) {
      this.props.fetchHost(this.props.hostAuth.user.id)
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

        <li><NavLink to="/home">Home</NavLink></li>
        <li><NavLink to="/results">Search</NavLink></li>
        {this.props.auth.authorized
          ? <li><NavLink to="/guest/reservations">Reservations</NavLink></li>
          : null
        }

        {this.props.hostAuth.authorized
          ? <li><NavLink to="/host/spaces">My Spaces</NavLink></li>
          : null
        }

        {this.props.auth.authorized
          ? <li>{this.props.auth.user.name}  <img src={this.props.guests.avatar} alt="Avatar" className="avatar-xsmall"/></li>
          : null
        }

        {this.props.hostAuth.authorized
          ? <li>{this.props.hostAuth.user.name}  <img src={this.props.hosts.avatar} alt="Avatar" className="avatar-xsmall"/></li>
          : null
        }

        {this.props.auth.authorized ?
        <li>
          <NavLink onClick={this.props.guestLogout}to="/home">
            <div>Logout</div>
          </NavLink>
        </li>
        : null
        }

        {this.props.hostAuth.authorized ?
        <li>
          <NavLink onClick={this.props.hostLogout}to="/home">
            <div>Logout</div>
          </NavLink>
        </li>
        : null
        }
        {!this.props.auth.authorized && !this.props.hostAuth.authorized ?
        <NavItem>
          <LoginModal/>
        </NavItem>
        : null
        }
      </Navbar>
    )
  }
}

const mapStateToProps = ({auth, hostAuth, guests, hosts}) => ({auth, hostAuth, guests, hosts});


const mapDispatchToProps = dispatch => bindActionCreators({ guestLogout, hostLogout, fetchGuest, fetchHost, getUser }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
