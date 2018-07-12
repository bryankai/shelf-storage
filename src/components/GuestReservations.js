import React, { Component }  from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {Button, Row, Col} from 'react-materialize'

import { fetchGuest } from '../actions/guests';
import { fetchOrdersByGuestId } from '../actions/guests';
import { withAuthentication } from '../helper/helper';

import OrderList from './OrderList'

class GuestReservations extends Component {
  //
  componentDidMount = async () => {
    // this.props.fetchGuest(this.props.auth.id)
    this.props.fetchGuest(this.props.auth.user.id)
    await this.props.fetchOrdersByGuestId(this.props.auth.user.id)
    // replace 1 with this.props.auth.user.id
    // console.log('orders', this.props.orders)
    console.log(this.props.authState.id)
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

    return (
      <div style={shiftDown}>
        <h3> My Reservations </h3>
        <OrderList/>
      </div>
    )
  }
}

const mapStateToProps = ({guest, auth}) => {
  return {auth}
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({fetchGuest, fetchOrdersByGuestId}, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(GuestReservations)
