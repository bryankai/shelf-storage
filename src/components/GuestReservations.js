import React, { Component }  from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Redirect } from 'react-router-dom'
import {Button, Row, Col} from 'react-materialize'
import { getUser } from '../actions/auth';
import { fetchGuest } from '../actions/guests';
import { fetchOrdersByGuestId } from '../actions/guests';
import { withAuthentication } from '../helper/helper';

import OrderList from './OrderList'

class GuestReservations extends Component {
  //
  state ={
    toHome: true,
  }

  componentDidMount = async () => {
    // await this.props.getUser()
    // console.log('USER ID', this.props.auth.user.id)
    this.props.fetchGuest(this.props.auth.user.id)
  }
  //
  render() {
  //
  //   const hostStyle = {
  //     padding: '20px'
  //   }
  //
  //   const titleRowStyle = {
  //     display: 'flex',
  //     justifyContent: 'space-evenly',
  //     alignItems: 'center'
  //   }
    const shiftDown = {
      margin: '70px',
    }

    console.log('guestRes',this.props.auth.authorized);

    if(!this.props.auth.authorized) {
      return <Redirect to="/"/>
    }

    return (
      <div style={shiftDown}>
      {/* {this.props.auth.authorized
        ? */}
        <OrderList/>
        {/* <p>hello world</p> */}
        {/* :null} */}
      </div>
    )
  }
}

const mapStateToProps = ({guest, auth}) => {
  return {auth}
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({getUser, fetchGuest}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(GuestReservations)
